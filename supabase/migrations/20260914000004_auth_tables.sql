-- ================================================================
-- ASPEKT Phase 8 — Auth tables (profiles, favourites, download_history)
-- ================================================================
-- Applied via Supabase MCP. This file is the on-disk record.

CREATE TABLE IF NOT EXISTS public.profiles (
  id           uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  avatar_url   text,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.favourites (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  wallpaper_id uuid        NOT NULL REFERENCES public.wallpapers(id) ON DELETE CASCADE,
  created_at   timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, wallpaper_id)
);

CREATE TABLE IF NOT EXISTS public.download_history (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  wallpaper_id  uuid        NOT NULL REFERENCES public.wallpapers(id) ON DELETE CASCADE,
  downloaded_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_favourites_user        ON public.favourites (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_favourites_wallpaper   ON public.favourites (wallpaper_id);
CREATE INDEX IF NOT EXISTS idx_download_history_user  ON public.download_history (user_id, downloaded_at DESC);

ALTER TABLE public.profiles         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favourites        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.download_history  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_owner_select" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_owner_update" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "favourites_owner_select" ON public.favourites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "favourites_owner_insert" ON public.favourites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "favourites_owner_delete" ON public.favourites FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "history_owner_select" ON public.download_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "history_owner_insert" ON public.download_history FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Auto-create profile on sign-up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
