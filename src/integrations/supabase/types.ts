export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      blog_categories: {
        Row: {
          created_at: string
          id: string
          name_en: string
          name_hi: string | null
          name_sa: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name_en: string
          name_hi?: string | null
          name_sa?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name_en?: string
          name_hi?: string | null
          name_sa?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: string
          category: string
          content_en: string | null
          content_hi: string | null
          content_sa: string | null
          created_at: string
          date: string
          excerpt_en: string | null
          excerpt_hi: string | null
          excerpt_sa: string | null
          id: string
          show_on_home: boolean
          slug: string
          thumbnail: string | null
          title_en: string
          title_hi: string | null
          title_sa: string | null
          updated_at: string
        }
        Insert: {
          author?: string
          category: string
          content_en?: string | null
          content_hi?: string | null
          content_sa?: string | null
          created_at?: string
          date?: string
          excerpt_en?: string | null
          excerpt_hi?: string | null
          excerpt_sa?: string | null
          id?: string
          show_on_home?: boolean
          slug: string
          thumbnail?: string | null
          title_en: string
          title_hi?: string | null
          title_sa?: string | null
          updated_at?: string
        }
        Update: {
          author?: string
          category?: string
          content_en?: string | null
          content_hi?: string | null
          content_sa?: string | null
          created_at?: string
          date?: string
          excerpt_en?: string | null
          excerpt_hi?: string | null
          excerpt_sa?: string | null
          id?: string
          show_on_home?: boolean
          slug?: string
          thumbnail?: string | null
          title_en?: string
          title_hi?: string | null
          title_sa?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      camps: {
        Row: {
          age_category: string
          age_max: number | null
          age_min: number | null
          created_at: string
          description_en: string | null
          description_hi: string | null
          description_sa: string | null
          end_date: string
          id: string
          is_active: boolean
          location: string | null
          price: string | null
          registration_link: string | null
          start_date: string
          thumbnail: string | null
          title_en: string
          title_hi: string | null
          title_sa: string | null
          updated_at: string
        }
        Insert: {
          age_category: string
          age_max?: number | null
          age_min?: number | null
          created_at?: string
          description_en?: string | null
          description_hi?: string | null
          description_sa?: string | null
          end_date: string
          id?: string
          is_active?: boolean
          location?: string | null
          price?: string | null
          registration_link?: string | null
          start_date: string
          thumbnail?: string | null
          title_en: string
          title_hi?: string | null
          title_sa?: string | null
          updated_at?: string
        }
        Update: {
          age_category?: string
          age_max?: number | null
          age_min?: number | null
          created_at?: string
          description_en?: string | null
          description_hi?: string | null
          description_sa?: string | null
          end_date?: string
          id?: string
          is_active?: boolean
          location?: string | null
          price?: string | null
          registration_link?: string | null
          start_date?: string
          thumbnail?: string | null
          title_en?: string
          title_hi?: string | null
          title_sa?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          is_read: boolean
          message: string
          name: string
          phone: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_read?: boolean
          message: string
          name: string
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean
          message?: string
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      course_categories: {
        Row: {
          created_at: string
          id: string
          name_en: string
          name_hi: string | null
          name_sa: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name_en: string
          name_hi?: string | null
          name_sa?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name_en?: string
          name_hi?: string | null
          name_sa?: string | null
        }
        Relationships: []
      }
      course_enrollments: {
        Row: {
          age: number | null
          age_group: string | null
          course_id: string
          created_at: string
          email: string
          id: string
          message: string | null
          phone: string | null
          referral_link_id: string | null
          status: string
          student_name: string
          updated_at: string
        }
        Insert: {
          age?: number | null
          age_group?: string | null
          course_id: string
          created_at?: string
          email: string
          id?: string
          message?: string | null
          phone?: string | null
          referral_link_id?: string | null
          status?: string
          student_name: string
          updated_at?: string
        }
        Update: {
          age?: number | null
          age_group?: string | null
          course_id?: string
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          phone?: string | null
          referral_link_id?: string | null
          status?: string
          student_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_enrollments_referral_link_id_fkey"
            columns: ["referral_link_id"]
            isOneToOne: false
            referencedRelation: "referral_links"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          age_max: number | null
          age_min: number | null
          category: string
          created_at: string
          duration: string | null
          full_description_en: string | null
          full_description_hi: string | null
          full_description_sa: string | null
          id: string
          is_popular: boolean
          level: string
          price: string | null
          short_description_en: string | null
          short_description_hi: string | null
          short_description_sa: string | null
          show_on_home: boolean
          slug: string
          thumbnail: string | null
          title_en: string
          title_hi: string | null
          title_sa: string | null
          updated_at: string
        }
        Insert: {
          age_max?: number | null
          age_min?: number | null
          category: string
          created_at?: string
          duration?: string | null
          full_description_en?: string | null
          full_description_hi?: string | null
          full_description_sa?: string | null
          id?: string
          is_popular?: boolean
          level?: string
          price?: string | null
          short_description_en?: string | null
          short_description_hi?: string | null
          short_description_sa?: string | null
          show_on_home?: boolean
          slug: string
          thumbnail?: string | null
          title_en: string
          title_hi?: string | null
          title_sa?: string | null
          updated_at?: string
        }
        Update: {
          age_max?: number | null
          age_min?: number | null
          category?: string
          created_at?: string
          duration?: string | null
          full_description_en?: string | null
          full_description_hi?: string | null
          full_description_sa?: string | null
          id?: string
          is_popular?: boolean
          level?: string
          price?: string | null
          short_description_en?: string | null
          short_description_hi?: string | null
          short_description_sa?: string | null
          show_on_home?: boolean
          slug?: string
          thumbnail?: string | null
          title_en?: string
          title_hi?: string | null
          title_sa?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      notification_popup: {
        Row: {
          button_text_en: string | null
          button_text_hi: string | null
          button_text_sa: string | null
          created_at: string
          end_date: string | null
          id: string
          image_url: string | null
          is_enabled: boolean
          link_url: string | null
          message_en: string | null
          message_hi: string | null
          message_sa: string | null
          show_on_all_pages: boolean
          start_date: string | null
          title_en: string | null
          title_hi: string | null
          title_sa: string | null
          updated_at: string
        }
        Insert: {
          button_text_en?: string | null
          button_text_hi?: string | null
          button_text_sa?: string | null
          created_at?: string
          end_date?: string | null
          id?: string
          image_url?: string | null
          is_enabled?: boolean
          link_url?: string | null
          message_en?: string | null
          message_hi?: string | null
          message_sa?: string | null
          show_on_all_pages?: boolean
          start_date?: string | null
          title_en?: string | null
          title_hi?: string | null
          title_sa?: string | null
          updated_at?: string
        }
        Update: {
          button_text_en?: string | null
          button_text_hi?: string | null
          button_text_sa?: string | null
          created_at?: string
          end_date?: string | null
          id?: string
          image_url?: string | null
          is_enabled?: boolean
          link_url?: string | null
          message_en?: string | null
          message_hi?: string | null
          message_sa?: string | null
          show_on_all_pages?: boolean
          start_date?: string | null
          title_en?: string | null
          title_hi?: string | null
          title_sa?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      referral_links: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      referral_visits: {
        Row: {
          id: string
          ip_hash: string | null
          page_visited: string | null
          referral_link_id: string
          user_agent: string | null
          visited_at: string
        }
        Insert: {
          id?: string
          ip_hash?: string | null
          page_visited?: string | null
          referral_link_id: string
          user_agent?: string | null
          visited_at?: string
        }
        Update: {
          id?: string
          ip_hash?: string | null
          page_visited?: string | null
          referral_link_id?: string
          user_agent?: string | null
          visited_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "referral_visits_referral_link_id_fkey"
            columns: ["referral_link_id"]
            isOneToOne: false
            referencedRelation: "referral_links"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
