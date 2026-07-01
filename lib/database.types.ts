export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      accreditations: {
        Row: {
          abbr: string
          certificate_url: string | null
          id: number
          logo_url: string | null
          name: string
          reg_no: string | null
          sort: number
        }
        Insert: {
          abbr: string
          certificate_url?: string | null
          id?: never
          logo_url?: string | null
          name: string
          reg_no?: string | null
          sort?: number
        }
        Update: {
          abbr?: string
          certificate_url?: string | null
          id?: never
          logo_url?: string | null
          name?: string
          reg_no?: string | null
          sort?: number
        }
        Relationships: []
      }
      alumni: {
        Row: {
          batch: string | null
          company: string | null
          id: number
          name: string
          photo_url: string | null
          programme: string | null
          quote: string | null
          role: string | null
          sort: number
        }
        Insert: {
          batch?: string | null
          company?: string | null
          id?: never
          name: string
          photo_url?: string | null
          programme?: string | null
          quote?: string | null
          role?: string | null
          sort?: number
        }
        Update: {
          batch?: string | null
          company?: string | null
          id?: never
          name?: string
          photo_url?: string | null
          programme?: string | null
          quote?: string | null
          role?: string | null
          sort?: number
        }
        Relationships: []
      }
      announcements: {
        Row: { created_at: string; description: string; id: number; sort: number }
        Insert: { created_at?: string; description: string; id?: never; sort?: number }
        Update: { created_at?: string; description?: string; id?: never; sort?: number }
        Relationships: []
      }
      applications: {
        Row: {
          city: string | null
          created_at: string
          department: string | null
          dob: string | null
          document_path: string | null
          email: string | null
          id: number
          message: string | null
          mobile: string | null
          name: string | null
          percentage: string | null
          programme: string | null
          qualification: string | null
          state: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string
          department?: string | null
          dob?: string | null
          document_path?: string | null
          email?: string | null
          id?: never
          message?: string | null
          mobile?: string | null
          name?: string | null
          percentage?: string | null
          programme?: string | null
          qualification?: string | null
          state?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string
          department?: string | null
          dob?: string | null
          document_path?: string | null
          email?: string | null
          id?: never
          message?: string | null
          mobile?: string | null
          name?: string | null
          percentage?: string | null
          programme?: string | null
          qualification?: string | null
          state?: string | null
        }
        Relationships: []
      }
      enquiries: {
        Row: {
          city: string | null
          created_at: string
          department: string | null
          email: string | null
          id: number
          mobile: string | null
          name: string | null
          programme: string | null
          state: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string
          department?: string | null
          email?: string | null
          id?: never
          mobile?: string | null
          name?: string | null
          programme?: string | null
          state?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string
          department?: string | null
          email?: string | null
          id?: never
          mobile?: string | null
          name?: string | null
          programme?: string | null
          state?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          event_description: string | null
          event_name: string | null
          id: number
          image_1_url: string | null
          image_2_url: string | null
          image_3_url: string | null
          images: string[]
        }
        Insert: {
          created_at?: string
          event_description?: string | null
          event_name?: string | null
          id?: never
          image_1_url?: string | null
          image_2_url?: string | null
          image_3_url?: string | null
          images?: string[]
        }
        Update: {
          created_at?: string
          event_description?: string | null
          event_name?: string | null
          id?: never
          image_1_url?: string | null
          image_2_url?: string | null
          image_3_url?: string | null
          images?: string[]
        }
        Relationships: []
      }
      faculties: {
        Row: {
          bio: string | null
          created_at: string
          designation: string | null
          id: number
          name: string
          photo_url: string | null
          sort: number
        }
        Insert: {
          bio?: string | null
          created_at?: string
          designation?: string | null
          id?: never
          name: string
          photo_url?: string | null
          sort?: number
        }
        Update: {
          bio?: string | null
          created_at?: string
          designation?: string | null
          id?: never
          name?: string
          photo_url?: string | null
          sort?: number
        }
        Relationships: []
      }
      faqs: {
        Row: { answer: string; id: number; question: string; sort: number }
        Insert: { answer: string; id?: never; question: string; sort?: number }
        Update: { answer?: string; id?: never; question?: string; sort?: number }
        Relationships: []
      }
      grievances: {
        Row: {
          created_at: string
          description: string | null
          enrollment_no: string | null
          id: number
          name: string | null
          programme: string | null
          year: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          enrollment_no?: string | null
          id?: never
          name?: string | null
          programme?: string | null
          year?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          enrollment_no?: string | null
          id?: never
          name?: string | null
          programme?: string | null
          year?: string | null
        }
        Relationships: []
      }
      leadership: {
        Row: { id: number; image_url: string | null; message: string | null; name: string | null; role: string | null }
        Insert: { id?: number; image_url?: string | null; message?: string | null; name?: string | null; role?: string | null }
        Update: { id?: number; image_url?: string | null; message?: string | null; name?: string | null; role?: string | null }
        Relationships: []
      }
      notices: {
        Row: { created_at: string; description: string; id: number; sort: number }
        Insert: { created_at?: string; description: string; id?: never; sort?: number }
        Update: { created_at?: string; description?: string; id?: never; sort?: number }
        Relationships: []
      }
      payment_links: {
        Row: { description: string | null; id: number; institute: string; sort: number; url: string }
        Insert: { description?: string | null; id?: never; institute: string; sort?: number; url: string }
        Update: { description?: string | null; id?: never; institute?: string; sort?: number; url?: string }
        Relationships: []
      }
      placement_record: {
        Row: { highest: string | null; id: number; offers: number | null; placed: string | null; sort: number; year: string }
        Insert: { highest?: string | null; id?: never; offers?: number | null; placed?: string | null; sort?: number; year: string }
        Update: { highest?: string | null; id?: never; offers?: number | null; placed?: string | null; sort?: number; year?: string }
        Relationships: []
      }
      placement_stats: {
        Row: { id: number; label: string; sort: number; value: string }
        Insert: { id?: never; label: string; sort?: number; value: string }
        Update: { id?: never; label?: string; sort?: number; value?: string }
        Relationships: []
      }
      programmes: {
        Row: {
          approval: string | null
          careers: string | null
          description: string | null
          duration: string | null
          eligibility: string | null
          fees: string | null
          id: number
          image_url: string | null
          intake: string | null
          level: string
          level_label: string
          mode: string | null
          name: string
          school: string
          slug: string
          sort: number
        }
        Insert: {
          approval?: string | null
          careers?: string | null
          description?: string | null
          duration?: string | null
          eligibility?: string | null
          fees?: string | null
          id?: never
          image_url?: string | null
          intake?: string | null
          level: string
          level_label: string
          mode?: string | null
          name: string
          school: string
          slug: string
          sort?: number
        }
        Update: {
          approval?: string | null
          careers?: string | null
          description?: string | null
          duration?: string | null
          eligibility?: string | null
          fees?: string | null
          id?: never
          image_url?: string | null
          intake?: string | null
          level?: string
          level_label?: string
          mode?: string | null
          name?: string
          school?: string
          slug?: string
          sort?: number
        }
        Relationships: []
      }
      recruiters: {
        Row: { id: number; logo_url: string | null; name: string; sort: number }
        Insert: { id?: never; logo_url?: string | null; name: string; sort?: number }
        Update: { id?: never; logo_url?: string | null; name?: string; sort?: number }
        Relationships: []
      }
      site_settings: {
        Row: {
          address: string | null
          email1: string | null
          email2: string | null
          email3: string | null
          helpline: string | null
          hero_subtitle: string | null
          hero_title: string | null
          id: number
          instagram_url: string | null
          linkedin_url: string | null
          maps_query: string | null
          maps_url: string | null
          prospectus_url: string | null
          whatsapp: string | null
          youtube_url: string | null
        }
        Insert: {
          address?: string | null
          email1?: string | null
          email2?: string | null
          email3?: string | null
          helpline?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: number
          instagram_url?: string | null
          linkedin_url?: string | null
          maps_query?: string | null
          maps_url?: string | null
          prospectus_url?: string | null
          whatsapp?: string | null
          youtube_url?: string | null
        }
        Update: {
          address?: string | null
          email1?: string | null
          email2?: string | null
          email3?: string | null
          helpline?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: number
          instagram_url?: string | null
          linkedin_url?: string | null
          maps_query?: string | null
          maps_url?: string | null
          prospectus_url?: string | null
          whatsapp?: string | null
          youtube_url?: string | null
        }
        Relationships: []
      }
      stats: {
        Row: { id: number; label: string; sort: number; value: string }
        Insert: { id?: never; label: string; sort?: number; value: string }
        Update: { id?: never; label?: string; sort?: number; value?: string }
        Relationships: []
      }
      testimonials: {
        Row: { detail: string | null; id: number; name: string; photo_url: string | null; quote: string; sort: number }
        Insert: { detail?: string | null; id?: never; name: string; photo_url?: string | null; quote: string; sort?: number }
        Update: { detail?: string | null; id?: never; name?: string; photo_url?: string | null; quote?: string; sort?: number }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}
