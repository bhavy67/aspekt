-- Revamp featured wallpapers with 25 curated Unsplash photos.
-- Replaces all picsum placeholder images with real high-quality art.

-- 1. Clear junction tables first (FK order)
DELETE FROM public.wallpaper_collections;
DELETE FROM public.wallpaper_categories;
DELETE FROM public.wallpaper_moods;
DELETE FROM public.wallpapers;

-- 2. Update category covers
UPDATE public.categories SET cover_url = 'https://images.unsplash.com/photo-1700056397549-aeeaaa8d5906?w=2560&h=1440&fit=crop&q=90&auto=format' WHERE slug = 'abstract';
UPDATE public.categories SET cover_url = 'https://images.unsplash.com/photo-1752477296332-4194308c025f?w=2560&h=1440&fit=crop&q=90&auto=format' WHERE slug = 'architecture';
UPDATE public.categories SET cover_url = 'https://images.unsplash.com/photo-1741680581152-8ac5fb23ef47?w=2560&h=1440&fit=crop&q=90&auto=format' WHERE slug = 'minimal';
UPDATE public.categories SET cover_url = 'https://images.unsplash.com/photo-1762279389006-43963a0cee55?w=2560&h=1440&fit=crop&q=90&auto=format' WHERE slug = 'dark';
UPDATE public.categories SET cover_url = 'https://images.unsplash.com/photo-1759851942096-cf73a51532ba?w=2560&h=1440&fit=crop&q=90&auto=format' WHERE slug = 'gradient';

-- 3. Update mood covers
UPDATE public.moods SET cover_url = 'https://images.unsplash.com/photo-1741806914386-c60073a0fed3?w=2560&h=1440&fit=crop&q=90&auto=format' WHERE slug = 'focus';
UPDATE public.moods SET cover_url = 'https://images.unsplash.com/photo-1771814536262-3c1320c8e9ce?w=2560&h=1440&fit=crop&q=90&auto=format' WHERE slug = 'calm';
UPDATE public.moods SET cover_url = 'https://images.unsplash.com/photo-1762279389006-43963a0cee55?w=2560&h=1440&fit=crop&q=90&auto=format' WHERE slug = 'bold';
UPDATE public.moods SET cover_url = 'https://images.unsplash.com/photo-1748885107720-a9b45e5d9b92?w=2560&h=1440&fit=crop&q=90&auto=format' WHERE slug = 'dreamy';

-- 4. Update collection covers
UPDATE public.collections SET cover_url = 'https://images.unsplash.com/photo-1700056397549-aeeaaa8d5906?w=2560&h=1440&fit=crop&q=90&auto=format' WHERE slug = 'dark-mode-essentials';
UPDATE public.collections SET cover_url = 'https://images.unsplash.com/photo-1743102776040-3e36a6e6af3f?w=2560&h=1440&fit=crop&q=90&auto=format' WHERE slug = 'geometric-order';
UPDATE public.collections SET cover_url = 'https://images.unsplash.com/photo-1690382285917-73dfd2a22d07?w=2560&h=1440&fit=crop&q=90&auto=format' WHERE slug = 'natural-light';

-- 5. Insert 25 curated wallpapers
INSERT INTO public.wallpapers (title,slug,image_url,thumbnail_url,width,height,is_free,is_premium,tags,artist_name,color_palette,published_at) VALUES

