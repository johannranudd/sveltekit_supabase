import { SupabaseClient, Session, type User } from "@supabase/supabase-js"
import type { Database } from "./lib/supabase-types"
// See https://kit.svelte.dev/docs/types#app

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      supabase: SupabaseClient<Database>
      safeGetSession(): Promise<{ session: Session | null; user: User | null }>
    }
    interface PageData {
      session: Session | null
      user: User | null
    }
    // interface PageState {}
    // interface Platform {}
  }
}

export {}
