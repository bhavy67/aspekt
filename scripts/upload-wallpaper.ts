/**
 * Upload wallpaper images to Supabase Storage and update the database.
 *
 * Usage (single):
 *   pnpm upload-wallpaper --slug aurora-borealis-a8f3 --file ./images/aurora.jpg
 *
 * Usage (batch — filename must match slug, e.g. aurora-borealis-a8f3.jpg):
 *   pnpm upload-wallpaper --dir ./images/
 *
 * Required env vars (in .env.local or exported):
 *   SUPABASE_URL           https://ypppcbxjowvbnzvvkmpe.supabase.co
 *   SUPABASE_SERVICE_KEY   <service_role key from Supabase project settings>
 *
 * Output sizes:
 *   Full:  longest edge = 2560 px  → stored at wallpapers/full/{slug}.jpg
 *   Thumb: longest edge = 640 px   → stored at wallpapers/thumb/{slug}.jpg
 */

import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';

// ── Config ────────────────────────────────────────────────────────────────────

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const BUCKET = 'wallpapers';
const FULL_LONGEST = 2560;
const THUMB_LONGEST = 640;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error(
    'Error: SUPABASE_URL and SUPABASE_SERVICE_KEY env vars are required.\n' +
      'Set SUPABASE_SERVICE_KEY to the service_role key from Supabase → Settings → API.',
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ── Args ──────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
function flag(name: string): string | undefined {
  const i = args.indexOf(`--${name}`);
  return i !== -1 ? args[i + 1] : undefined;
}

const slugArg = flag('slug');
const fileArg = flag('file');
const dirArg = flag('dir');

if (!slugArg && !dirArg) {
  console.error(
    'Usage: pnpm upload-wallpaper --slug <slug> --file <path>\n' +
      '       pnpm upload-wallpaper --dir <folder>',
  );
  process.exit(1);
}

// ── Core ──────────────────────────────────────────────────────────────────────

async function resizeToBuffer(
  inputPath: string,
  longestEdge: number,
): Promise<{ buffer: Buffer; width: number; height: number }> {
  const img = sharp(inputPath);
  const meta = await img.metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;

  const isPortrait = h > w;
  const resized = isPortrait
    ? img.resize({ height: longestEdge, withoutEnlargement: true })
    : img.resize({ width: longestEdge, withoutEnlargement: true });

  const output = await resized
    .jpeg({ quality: 90, progressive: true })
    .toBuffer({ resolveWithObject: true });
  return { buffer: output.data, width: output.info.width, height: output.info.height };
}

async function uploadWallpaper(slug: string, filePath: string): Promise<void> {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  console.log(`\n[${slug}] Processing ${path.basename(filePath)}…`);

  const [full, thumb] = await Promise.all([
    resizeToBuffer(filePath, FULL_LONGEST),
    resizeToBuffer(filePath, THUMB_LONGEST),
  ]);

  const fullKey = `full/${slug}.jpg`;
  const thumbKey = `thumb/${slug}.jpg`;

  // Upload full
  const { error: fullErr } = await supabase.storage.from(BUCKET).upload(fullKey, full.buffer, {
    contentType: 'image/jpeg',
    upsert: true,
  });
  if (fullErr) throw new Error(`Full upload failed: ${fullErr.message}`);

  // Upload thumb
  const { error: thumbErr } = await supabase.storage.from(BUCKET).upload(thumbKey, thumb.buffer, {
    contentType: 'image/jpeg',
    upsert: true,
  });
  if (thumbErr) throw new Error(`Thumb upload failed: ${thumbErr.message}`);

  // Build public URLs
  const { data: fullUrl } = supabase.storage.from(BUCKET).getPublicUrl(fullKey);
  const { data: thumbUrl } = supabase.storage.from(BUCKET).getPublicUrl(thumbKey);

  // Update DB
  const { error: dbErr } = await supabase
    .from('wallpapers')
    .update({
      image_url: fullUrl.publicUrl,
      thumbnail_url: thumbUrl.publicUrl,
      width: full.width,
      height: full.height,
    })
    .eq('slug', slug);

  if (dbErr) throw new Error(`DB update failed: ${dbErr.message}`);

  console.log(`[${slug}] ✓ full  ${full.width}×${full.height}  ${fullUrl.publicUrl}`);
  console.log(`[${slug}] ✓ thumb ${thumb.width}×${thumb.height}  ${thumbUrl.publicUrl}`);
}

// ── Run ───────────────────────────────────────────────────────────────────────

async function run() {
  if (slugArg && fileArg) {
    await uploadWallpaper(slugArg, path.resolve(fileArg));
  } else if (dirArg) {
    const dir = path.resolve(dirArg);
    const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
    const files = fs.readdirSync(dir).filter((f) => EXTS.has(path.extname(f).toLowerCase()));

    if (!files.length) {
      console.error(`No image files found in ${dir}`);
      process.exit(1);
    }

    console.log(`Found ${files.length} image(s) in ${dir}`);
    let ok = 0;
    let fail = 0;

    for (const file of files) {
      const slug = path.basename(file, path.extname(file));
      try {
        await uploadWallpaper(slug, path.join(dir, file));
        ok++;
      } catch (err) {
        console.error(`[${slug}] ✗ ${(err as Error).message}`);
        fail++;
      }
    }

    console.log(`\nDone: ${ok} uploaded, ${fail} failed.`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
