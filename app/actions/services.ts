"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function addService(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const icon_name = formData.get("icon_name") as string;
    const short_description = formData.get("short_description") as string;
    const description = formData.get("description") as string;
    const benefitsStr = formData.get("benefits") as string;
    const status = formData.get("status") as string || "published";
    const display_order = parseInt(formData.get("display_order") as string) || 0;

    let benefits: string[] = [];
    try {
      if (benefitsStr) {
        benefits = JSON.parse(benefitsStr);
      }
    } catch (e) {
      console.error("Failed to parse benefits JSON:", e);
      // Fallback if it's just a comma separated string or simple string
      benefits = benefitsStr.split(',').map(s => s.trim()).filter(Boolean);
    }

    const { error } = await supabase.from("services").insert({
      title,
      slug,
      icon_name,
      short_description,
      description,
      benefits,
      status,
      display_order,
    });

    if (error) {
      console.error("Error adding service:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/softzeniq/services");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to add service" };
  }
}

export async function updateService(id: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const icon_name = formData.get("icon_name") as string;
    const short_description = formData.get("short_description") as string;
    const description = formData.get("description") as string;
    const benefitsStr = formData.get("benefits") as string;
    const status = formData.get("status") as string || "published";
    const display_order = parseInt(formData.get("display_order") as string) || 0;

    let benefits: string[] = [];
    try {
      if (benefitsStr) {
        benefits = JSON.parse(benefitsStr);
      }
    } catch (e) {
      console.error("Failed to parse benefits JSON:", e);
      benefits = benefitsStr.split(',').map(s => s.trim()).filter(Boolean);
    }

    const { error } = await supabase.from("services").update({
      title,
      slug,
      icon_name,
      short_description,
      description,
      benefits,
      status,
      display_order,
    }).eq("id", id);

    if (error) {
      console.error("Error updating service:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/softzeniq/services");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update service" };
  }
}

export async function deleteService(id: string) {
  try {
    const { error } = await supabase.from("services").delete().eq("id", id);
    
    if (error) {
      console.error("Error deleting service:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/softzeniq/services");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete service" };
  }
}
