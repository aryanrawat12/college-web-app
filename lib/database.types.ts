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
  public: {
    Tables: {
      enquiries: {
        Row: {
          id: number;
          name: string | null;
          email: string | null;
          mobile: string | null;
          state: string | null;
          city: string | null;
          department: string | null;
          programme: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          name?: string | null;
          email?: string | null;
          mobile?: string | null;
          state?: string | null;
          city?: string | null;
          department?: string | null;
          programme?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string | null;
          email?: string | null;
          mobile?: string | null;
          state?: string | null;
          city?: string | null;
          department?: string | null;
          programme?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      grievances: {
        Row: {
          id: number;
          name: string | null;
          enrollment_no: string | null;
          programme: string | null;
          year: string | null;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          name?: string | null;
          enrollment_no?: string | null;
          programme?: string | null;
          year?: string | null;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string | null;
          enrollment_no?: string | null;
          programme?: string | null;
          year?: string | null;
          description?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      faculties: {
        Row: {
          id: number;
          photo_url: string | null;
          name: string | null;
          designation: string | null;
          bio: string | null;
        };
        Insert: {
          id?: number;
          photo_url?: string | null;
          name?: string | null;
          designation?: string | null;
          bio?: string | null;
        };
        Update: {
          id?: number;
          photo_url?: string | null;
          name?: string | null;
          designation?: string | null;
          bio?: string | null;
        };
        Relationships: [];
      };
      announcements: {
        Row: {
          id: number;
          description: string | null;
          created_at: string;
          updated_at: string;
          date: string | null;
        };
        Insert: {
          id?: number;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
          date?: string | null;
        };
        Update: {
          id?: number;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
          date?: string | null;
        };
        Relationships: [];
      };
      notices: {
        Row: {
          id: number;
          description: string | null;
          created_at: string;
          date: string | null;
        };
        Insert: {
          id?: number;
          description?: string | null;
          created_at?: string;
          date?: string | null;
        };
        Update: {
          id?: number;
          description?: string | null;
          created_at?: string;
          date?: string | null;
        };
        Relationships: [];
      };
      events: {
        Row: {
          id: number;
          event_name: string | null;
          event_description: string | null;
          image_1_url: string | null;
          image_2_url: string | null;
          image_3_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          event_name?: string | null;
          event_description?: string | null;
          image_1_url?: string | null;
          image_2_url?: string | null;
          image_3_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          event_name?: string | null;
          event_description?: string | null;
          image_1_url?: string | null;
          image_2_url?: string | null;
          image_3_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      news_tracker_state: {
        Row: {
          id: number;
          payload: NewsTrackerStatePayload;
          updated_at: string;
        };
        Insert: {
          id?: number;
          payload: NewsTrackerStatePayload;
          updated_at?: string;
        };
        Update: {
          id?: number;
          payload?: NewsTrackerStatePayload;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
