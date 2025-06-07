// src/services/supabase.js

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bdgwljmmmiprpbonpshr.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkZ3dsam1tbWlwcnBib25wc2hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxNTAzNzIsImV4cCI6MjA2NDcyNjM3Mn0.IQ7YjdyEacwCILUJa5JvwrTeN_3MA-4B49djHYPpMiE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
 