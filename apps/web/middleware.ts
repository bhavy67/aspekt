import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Refresh session — keeps the auth cookie alive.
  // Must await getUser() (not getSession()) per Supabase ssr docs.
  await supabase.auth.getUser();

  // Guard /account/** — redirect to sign-in if not authenticated
  if (request.nextUrl.pathname.startsWith('/account')) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      const signInUrl = request.nextUrl.clone();
      signInUrl.pathname = '/auth/sign-in';
      signInUrl.searchParams.set('next', request.nextUrl.pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
