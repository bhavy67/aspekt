import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { WallpaperCard } from '@/components/wallpaper-card';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export const metadata: Metadata = { title: 'Account' };

export default async function AccountPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/auth/sign-in');

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();

  // Recent favourites (last 8)
  const { data: favLinks } = await supabase
    .from('favourites')
    .select('wallpaper_id, wallpapers(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(8);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recentFavs = (favLinks ?? []).map((r: any) => r.wallpapers);

  const displayName = profile?.display_name ?? user.email?.split('@')[0] ?? 'Account';
  const avatarUrl = profile?.avatar_url ?? null;

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      {/* Header */}
      <div className="mb-10 flex items-center gap-5">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={displayName}
            width={64}
            height={64}
            className="rounded-full ring-2 ring-border-strong"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-raised ring-2 ring-border-strong">
            <span className="text-xl font-700 text-foreground">
              {displayName[0]?.toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <h1 className="text-2xl font-700 text-foreground">{displayName}</h1>
          <p className="text-sm text-muted">{user.email}</p>
        </div>
        <form action="/auth/sign-out" method="post" className="ml-auto">
          <button
            type="submit"
            className="h-8 rounded-lg border border-border-strong px-3 text-xs font-600 text-muted transition-colors hover:text-foreground"
          >
            Sign out
          </button>
        </form>
      </div>

      {/* Coin balance */}
      <section className="mb-8 flex items-center justify-between rounded-2xl border border-border bg-surface px-6 py-4">
        <div>
          <p className="text-xs font-600 uppercase tracking-widest text-muted">Coins</p>
          <p className="mt-1 text-2xl font-700 text-foreground">{profile?.coin_balance ?? 0}</p>
        </div>
        <Link href="/account/coins" className="text-sm text-muted hover:text-foreground">
          Earn more →
        </Link>
      </section>

      {/* Favourites preview */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-700 text-foreground">Favourites</h2>
          {recentFavs.length > 0 && (
            <Link href="/account/favourites" className="text-sm text-muted hover:text-foreground">
              See all →
            </Link>
          )}
        </div>

        {recentFavs.length === 0 ? (
          <div className="rounded-2xl border border-border bg-surface py-12 text-center">
            <p className="text-sm text-muted">No favourites yet.</p>
            <p className="mt-1 text-xs text-subtle">Tap the ♡ on any wallpaper to save it here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {recentFavs.map((w) => (
              <WallpaperCard key={w.id} wallpaper={w} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
