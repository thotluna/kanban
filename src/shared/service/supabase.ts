import { createClient } from '@supabase/supabase-js'

const { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } = import.meta.env

export const supabase = createClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY
)