-- DARK / AMOLED (7)
('Emerald Void',     'emerald-void-f8a2',     'https://images.unsplash.com/photo-1699046794994-865a62e9ff6f?w=3840&h=2160&fit=crop&q=90&auto=format','https://images.unsplash.com/photo-1699046794994-865a62e9ff6f?w=640&h=360&fit=crop&q=80&auto=format',   3840,2160,true,false,ARRAY['dark','green','abstract','amoled'],               'Faded_Gallery',       ARRAY['#0B0B0E','#064E3B','#10B981'],                now()),
('Obsidian Ripple',  'obsidian-ripple-c3e1',  'https://images.unsplash.com/photo-1736843638421-9c3770d28c91?w=2560&h=1440&fit=crop&q=90&auto=format','https://images.unsplash.com/photo-1736843638421-9c3770d28c91?w=640&h=360&fit=crop&q=80&auto=format',   2560,1440,true,false,ARRAY['dark','abstract','wavy','amoled','minimal'],       'Pawel Czerwinski',    ARRAY['#0B0B0E','#13131A','#22222E'],                now()),
('Shadow Waves',     'shadow-waves-b7d4',     'https://images.unsplash.com/photo-1761998066484-daa29b9ad605?w=2560&h=1440&fit=crop&q=90&auto=format','https://images.unsplash.com/photo-1761998066484-daa29b9ad605?w=640&h=360&fit=crop&q=80&auto=format',   2560,1440,true,false,ARRAY['dark','abstract','wavy','minimal','amoled'],       'Andrew Kliatskyi',    ARRAY['#0B0B0E','#1A1A2E','#22222E'],                now()),
('Neon Wire',        'neon-wire-a5c2',        'https://images.unsplash.com/photo-1762279389006-43963a0cee55?w=3840&h=2160&fit=crop&q=90&auto=format','https://images.unsplash.com/photo-1762279389006-43963a0cee55?w=640&h=360&fit=crop&q=80&auto=format',   3840,2160,true,false,ARRAY['dark','neon','abstract','cyberpunk'],             'Logan Voss',          ARRAY['#0B0B0E','#818CF8','#22D3EE'],                now()),
('Carbon Curves',    'carbon-curves-d9f1',    'https://images.unsplash.com/photo-1761998066512-180aac759a3e?w=1170&h=2532&fit=crop&q=90&auto=format','https://images.unsplash.com/photo-1761998066512-180aac759a3e?w=296&h=640&fit=crop&q=80&auto=format',    1170,2532,true,false,ARRAY['dark','abstract','minimal','amoled','curves'],    'Andrew Kliatskyi',    ARRAY['#0B0B0E','#13131A'],                          now()),
('Chrome Flow',      'chrome-flow-e2b8',      'https://images.unsplash.com/photo-1700056397549-aeeaaa8d5906?w=3840&h=2160&fit=crop&q=90&auto=format','https://images.unsplash.com/photo-1700056397549-aeeaaa8d5906?w=640&h=360&fit=crop&q=80&auto=format',   3840,2160,true,false,ARRAY['dark','iridescent','abstract','metallic'],         'Faded_Gallery',       ARRAY['#0B0B0E','#818CF8','#F472B6','#22D3EE'],     now()),
('Midnight Streak',  'midnight-streak-f4a6',  'https://images.unsplash.com/photo-1687844599821-e0eceea6f6a1?w=1080&h=2400&fit=crop&q=90&auto=format','https://images.unsplash.com/photo-1687844599821-e0eceea6f6a1?w=270&h=600&fit=crop&q=80&auto=format',    1080,2400,true,false,ARRAY['dark','neon','lights','amoled','moody'],          'Jatin Gajjar',        ARRAY['#0B0B0E','#22D3EE','#818CF8'],                now()),

