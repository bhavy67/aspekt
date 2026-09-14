import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Single shared client — all content is public (RLS allows anon reads).
// Phase 8 will replace with @supabase/ssr cookie-based client for auth.
export const supabase = createClient(url, anonKey);
