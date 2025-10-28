// services/supabase.js
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://zsmxoqvvqqgpvzokzxns.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzbXhvcXZ2cXFncHZ6b2t6eG5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5MDU2MDEsImV4cCI6MjA2OTQ4MTYwMX0.QPl5UNlfsbnShGdifKXl4wZwV_QgLpbBlfAnW_0d6J8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

