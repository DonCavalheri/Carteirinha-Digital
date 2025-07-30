import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zsmxoqvvqqgpvzokzxns.supabase.co'; // coloque o seu
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzbXhvcXZ2cXFncHZ6b2t6eG5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5MDU2MDEsImV4cCI6MjA2OTQ4MTYwMX0.QPl5UNlfsbnShGdifKXl4wZwV_QgLpbBlfAnW_0d6J8'; // coloque sua chave

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);