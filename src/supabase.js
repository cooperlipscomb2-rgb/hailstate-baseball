import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://fhrxyvnucbvhyjzlfxkx.supabase.co"
const SUPABASE_KEY = "sb_publishable_ddFfkN2l5e4s__da24EXWw_BshFmwQS"

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
