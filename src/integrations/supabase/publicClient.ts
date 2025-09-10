// Lightweight public Supabase client for read-only queries without attaching user session
// This avoids RLS differences between anon vs authenticated sessions for public data.

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://btjullcrugzilpnxjoyr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0anVsbGNydWd6aWxwbnhqb3lyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNzU1OTgsImV4cCI6MjA3Mjc1MTU5OH0.lBmJsUovvaIhf2dS9LNO1oRrk7ZPaGfCISJHwLlZu9Y";

export const supabasePublic = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
    },
    global: {
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
      },
    },
  }
);
