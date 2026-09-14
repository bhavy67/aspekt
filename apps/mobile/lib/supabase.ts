import { createClient } from '@supabase/supabase-js';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// Phase 8: add AsyncStorage session persistence for auth token storage.
export const supabase = createClient(url, anonKey);
