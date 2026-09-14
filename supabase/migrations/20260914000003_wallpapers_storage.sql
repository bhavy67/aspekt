-- Phase 7: Supabase Storage bucket for wallpaper images
--
-- Bucket:  wallpapers (public)
--   full/{slug}.jpg   — 2560px longest edge, JPEG q90
--   thumb/{slug}.jpg  — 640px longest edge,  JPEG q90
--
-- Upload script: scripts/upload-wallpaper.ts
-- Requires SUPABASE_SERVICE_KEY env var (service_role key)

-- Create bucket (idempotent)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'wallpapers',
  'wallpapers',
  true,
  20971520,  -- 20 MB per file
  ARRAY['image/jpeg', 'image/webp', 'image/png']
)
ON CONFLICT (id) DO NOTHING;

-- Public read for all objects in the wallpapers bucket
CREATE POLICY IF NOT EXISTS "Public read wallpapers"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'wallpapers');
