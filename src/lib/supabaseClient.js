import { createClient } from '@supabase/supabase-js'

// Note: is possible expose data, here is no sensible data (its a study Project)
const SUPABASE_URL='https://vjzsbndpakprqxecyexe.supabase.co', 
SUPABASE_PUBLISHABLE_KEY='sb_publishable_CzXQK1BKWG7_CG_nVbVNeA_H56rzT5F';
export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);