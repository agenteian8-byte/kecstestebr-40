// Use the main client for consistency instead of creating a separate public client
import { supabase } from './client';

export const supabasePublic = supabase;
