-- ASPEKT seed data — Phase 5
-- Applied via: supabase db reset (local) or MCP execute_sql (remote)

INSERT INTO public.categories (name, slug, description, cover_url, sort_order) VALUES
('Abstract',     'abstract',     'Geometric, fluid, and digital art',               'https://picsum.photos/seed/aspekt-1/2560/1440',  1),
('Architecture', 'architecture', 'Buildings, structures, and urban spaces',         'https://picsum.photos/seed/aspekt-7/2560/1440',  2),
('Nature',       'nature',       'Landscapes, forests, oceans, and natural scenes', 'https://picsum.photos/seed/aspekt-13/2560/1440', 3),
('Minimal',      'minimal',      'Clean, simple, and uncluttered compositions',     'https://picsum.photos/seed/aspekt-10/2560/1440', 4),
('Dark',         'dark',         'Moody, atmospheric, and low-light imagery',       'https://picsum.photos/seed/aspekt-5/2560/1440',  5),
('Gradient',     'gradient',     'Color washes, light leaks, smooth transitions',   'https://picsum.photos/seed/aspekt-19/2560/1440', 6);

INSERT INTO public.moods (name, slug, description, cover_url, sort_order) VALUES
('Focus',  'focus',  'Clean and uncluttered for productive work', 'https://picsum.photos/seed/aspekt-10/2560/1440', 1),
('Calm',   'calm',   'Serene, soft, and peaceful',                'https://picsum.photos/seed/aspekt-13/2560/1440', 2),
('Bold',   'bold',   'Vibrant, energetic, and high contrast',     'https://picsum.photos/seed/aspekt-19/2560/1440', 3),
('Dreamy', 'dreamy', 'Soft light, ethereal, and evocative',       'https://picsum.photos/seed/aspekt-1/2560/1440',  4);

INSERT INTO public.collections (name, slug, description, cover_url, curator_name, published_at) VALUES
('Dark Mode Essentials', 'dark-mode-essentials', 'The finest wallpapers that shine on dark-themed setups',         'https://picsum.photos/seed/aspekt-5/2560/1440',  'ASPEKT Curatorial', now()),
('Geometric Order',      'geometric-order',      'Precision, structure, and satisfying patterns',                   'https://picsum.photos/seed/aspekt-9/2560/1440',  'ASPEKT Curatorial', now()),
('Natural Light',        'natural-light',        'Luminous outdoor scenes, golden-hour photography, open sky',     'https://picsum.photos/seed/aspekt-16/2560/1440', 'ASPEKT Curatorial', now());

