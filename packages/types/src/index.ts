export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  cover_url: string | null;
  sort_order: number;
  created_at: string;
};

export type Mood = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  cover_url: string | null;
  sort_order: number;
  created_at: string;
};

export type Collection = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  cover_url: string | null;
  curator_name: string | null;
  published_at: string | null;
  created_at: string;
};

export type Wallpaper = {
  id: string;
  title: string;
  slug: string;
  image_url: string;
  thumbnail_url: string;
  width: number;
  height: number;
  is_free: boolean;
  is_premium: boolean;
  tags: string[];
  artist_name: string | null;
  color_palette: string[];
  published_at: string;
  created_at: string;
};

export type WallpaperDetail = Wallpaper & {
  categories: Category[];
  moods: Mood[];
  collections: Collection[];
};

export type CollectionDetail = Collection & {
  wallpapers: Wallpaper[];
};