-- GRADIENT (7)
('Burnt Horizon',    'burnt-horizon-c1d3',    'https://images.unsplash.com/photo-1749680287741-243118ed6b2c?w=2560&h=1440&fit=crop&q=90&auto=format','https://images.unsplash.com/photo-1749680287741-243118ed6b2c?w=640&h=360&fit=crop&q=80&auto=format',   2560,1440,true,false,ARRAY['gradient','orange','warm','abstract'],              'Philip Oroni',        ARRAY['#F59E0B','#EF4444','#D97706'],                now()),
('Solar Wash',       'solar-wash-a7b5',       'https://images.unsplash.com/photo-1762503203781-27fe855f2e42?w=1920&h=1080&fit=crop&q=90&auto=format','https://images.unsplash.com/photo-1762503203781-27fe855f2e42?w=640&h=360&fit=crop&q=80&auto=format',   1920,1080,true,false,ARRAY['gradient','orange','yellow','warm','abstract'],    'asi mong',            ARRAY['#F97316','#F59E0B','#EF4444'],                now()),
('Prismatic Blur',   'prismatic-blur-d2e9',   'https://images.unsplash.com/photo-1748885107720-a9b45e5d9b92?w=1170&h=2532&fit=crop&q=90&auto=format','https://images.unsplash.com/photo-1748885107720-a9b45e5d9b92?w=296&h=640&fit=crop&q=80&auto=format',    1170,2532,true,false,ARRAY['gradient','colorful','abstract','blur'],           'Alexander X.',        ARRAY['#818CF8','#F472B6','#22D3EE'],                now()),
('Spectrum Orb',     'spectrum-orb-b1c8',     'https://images.unsplash.com/photo-1759851942096-cf73a51532ba?w=3840&h=2160&fit=crop&q=90&auto=format','https://images.unsplash.com/photo-1759851942096-cf73a51532ba?w=640&h=360&fit=crop&q=80&auto=format',   3840,2160,true,false,ARRAY['gradient','abstract','3d','geometric'],            'Steve A Johnson',     ARRAY['#818CF8','#7C3AED','#22D3EE'],                now()),
('Violet Depths',    'violet-depths-f3e5',    'https://images.unsplash.com/photo-1663970206579-c157cba7edda?w=2880&h=1800&fit=crop&q=90&auto=format','https://images.unsplash.com/photo-1663970206579-c157cba7edda?w=640&h=400&fit=crop&q=80&auto=format',   2880,1800,true,false,ARRAY['gradient','dark','purple','blue'],                 'BoliviaInteligente',  ARRAY['#1E1B4B','#4338CA','#7C3AED'],                now()),
('Cosmic Purple',    'cosmic-purple-a8d1',    'https://images.unsplash.com/photo-1673526759327-54f1f5b27322?w=2560&h=1440&fit=crop&q=90&auto=format','https://images.unsplash.com/photo-1673526759327-54f1f5b27322?w=640&h=360&fit=crop&q=80&auto=format',   2560,1440,true,false,ARRAY['gradient','purple','dark','abstract'],              'Gradient Wallpapers', ARRAY['#7C3AED','#0B0B0E','#818CF8'],                now()),
('Indigo Abyss',     'indigo-abyss-c5f2',     'https://images.unsplash.com/photo-1771814536262-3c1320c8e9ce?w=1080&h=2400&fit=crop&q=90&auto=format','https://images.unsplash.com/photo-1771814536262-3c1320c8e9ce?w=270&h=600&fit=crop&q=80&auto=format',    1080,2400,true,false,ARRAY['gradient','dark','blue','purple'],                 'Antonius Harel',      ARRAY['#1E1B4B','#818CF8','#22D3EE'],                now()),

