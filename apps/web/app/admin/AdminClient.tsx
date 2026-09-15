'use client';

import Link from 'next/link';
import { useRef, useState, useTransition } from 'react';
import type { Category, Collection, Wallpaper } from '@aspekt/types';
import { deleteWallpaper, logoutAdmin, uploadWallpaper } from './actions';

type Props = {
  categories: Category[];
  collections: Collection[];
  recentWallpapers: Wallpaper[];
};

export function AdminClient({ categories, collections, recentWallpapers }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [slugPreview, setSlugPreview] = useState('');
  const [result, setResult] = useState<{ error?: string; slug?: string; imageUrl?: string } | null>(
    null,
  );
  const [uploads, setUploads] = useState<Wallpaper[]>(recentWallpapers);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();

  function handleFile(file: File) {
    const url = URL.createObjectURL(file);
    setPreview(url);
    const img = new window.Image();
    img.onload = () => setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    img.src = url;
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) handleFile(file);
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const base = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setSlugPreview(base ? `${base}-xxxx` : '');
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setResult(null);

    startTransition(async () => {
      const res = await uploadWallpaper(formData);
      setResult(res);
      if (!res.error) {
        form.reset();
        setPreview(null);
        setDimensions({ width: 0, height: 0 });
        setSlugPreview('');
      }
    });
  }

  function handleDelete(w: Wallpaper) {
    if (!confirm(`Delete "${w.title}"? This cannot be undone.`)) return;
    setDeletingId(w.id);
    setDeleteError(null);

    startDeleteTransition(async () => {
      const res = await deleteWallpaper(w.id, w.image_url);
      if (res.error) {
        setDeleteError(res.error);
      } else {
        setUploads((prev) => prev.filter((u) => u.id !== w.id));
      }
      setDeletingId(null);
    });
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">ASPEKT Admin</h1>
            <p className="mt-1 text-sm text-muted">Upload new wallpapers</p>
          </div>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="rounded-lg border border-border px-4 py-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              Sign out
            </button>
          </form>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Upload form */}
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Dropzone */}
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileRef.current?.click()}
              className="relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-surface transition-colors hover:border-border-strong"
              style={{ aspectRatio: preview ? undefined : '9/16', minHeight: preview ? 0 : 240 }}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full rounded-2xl object-cover"
                  style={{ aspectRatio: `${dimensions.width}/${dimensions.height || 1}` }}
                />
              ) : (
                <>
                  <svg
                    className="mb-3 h-8 w-8 text-muted"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  <p className="text-sm font-medium text-muted">Drop image or click to pick</p>
                </>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              name="image"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
            <input type="hidden" name="width" value={dimensions.width} />
            <input type="hidden" name="height" value={dimensions.height} />

            {/* Title */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted">
                Title
              </label>
              <input
                name="title"
                type="text"
                required
                placeholder="e.g. Midnight Bloom"
                onChange={handleTitleChange}
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
              />
              {slugPreview && <p className="mt-1 text-[11px] text-muted">slug: {slugPreview}</p>}
            </div>

            {/* Artist */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted">
                Artist
              </label>
              <input
                name="artist_name"
                type="text"
                defaultValue="ASPEKT"
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted">
                Tags <span className="normal-case font-normal">(comma-separated)</span>
              </label>
              <input
                name="tags"
                type="text"
                placeholder="dark, minimal, amoled"
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                name="category_id"
                required
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Collection */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted">
                Collection <span className="normal-case font-normal">(optional)</span>
              </label>
              <select
                name="collection_id"
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="">None</option>
                {collections.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Dimensions display */}
            {dimensions.width > 0 && (
              <p className="text-xs text-muted">
                Detected size: {dimensions.width} × {dimensions.height}px
              </p>
            )}

            {/* Result */}
            {result?.error && (
              <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {result.error}
              </p>
            )}
            {result?.slug && (
              <div className="rounded-xl bg-green-500/10 px-4 py-3 text-sm text-green-400">
                Uploaded!{' '}
                <Link href={`/wallpaper/${result.slug}`} className="underline" target="_blank">
                  View wallpaper
                </Link>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending || !preview}
              className="rounded-xl bg-accent-gradient px-6 py-3.5 text-sm font-bold text-[#0B0B0E] transition-opacity disabled:opacity-40"
            >
              {isPending ? 'Uploading…' : 'Upload Wallpaper'}
            </button>
          </form>

          {/* Recent uploads */}
          <div>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              Recent uploads
            </h2>

            {deleteError && (
              <p className="mb-3 rounded-xl bg-red-500/10 px-3 py-2.5 text-xs text-red-400">
                {deleteError}
              </p>
            )}

            <div className="flex flex-col gap-2">
              {uploads.length === 0 && <p className="text-sm text-muted">No wallpapers yet.</p>}
              {uploads.map((w) => {
                const isThisDeleting = isDeleting && deletingId === w.id;
                return (
                  <div
                    key={w.id}
                    className={`flex items-center gap-3 rounded-xl border border-border bg-surface p-3 transition-opacity ${isThisDeleting ? 'opacity-40' : ''}`}
                  >
                    {/* Thumbnail */}
                    <Link href={`/wallpaper/${w.slug}`} target="_blank" className="flex-shrink-0">
                      <div className="h-14 w-8 overflow-hidden rounded-lg bg-raised">
                        <img
                          src={w.thumbnail_url}
                          alt={w.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </Link>

                    {/* Info */}
                    <Link
                      href={`/wallpaper/${w.slug}`}
                      target="_blank"
                      className="min-w-0 flex-1 hover:opacity-80"
                    >
                      <p className="truncate text-sm font-medium text-foreground">{w.title}</p>
                      <p className="text-[11px] text-muted">
                        {w.width}×{w.height}
                      </p>
                    </Link>

                    {/* Delete button */}
                    <button
                      onClick={() => handleDelete(w)}
                      disabled={isDeleting}
                      title="Delete wallpaper"
                      className="flex-shrink-0 rounded-lg p-1.5 text-muted transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {isThisDeleting ? (
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                          <path d="M10 11v6M14 11v6" />
                          <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                        </svg>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
