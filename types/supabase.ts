export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      services: {
        Row: {
          id: string
          slug: string
          icon_name: string
          title: string
          short_description: string
          description: string
          benefits: string[]
          display_order: number
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          icon_name: string
          title: string
          short_description: string
          description: string
          benefits?: string[]
          display_order?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          icon_name?: string
          title?: string
          short_description?: string
          description?: string
          benefits?: string[]
          display_order?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          slug: string
          title: string
          category: string
          client: string
          summary: string
          result: string
          tags: string[]
          gradient: string
          thumbnail_url: string | null
          gallery_urls: string[] | null
          featured: boolean
          display_order: number
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          category: string
          client: string
          summary: string
          result: string
          tags?: string[]
          gradient: string
          thumbnail_url?: string | null
          gallery_urls?: string[] | null
          featured?: boolean
          display_order?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          category?: string
          client?: string
          summary?: string
          result?: string
          tags?: string[]
          gradient?: string
          thumbnail_url?: string | null
          gallery_urls?: string[] | null
          featured?: boolean
          display_order?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      settings: {
        Row: {
          id: string
          key: string
          value: Json
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: Json
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          updated_at?: string
        }
      }
    }
  }
}