-- MINIMAL (6)
('Geo Minimal',      'geo-minimal-b3a7',      'https://images.unsplash.com/photo-1751738567808-6affa516fedc?w=2560&h=1440&fit=crop&q=90&auto=format','https://images.unsplash.com/photo-1751738567808-6affa516fedc?w=640&h=360&fit=crop&q=80&auto=format',   2560,1440,true,false,ARRAY['minimal','geometric','abstract','3d'],              'Pawel Czerwinski',    ARRAY['#EDEDF2','#8686A0','#F0F0F8'],                now()),
('Marble Grid',      'marble-grid-e6c4',      'https://images.unsplash.com/photo-1743102776040-3e36a6e6af3f?w=3840&h=2160&fit=crop&q=90&auto=format','https://images.unsplash.com/photo-1743102776040-3e36a6e6af3f?w=640&h=360&fit=crop&q=80&auto=format',   3840,2160,true,false,ARRAY['minimal','geometric','texture','abstract'],        'Pawel Czerwinski',    ARRAY['#F0F0F8','#DCDCEC','#8686A0'],                now()),
('White Folds',      'white-folds-d1b9',      'https://images.unsplash.com/photo-1741680581152-8ac5fb23ef47?w=2560&h=1440&fit=crop&q=90&auto=format','https://images.unsplash.com/photo-1741680581152-8ac5fb23ef47?w=640&h=360&fit=crop&q=80&auto=format',   2560,1440,true,false,ARRAY['minimal','white','folds','clean','texture'],        'Pawel Czerwinski',    ARRAY['#F8F8FC','#E4E4F0','#DCDCEC'],                now()),
('Silk Lines',       'silk-lines-a2f5',       'https://images.unsplash.com/photo-1741806914386-c60073a0fed3?w=1920&h=1080&fit=crop&q=90&auto=format','https://images.unsplash.com/photo-1741806914386-c60073a0fed3?w=640&h=360&fit=crop&q=80&auto=format',   1920,1080,true,false,ARRAY['minimal','white','wavy','lines','clean'],           'Pawel Czerwinski',    ARRAY['#F8F8FC','#EDEDF2','#DCDCEC'],                now()),
('Monochrome Waves', 'monochrome-waves-c8d3', 'https://images.unsplash.com/photo-1740686004244-e9bc7c75d8e5?w=1170&h=2532&fit=crop&q=90&auto=format','https://images.unsplash.com/photo-1740686004244-e9bc7c75d8e5?w=296&h=640&fit=crop&q=80&auto=format',    1170,2532,true,false,ARRAY['minimal','dark','wavy','monochrome','abstract'],   'Pawel Czerwinski',    ARRAY['#0B0B0E','#22222E','#46465A'],                now()),
('Cubic Noir',       'cubic-noir-f1e7',       'https://images.unsplash.com/photo-1737505598998-693328b57ae3?w=2880&h=1800&fit=crop&q=90&auto=format','https://images.unsplash.com/photo-1737505598998-693328b57ae3?w=640&h=400&fit=crop&q=80&auto=format',   2880,1800,true,false,ARRAY['minimal','dark','geometric','blocks','abstract'],   'Ecliptic Graphic',    ARRAY['#0B0B0E','#13131A','#22222E'],                now()),

-- ABSTRACT (2)
('Rainbow Ribbon',   'rainbow-ribbon-b4a2',   'https://images.unsplash.com/photo-1690382285917-73dfd2a22d07?w=3840&h=2160&fit=crop&q=90&auto=format','https://images.unsplash.com/photo-1690382285917-73dfd2a22d07?w=640&h=360&fit=crop&q=80&auto=format',   3840,2160,true,false,ARRAY['abstract','colorful','wavy','gradient','3d'],      'Sebastian Svenson',   ARRAY['#818CF8','#F472B6','#22D3EE','#F59E0B'],     now()),
('Teal Pulse',       'teal-pulse-d6c1',       'https://images.unsplash.com/photo-1758551059627-e891d671e010?w=2560&h=1440&fit=crop&q=90&auto=format','https://images.unsplash.com/photo-1758551059627-e891d671e010?w=640&h=360&fit=crop&q=80&auto=format',   2560,1440,true,false,ARRAY['abstract','teal','dark','neon','waves'],            'Mirella Callage',     ARRAY['#22D3EE','#0B0B0E','#059669'],                now()),

-- ARCHITECTURE (3)
('Iron Symmetry',    'iron-symmetry-f5b3',    'https://images.unsplash.com/photo-1752477296332-4194308c025f?w=2560&h=1440&fit=crop&q=90&auto=format','https://images.unsplash.com/photo-1752477296332-4194308c025f?w=640&h=360&fit=crop&q=80&auto=format',   2560,1440,true,false,ARRAY['architecture','dark','abstract','symmetry','urban'],'Mike Hindle',         ARRAY['#0B0B0E','#13131A','#46465A'],                now()),
('Dark Facade',      'dark-facade-a9e4',      'https://images.unsplash.com/photo-1767716843858-f7d3d6d2da7d?w=1080&h=2400&fit=crop&q=90&auto=format','https://images.unsplash.com/photo-1767716843858-f7d3d6d2da7d?w=270&h=600&fit=crop&q=80&auto=format',    1080,2400,true,false,ARRAY['architecture','dark','abstract','symmetry'],         'Mike Hindle',         ARRAY['#0B0B0E','#22222E','#13131A'],                now()),
('White Corner',     'white-corner-c2d8',     'https://images.unsplash.com/photo-1761600577013-7fc9f5f03f66?w=1920&h=1080&fit=crop&q=90&auto=format','https://images.unsplash.com/photo-1761600577013-7fc9f5f03f66?w=640&h=360&fit=crop&q=80&auto=format',   1920,1080,true,false,ARRAY['architecture','minimal','white','clean','geometric'], 'Sebastian Schuster',  ARRAY['#F8F8FC','#EDEDF2','#8686A0'],                now());

