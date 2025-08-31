import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types
export interface Product {
  id: string
  name: string
  price: number
  description: string
  category: string
  image_url: string
  created_at?: string
  updated_at?: string
}

export interface Contact {
  id: string
  name: string
  email: string
  message: string
  created_at: string
}

export interface UserProfile {
  id: string
  username: string
  name?: string
  role: 'user' | 'admin' | 'superadmin'
  created_at: string
}