INSERT INTO public.wallpapers (title,slug,image_url,thumbnail_url,width,height,is_free,is_premium,tags,artist_name,color_palette,published_at) VALUES
('Aurora Cascade',  'aurora-cascade-a8f3',  'https://picsum.photos/seed/aspekt-1/2560/1440',  'https://picsum.photos/seed/aspekt-1/640/360',   2560,1440,true,false,ARRAY['abstract','aurora','flow'],           NULL,ARRAY['#818CF8','#22D3EE'],now()),
('Indigo Depths',   'indigo-depths-b2c1',   'https://picsum.photos/seed/aspekt-2/1170/2532',  'https://picsum.photos/seed/aspekt-2/296/640',   1170,2532,true,false,ARRAY['abstract','indigo','deep'],            NULL,ARRAY['#818CF8','#4338CA'],now()),
('Prismatic Flow',  'prismatic-flow-c9e4',  'https://picsum.photos/seed/aspekt-3/3840/2160',  'https://picsum.photos/seed/aspekt-3/640/360',   3840,2160,true,false,ARRAY['abstract','prismatic','light'],         NULL,ARRAY['#818CF8','#F472B6'],now()),
('Void Crystal',    'void-crystal-d1f2',    'https://picsum.photos/seed/aspekt-4/1080/2400',  'https://picsum.photos/seed/aspekt-4/270/600',   1080,2400,true,false,ARRAY['dark','crystal','abstract'],           NULL,ARRAY['#0B0B0E','#22222E'],now()),
('Obsidian Mirror', 'obsidian-mirror-e3a7', 'https://picsum.photos/seed/aspekt-5/2560/1440',  'https://picsum.photos/seed/aspekt-5/640/360',   2560,1440,true,false,ARRAY['dark','obsidian','minimal'],           NULL,ARRAY['#0B0B0E','#13131A'],now()),
('Midnight Grid',   'midnight-grid-f5b8',   'https://picsum.photos/seed/aspekt-6/1920/1080',  'https://picsum.photos/seed/aspekt-6/640/360',   1920,1080,true,false,ARRAY['dark','grid','architecture'],          NULL,ARRAY['#0B0B0E','#818CF8'],now()),
('Concrete Horizon','concrete-horizon-a1c2','https://picsum.photos/seed/aspekt-7/1170/2532',  'https://picsum.photos/seed/aspekt-7/296/640',   1170,2532,true,false,ARRAY['architecture','concrete','urban'],     NULL,ARRAY['#8686A0','#EDEDF2'],now()),
('Glass Tower',     'glass-tower-b3d4',     'https://picsum.photos/seed/aspekt-8/3840/2160',  'https://picsum.photos/seed/aspekt-8/640/360',   3840,2160,true,false,ARRAY['architecture','glass','modern'],       NULL,ARRAY['#22D3EE','#F0F0F8'],now()),
('Urban Geometry',  'urban-geometry-c5e6',  'https://picsum.photos/seed/aspekt-9/2560/1440',  'https://picsum.photos/seed/aspekt-9/640/360',   2560,1440,true,false,ARRAY['architecture','geometry','lines'],     NULL,ARRAY['#46465A','#EDEDF2'],now()),
('Minimal White',   'minimal-white-d7f8',   'https://picsum.photos/seed/aspekt-10/3840/2160', 'https://picsum.photos/seed/aspekt-10/640/360',  3840,2160,true,false,ARRAY['minimal','white','clean'],             NULL,ARRAY['#F8F8FC','#E4E4F0'],now()),
('Clean Lines',     'clean-lines-e9a0',     'https://picsum.photos/seed/aspekt-11/1920/1080', 'https://picsum.photos/seed/aspekt-11/640/360',  1920,1080,true,false,ARRAY['minimal','lines','graphic'],           NULL,ARRAY['#EDEDF2','#8686A0'],now()),
('Paper Space',     'paper-space-f0b1',     'https://picsum.photos/seed/aspekt-12/2880/1800', 'https://picsum.photos/seed/aspekt-12/640/400',  2880,1800,true,false,ARRAY['minimal','paper','white'],             NULL,ARRAY['#F0F0F8','#DCDCEC'],now()),
('Forest Veil',     'forest-veil-a2c3',     'https://picsum.photos/seed/aspekt-13/2560/1440', 'https://picsum.photos/seed/aspekt-13/640/360',  2560,1440,true,false,ARRAY['nature','forest','green'],             NULL,ARRAY['#059669','#022C22'],now()),
('Mountain Echo',   'mountain-echo-b4d5',   'https://picsum.photos/seed/aspekt-14/1170/2532', 'https://picsum.photos/seed/aspekt-14/296/640',  1170,2532,true,false,ARRAY['nature','mountain','landscape'],       NULL,ARRAY['#6B7280','#E5E7EB'],now()),
('Ocean Drift',     'ocean-drift-c6e7',     'https://picsum.photos/seed/aspekt-15/3840/2160', 'https://picsum.photos/seed/aspekt-15/640/360',  3840,2160,true,false,ARRAY['nature','ocean','water'],              NULL,ARRAY['#22D3EE','#0B0B0E'],now()),
('Golden Hour',     'golden-hour-d8f9',     'https://picsum.photos/seed/aspekt-16/1080/2400', 'https://picsum.photos/seed/aspekt-16/270/600',  1080,2400,true,false,ARRAY['nature','sunset','warm','golden'],     NULL,ARRAY['#F59E0B','#EF4444'],now()),
('Dusk Valley',     'dusk-valley-e0a1',     'https://picsum.photos/seed/aspekt-17/2560/1440', 'https://picsum.photos/seed/aspekt-17/640/360',  2560,1440,true,false,ARRAY['nature','dusk','valley','purple'],     NULL,ARRAY['#818CF8','#F59E0B'],now()),
('Winter Fog',      'winter-fog-f2b3',      'https://picsum.photos/seed/aspekt-18/1920/1080', 'https://picsum.photos/seed/aspekt-18/640/360',  1920,1080,true,false,ARRAY['nature','winter','fog','minimal'],     NULL,ARRAY['#EDEDF2','#8686A0'],now()),
('Gradient Pulse',  'gradient-pulse-a4c5',  'https://picsum.photos/seed/aspekt-19/1170/2532', 'https://picsum.photos/seed/aspekt-19/296/640',  1170,2532,true,false,ARRAY['gradient','pulse','vibrant'],          NULL,ARRAY['#818CF8','#22D3EE'],now()),
('Chromatic Dawn',  'chromatic-dawn-b6d7',  'https://picsum.photos/seed/aspekt-20/3840/2160', 'https://picsum.photos/seed/aspekt-20/640/360',  3840,2160,true,false,ARRAY['gradient','chromatic','pink'],         NULL,ARRAY['#F472B6','#818CF8'],now()),
('Neon Fade',       'neon-fade-c8e9',       'https://picsum.photos/seed/aspekt-21/2560/1440', 'https://picsum.photos/seed/aspekt-21/640/360',  2560,1440,true,false,ARRAY['gradient','neon','dark'],              NULL,ARRAY['#818CF8','#0B0B0E'],now()),
('Solar Flare',     'solar-flare-d0f1',     'https://picsum.photos/seed/aspekt-22/1080/2400', 'https://picsum.photos/seed/aspekt-22/270/600',  1080,2400,true,false,ARRAY['gradient','solar','warm'],             NULL,ARRAY['#F59E0B','#EF4444'],now()),
('Violet Dream',    'violet-dream-e2a3',    'https://picsum.photos/seed/aspekt-23/1920/1080', 'https://picsum.photos/seed/aspekt-23/640/360',  1920,1080,true,false,ARRAY['gradient','violet','purple'],          NULL,ARRAY['#818CF8','#7C3AED'],now()),
('Teal Horizon',    'teal-horizon-f4b5',    'https://picsum.photos/seed/aspekt-24/1170/2532', 'https://picsum.photos/seed/aspekt-24/296/640',  1170,2532,true,false,ARRAY['gradient','teal','horizon'],           NULL,ARRAY['#22D3EE','#059669'],now()),
('Cyberpunk Alley', 'cyberpunk-alley-a6c7', 'https://picsum.photos/seed/aspekt-25/3840/2160', 'https://picsum.photos/seed/aspekt-25/640/360',  3840,2160,true,false,ARRAY['dark','cyberpunk','neon','urban'],     NULL,ARRAY['#818CF8','#0B0B0E'],now()),
('Red Desert',      'red-desert-b8d9',      'https://picsum.photos/seed/aspekt-26/2560/1440', 'https://picsum.photos/seed/aspekt-26/640/360',  2560,1440,true,false,ARRAY['nature','desert','red','warm'],        NULL,ARRAY['#EF4444','#F59E0B'],now()),
('Ice Lake',        'ice-lake-c0e1',        'https://picsum.photos/seed/aspekt-27/1080/2400', 'https://picsum.photos/seed/aspekt-27/270/600',  1080,2400,true,false,ARRAY['nature','ice','cold','blue'],          NULL,ARRAY['#22D3EE','#F8F8FC'],now()),
('Storm Break',     'storm-break-d2f3',     'https://picsum.photos/seed/aspekt-28/1920/1080', 'https://picsum.photos/seed/aspekt-28/640/360',  1920,1080,true,false,ARRAY['nature','storm','dramatic'],           NULL,ARRAY['#46465A','#0B0B0E'],now()),
('Bronze Gate',     'bronze-gate-e4a5',     'https://picsum.photos/seed/aspekt-29/1170/2532', 'https://picsum.photos/seed/aspekt-29/296/640',  1170,2532,true,false,ARRAY['architecture','bronze','ancient'],     NULL,ARRAY['#D97706','#78350F'],now()),
('Fractured Light', 'fractured-light-f6b7', 'https://picsum.photos/seed/aspekt-30/2880/1800', 'https://picsum.photos/seed/aspekt-30/640/400',  2880,1800,true,false,ARRAY['abstract','fractured','light'],        NULL,ARRAY['#F472B6','#818CF8'],now());
