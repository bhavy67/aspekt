-- ================================================================
-- ASPEKT core schema — Phase 5
-- ================================================================

CREATE TABLE IF NOT EXISTS public.categories (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text        NOT NULL,
  slug        text        NOT NULL UNIQUE,
  description text,
  cover_url   text,
  sort_order  integer     NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.moods (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text        NOT NULL,
  slug        text        NOT NULL UNIQUE,
  description text,
  cover_url   text,
  sort_order  integer     NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.collections (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text        NOT NULL,
  slug         text        NOT NULL UNIQUE,
  description  text,
  cover_url    text,
  curator_name text,
  published_at timestamptz,
  created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.wallpapers (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title         text        NOT NULL,
  slug          text        NOT NULL UNIQUE,
  image_url     text        NOT NULL,
  thumbnail_url text        NOT NULL,
  width         integer     NOT NULL,
  height        integer     NOT NULL,
  is_free       boolean     NOT NULL DEFAULT true,
  is_premium    boolean     NOT NULL DEFAULT false,
  tags          text[]      NOT NULL DEFAULT '{}',
  artist_name   text,
  color_palette text[]      NOT NULL DEFAULT '{}',
  published_at  timestamptz NOT NULL DEFAULT now(),
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.wallpaper_categories (
  wallpaper_id uuid NOT NULL REFERENCES public.wallpapers(id)   ON DELETE CASCADE,
  category_id  uuid NOT NULL REFERENCES public.categories(id)   ON DELETE CASCADE,
  PRIMARY KEY (wallpaper_id, category_id)
);

CREATE TABLE IF NOT EXISTS public.wallpaper_moods (
  wallpaper_id uuid NOT NULL REFERENCES public.wallpapers(id)   ON DELETE CASCADE,
  mood_id      uuid NOT NULL REFERENCES public.moods(id)        ON DELETE CASCADE,
  PRIMARY KEY (wallpaper_id, mood_id)
);

CREATE TABLE IF NOT EXISTS public.wallpaper_collections (
  wallpaper_id  uuid    NOT NULL REFERENCES public.wallpapers(id)    ON DELETE CASCADE,
  collection_id uuid    NOT NULL REFERENCES public.collections(id)   ON DELETE CASCADE,
  sort_order    integer NOT NULL DEFAULT 0,
  PRIMARY KEY (wallpaper_id, collection_id)
);

CREATE INDEX IF NOT EXISTS idx_wallpapers_published      ON public.wallpapers (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_wallpapers_free           ON public.wallpapers (is_free) WHERE is_free = true;
CREATE INDEX IF NOT EXISTS idx_wallpaper_categories_cat  ON public.wallpaper_categories (category_id);
CREATE INDEX IF NOT EXISTS idx_wallpaper_moods_mood      ON public.wallpaper_moods (mood_id);
CREATE INDEX IF NOT EXISTS idx_wallpaper_collections_col ON public.wallpaper_collections (collection_id, sort_order);

ALTER TABLE public.wallpapers
  ADD COLUMN IF NOT EXISTS fts tsvector
  GENERATED ALWAYS AS (
    to_tsvector('english',
      coalesce(title, '') || ' ' || coalesce(array_to_string(tags, ' '), '')
    )
  ) STORED;

CREATE INDEX IF NOT EXISTS idx_wallpapers_fts ON public.wallpapers USING GIN(fts);

ALTER TABLE public.categories            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moods                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallpapers            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallpaper_categories  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallpaper_moods       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallpaper_collections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read categories"            ON public.categories            FOR SELECT USING (true);
CREATE POLICY "Public read moods"                 ON public.moods                 FOR SELECT USING (true);
CREATE POLICY "Public read collections"           ON public.collections           FOR SELECT USING (true);
CREATE POLICY "Public read wallpapers"            ON public.wallpapers            FOR SELECT USING (true);
CREATE POLICY "Public read wallpaper_categories"  ON public.wallpaper_categories  FOR SELECT USING (true);
CREATE POLICY "Public read wallpaper_moods"       ON public.wallpaper_moods       FOR SELECT USING (true);
CREATE POLICY "Public read wallpaper_collections" ON public.wallpaper_collections FOR SELECT USING (true);
