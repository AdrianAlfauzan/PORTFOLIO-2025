import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase environment variables are missing!\n" +
      "Please check your .env.local file and restart the dev server.\n" +
      "Required variables:\n" +
      "- NEXT_PUBLIC_SUPABASE_URL\n" +
      "- NEXT_PUBLIC_SUPABASE_ANON_KEY\n\n" +
      "Current values:\n" +
      `URL: ${supabaseUrl ? "Set" : "Missing"}\n` +
      `Key: ${supabaseAnonKey ? "Set" : "Missing"}`
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// console.log("Supabase client initialized successfully");
