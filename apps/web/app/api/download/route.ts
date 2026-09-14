import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  const filename = req.nextUrl.searchParams.get('filename') ?? 'wallpaper.jpg';

  if (!url) return new NextResponse('Missing url', { status: 400 });

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return new NextResponse('Invalid url', { status: 400 });
  }

  if (parsed.protocol !== 'https:') {
    return new NextResponse('Only https URLs allowed', { status: 400 });
  }

  let response: Response;
  try {
    response = await fetch(url, { next: { revalidate: 3600 } });
  } catch {
    return new NextResponse('Failed to fetch image', { status: 502 });
  }

  if (!response.ok) return new NextResponse('Upstream error', { status: 502 });

  const contentType = response.headers.get('content-type') ?? 'image/jpeg';
  if (!contentType.startsWith('image/')) {
    return new NextResponse('Not an image', { status: 400 });
  }

  const buffer = await response.arrayBuffer();
  const safeFilename = filename.replace(/[^a-z0-9._-]/gi, '_');

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${safeFilename}"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
