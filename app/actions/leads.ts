"use server";

import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(150),
  projectType: z.string().trim().min(1, "Please select a project type.").max(100),
  budget: z.string().trim().max(50).optional().default(""),
  message: z
    .string()
    .trim()
    .min(10, "Please share at least a brief 10-character overview.")
    .max(1500),
});

const newsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address.").max(150),
});

export type InquiryResult = {
  success: boolean;
  error?: string;
  needsMigration?: boolean;
};

function isMissingTableError(code?: string, message?: string) {
  return (
    code === "42P01" ||
    code === "PGRST205" ||
    (message ? message.toLowerCase().includes("schema cache") : false)
  );
}

export async function submitInquiry(input: {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}): Promise<InquiryResult> {
  const parsed = inquirySchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Invalid form input.",
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("inquiries").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      project_type: parsed.data.projectType,
      budget: parsed.data.budget || null,
      message: parsed.data.message,
      status: "new",
    });

    if (error) {
      if (isMissingTableError(error.code, error.message)) {
        return {
          success: false,
          needsMigration: true,
          error:
            "Online form storage is not enabled yet. Please send your brief directly via WhatsApp or Email below.",
        };
      }
      return {
        success: false,
        error: "Unable to send your message right now. Please try WhatsApp or Email.",
      };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Network error while sending your message. Please try WhatsApp or Email.",
    };
  }
}

export async function subscribeNewsletter(email: string): Promise<InquiryResult> {
  const parsed = newsletterSchema.safeParse({ email });
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Please enter a valid email.",
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: parsed.data.email });

    if (error) {
      // Unique violation means already subscribed
      if (error.code === "23505") {
        return { success: true };
      }
      if (isMissingTableError(error.code, error.message)) {
        return {
          success: false,
          needsMigration: true,
          error: "Newsletter signup is temporarily unavailable.",
        };
      }
      return {
        success: false,
        error: "Could not subscribe right now. Please try again later.",
      };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Network error while subscribing.",
    };
  }
}
