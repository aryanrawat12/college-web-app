export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

/** JSON blob stored in news_tracker_state.payload */
export type NewsTrackerStatePayload = {
  config: {
    topic: string;
    notifyEmail: string;
    source: "google-news" | "rss" | "campus";
    rssUrl?: string;
    enabled: boolean;
    updatedAt: string;
  };
  seenIds: string[];
  history: Array<{
    id: string;
    title: string;
    link: string;
    summary?: string;
    publishedAt?: string;
    sourceLabel: string;
    notifiedAt: string;
  }>;
  lastCheckedAt: string | null;
  lastError: string | null;
};

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
      facilities: {
        Row: {
          body: string | null
          id: number
          image_url: string | null
          sort: number
          title: string
        }
        Insert: {
          body?: string | null
          id?: never
          image_url?: string | null
          sort?: number
          title: string
        }
        Update: {
          body?: string | null
          id?: never
          image_url?: string | null
          sort?: number
          title?: string
        }
        Relationships: []
      }
      home_sections: {
        Row: {
          id: number
          key: string
          label: string
          sort: number
        }
        Insert: {
          id?: never
          key: string
          label: string
          sort?: number
        }
        Update: {
          id?: never
          key?: string
          label?: string
          sort?: number
        }
        Relationships: []
      }
      why_choose_us: {
        Row: {
          body: string | null
          id: number
          image_url: string | null
          sort: number
          title: string
        }
        Insert: {
          body?: string | null
          id?: never
          image_url?: string | null
          sort?: number
          title: string
        }
        Update: {
          body?: string | null
          id?: never
          image_url?: string | null
          sort?: number
          title?: string
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
      id_card_submissions: {
        Row: {
          batch: string
          blood_group: string | null
          contact: string
          course: string
          created_at: string
          dob: string
          enrollment_no: string
          father_name: string
          id: number
          local_address: string
          mother_name: string
          name: string
          parent_spouse_contact: string | null
          photo_key: string
        }
        Insert: {
          batch: string
          blood_group?: string | null
          contact: string
          course: string
          created_at?: string
          dob: string
          enrollment_no: string
          father_name: string
          id?: never
          local_address: string
          mother_name: string
          name: string
          parent_spouse_contact?: string | null
          photo_key: string
        }
        Update: {
          batch?: string
          blood_group?: string | null
          contact?: string
          course?: string
          created_at?: string
          dob?: string
          enrollment_no?: string
          father_name?: string
          id?: never
          local_address?: string
          mother_name?: string
          name?: string
          parent_spouse_contact?: string | null
          photo_key?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          created_at: string
          email: string
          experience: string | null
          id: number
          job_id: number | null
          job_title: string | null
          message: string | null
          mobile: string
          name: string
          qualification: string | null
          resume_key: string
        }
        Insert: {
          created_at?: string
          email: string
          experience?: string | null
          id?: never
          job_id?: number | null
          job_title?: string | null
          message?: string | null
          mobile: string
          name: string
          qualification?: string | null
          resume_key: string
        }
        Update: {
          created_at?: string
          email?: string
          experience?: string | null
          id?: never
          job_id?: number | null
          job_title?: string | null
          message?: string | null
          mobile?: string
          name?: string
          qualification?: string | null
          resume_key?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          created_at: string
          department: string | null
          description: string | null
          employment_type: string | null
          experience: string | null
          id: number
          last_date: string | null
          location: string | null
          qualification: string | null
          sort: number
          title: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          description?: string | null
          employment_type?: string | null
          experience?: string | null
          id?: never
          last_date?: string | null
          location?: string | null
          qualification?: string | null
          sort?: number
          title: string
        }
        Update: {
          created_at?: string
          department?: string | null
          description?: string | null
          employment_type?: string | null
          experience?: string | null
          id?: never
          last_date?: string | null
          location?: string | null
          qualification?: string | null
          sort?: number
          title?: string
        }
        Relationships: []
      }
      leadership: {
        Row: { id: number; image_url: string | null; message: string | null; name: string | null; role: string | null }
        Insert: { id?: number; image_url?: string | null; message?: string | null; name?: string | null; role?: string | null }
        Update: { id?: number; image_url?: string | null; message?: string | null; name?: string | null; role?: string | null }
        Relationships: []
      }
      news_tracker_state: {
        Row: { id: number; payload: NewsTrackerStatePayload; updated_at: string }
        Insert: { id?: number; payload: NewsTrackerStatePayload; updated_at?: string }
        Update: { id?: number; payload?: NewsTrackerStatePayload; updated_at?: string }
        Relationships: []
      }
      notices: {
        Row: { created_at: string; description: string; id: number; sort: number }
        Insert: { created_at?: string; description: string; id?: never; sort?: number }
        Update: { created_at?: string; description?: string; id?: never; sort?: number }
        Relationships: []
      }
      nav_links: {
        Row: { href: string; id: number; label: string; menu: string | null; sort: number }
        Insert: { href: string; id?: never; label: string; menu?: string | null; sort?: number }
        Update: { href?: string; id?: never; label?: string; menu?: string | null; sort?: number }
        Relationships: []
      }
      payment_links: {
        Row: { description: string | null; id: number; institute: string; sort: number; url: string }
        Insert: { description?: string | null; id?: never; institute: string; sort?: number; url: string }
        Update: { description?: string | null; id?: never; institute?: string; sort?: number; url?: string }
        Relationships: []
      }
      policies: {
        Row: { category: string | null; created_at: string; description: string | null; id: number; pdf_url: string; sort: number; title: string }
        Insert: { category?: string | null; created_at?: string; description?: string | null; id?: never; pdf_url: string; sort?: number; title: string }
        Update: { category?: string | null; created_at?: string; description?: string | null; id?: never; pdf_url?: string; sort?: number; title?: string }
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
          facebook_url: string | null
          helpline: string | null
          hero_subtitle: string | null
          hero_title: string | null
          id: number
          instagram_url: string | null
          linkedin_url: string | null
          maps_query: string | null
          maps_url: string | null
          prospectus_url: string | null
          theme: string | null
          whatsapp: string | null
          youtube_url: string | null
        }
        Insert: {
          address?: string | null
          email1?: string | null
          email2?: string | null
          email3?: string | null
          facebook_url?: string | null
          helpline?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: number
          instagram_url?: string | null
          linkedin_url?: string | null
          maps_query?: string | null
          maps_url?: string | null
          prospectus_url?: string | null
          theme?: string | null
          whatsapp?: string | null
          youtube_url?: string | null
        }
        Update: {
          address?: string | null
          email1?: string | null
          email2?: string | null
          email3?: string | null
          facebook_url?: string | null
          helpline?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: number
          instagram_url?: string | null
          linkedin_url?: string | null
          maps_query?: string | null
          maps_url?: string | null
          prospectus_url?: string | null
          theme?: string | null
          whatsapp?: string | null
          youtube_url?: string | null
        }
        Relationships: []
      }
      section_content: {
        Row: {
          cta_primary: string | null
          cta_secondary: string | null
          description: string | null
          eyebrow: string | null
          heading: string | null
          id: number
          key: string
          sort: number
        }
        Insert: {
          cta_primary?: string | null
          cta_secondary?: string | null
          description?: string | null
          eyebrow?: string | null
          heading?: string | null
          id?: never
          key: string
          sort?: number
        }
        Update: {
          cta_primary?: string | null
          cta_secondary?: string | null
          description?: string | null
          eyebrow?: string | null
          heading?: string | null
          id?: never
          key?: string
          sort?: number
        }
        Relationships: []
      }
      stats: {
        Row: { id: number; label: string; sort: number; value: string }
        Insert: { id?: never; label: string; sort?: number; value: string }
        Update: { id?: never; label?: string; sort?: number; value?: string }
        Relationships: []
      }
      student_documents: {
        Row: {
          course: string
          created_at: string
          doc_10th: string
          doc_12th: string
          doc_aadhaar: string
          doc_caste: string | null
          doc_domicile: string
          doc_gap: string | null
          doc_income: string
          doc_migration: string | null
          doc_mp_taas: string | null
          doc_otr: string | null
          doc_photo: string
          doc_samagra: string
          doc_tc: string
          email: string
          enrollment_no: string | null
          id: number
          mobile: string
          name: string
        }
        Insert: {
          course: string
          created_at?: string
          doc_10th: string
          doc_12th: string
          doc_aadhaar: string
          doc_caste?: string | null
          doc_domicile: string
          doc_gap?: string | null
          doc_income: string
          doc_migration?: string | null
          doc_mp_taas?: string | null
          doc_otr?: string | null
          doc_photo: string
          doc_samagra: string
          doc_tc: string
          email: string
          enrollment_no?: string | null
          id?: never
          mobile: string
          name: string
        }
        Update: {
          course?: string
          created_at?: string
          doc_10th?: string
          doc_12th?: string
          doc_aadhaar?: string
          doc_caste?: string | null
          doc_domicile?: string
          doc_gap?: string | null
          doc_income?: string
          doc_migration?: string | null
          doc_mp_taas?: string | null
          doc_otr?: string | null
          doc_photo?: string
          doc_samagra?: string
          doc_tc?: string
          email?: string
          enrollment_no?: string | null
          id?: never
          mobile?: string
          name?: string
        }
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
