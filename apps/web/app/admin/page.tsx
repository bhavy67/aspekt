import { cookies } from 'next/headers';
import { getCategories, getCollections, getWallpapers } from '@/lib/queries';
import { getSessionToken } from '@/lib/admin-auth';
import { AdminClient } from './AdminClient';
import { loginAction } from './actions';

async function isAuthenticated() {
  const jar = await cookies();
  return jar.get('admin_session')?.value === getSessionToken();
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const authed = await isAuthenticated();

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="w-full max-w-sm">
          <h1 className="mb-8 text-center text-xl font-bold text-foreground">ASPEKT Admin</h1>
          {error && (
            <p className="mb-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400 text-center">
              Incorrect password
            </p>
          )}
          <form action={loginAction} className="flex flex-col gap-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoFocus
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="rounded-xl bg-accent-gradient px-4 py-3 text-sm font-semibold text-[#0B0B0E] transition-opacity hover:opacity-90"
            >
              Sign In
            </button>
          </form>
        </div>
      </main>
    );
  }

  const [categories, collections, recentWallpapers] = await Promise.all([
    getCategories(),
    getCollections(),
    getWallpapers({ limit: 10 }),
  ]);

  return (
    <AdminClient
      categories={categories}
      collections={collections}
      recentWallpapers={recentWallpapers}
    />
  );
}
