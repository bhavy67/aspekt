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
  coin_cost: number;
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

export type Profile = {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  coin_balance: number;
  created_at: string;
  updated_at: string;
};

export type CoinTransaction = {
  id: string;
  user_id: string;
  amount: number;
  reason: 'daily_checkin' | 'share' | 'apply' | 'spend_premium' | 'rewarded_ad';
  wallpaper_id: string | null;
  created_at: string;
};

export type Favourite = {
  id: string;
  user_id: string;
  wallpaper_id: string;
  created_at: string;
};

export type DownloadHistoryItem = {
  id: string;
  user_id: string;
  wallpaper_id: string;
  downloaded_at: string;
};