-- 6. wallpaper_categories
INSERT INTO public.wallpaper_categories (wallpaper_id, category_id)
SELECT w.id, c.id FROM public.wallpapers w JOIN public.categories c ON (
  (c.slug='dark'         AND w.slug IN ('emerald-void-f8a2','obsidian-ripple-c3e1','shadow-waves-b7d4','neon-wire-a5c2','carbon-curves-d9f1','chrome-flow-e2b8','midnight-streak-f4a6'))
  OR (c.slug='gradient'  AND w.slug IN ('burnt-horizon-c1d3','solar-wash-a7b5','prismatic-blur-d2e9','spectrum-orb-b1c8','violet-depths-f3e5','cosmic-purple-a8d1','indigo-abyss-c5f2'))
  OR (c.slug='minimal'   AND w.slug IN ('geo-minimal-b3a7','marble-grid-e6c4','white-folds-d1b9','silk-lines-a2f5','monochrome-waves-c8d3','cubic-noir-f1e7'))
  OR (c.slug='abstract'  AND w.slug IN ('rainbow-ribbon-b4a2','teal-pulse-d6c1'))
  OR (c.slug='architecture' AND w.slug IN ('iron-symmetry-f5b3','dark-facade-a9e4','white-corner-c2d8'))
);

-- 7. wallpaper_moods
INSERT INTO public.wallpaper_moods (wallpaper_id, mood_id)
SELECT w.id, m.id FROM public.wallpapers w JOIN public.moods m ON (
  (m.slug='focus'  AND w.slug IN ('geo-minimal-b3a7','marble-grid-e6c4','white-folds-d1b9','silk-lines-a2f5','white-corner-c2d8','cubic-noir-f1e7','monochrome-waves-c8d3'))
  OR (m.slug='calm'  AND w.slug IN ('burnt-horizon-c1d3','solar-wash-a7b5','cosmic-purple-a8d1','indigo-abyss-c5f2','shadow-waves-b7d4','obsidian-ripple-c3e1','carbon-curves-d9f1'))
  OR (m.slug='bold'  AND w.slug IN ('emerald-void-f8a2','neon-wire-a5c2','chrome-flow-e2b8','midnight-streak-f4a6','teal-pulse-d6c1','iron-symmetry-f5b3','dark-facade-a9e4'))
  OR (m.slug='dreamy' AND w.slug IN ('prismatic-blur-d2e9','spectrum-orb-b1c8','violet-depths-f3e5','rainbow-ribbon-b4a2','burnt-horizon-c1d3'))
);

-- 8. wallpaper_collections
INSERT INTO public.wallpaper_collections (wallpaper_id, collection_id, sort_order)
SELECT w.id, c.id,
  ROW_NUMBER() OVER (PARTITION BY c.slug ORDER BY w.title) - 1
FROM public.wallpapers w JOIN public.collections c ON (
  (c.slug='dark-mode-essentials' AND w.slug IN ('emerald-void-f8a2','neon-wire-a5c2','chrome-flow-e2b8','midnight-streak-f4a6','cosmic-purple-a8d1','indigo-abyss-c5f2','cubic-noir-f1e7','teal-pulse-d6c1','iron-symmetry-f5b3'))
  OR (c.slug='geometric-order'   AND w.slug IN ('geo-minimal-b3a7','marble-grid-e6c4','spectrum-orb-b1c8','monochrome-waves-c8d3','dark-facade-a9e4'))
  OR (c.slug='natural-light'     AND w.slug IN ('white-folds-d1b9','silk-lines-a2f5','white-corner-c2d8','rainbow-ribbon-b4a2','burnt-horizon-c1d3','solar-wash-a7b5'))
);
