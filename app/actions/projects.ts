"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// Helper function to handle image upload
async function handleImageUpload(formData: FormData, fallbackUrl: string): Promise<string> {
  let finalImageUrl = fallbackUrl;
  const imageFile = formData.get("image") as File | null;
  
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop() || 'png';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from("softzeniq")
      .upload(fileName, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Error uploading image:", error);
      throw new Error(`Storage Error: Please ensure you have created a public storage bucket named 'softzeniq'. Details: ${error.message}`);
    }
    
    const { data: { publicUrl } } = supabase.storage
      .from("softzeniq")
      .getPublicUrl(fileName);
      
    finalImageUrl = publicUrl;
  }
  
  return finalImageUrl;
}

export async function addProject(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const category = formData.get("category") as string;
    const client = formData.get("client") as string;
    const summary = formData.get("summary") as string;
    const result = formData.get("result") as string;
    const tagsString = formData.get("tags") as string;
    const gradient = formData.get("gradient") as string;
    const link = formData.get("link") as string;
    const image_url_input = formData.get("image_url") as string;
    const show_on_home = formData.get("show_on_home") === "on";

    const tags = tagsString.split(",").map((t) => t.trim()).filter(Boolean);

    // Handle image upload if provided
    const image_url = await handleImageUpload(formData, image_url_input);

    const { error } = await supabase.from("projects").insert({
      title,
      slug,
      category,
      client,
      summary,
      result,
      tags,
      gradient,
      link,
      image_url,
      show_on_home,
    });

    if (error) {
      console.error("Error adding project:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/portfolio");
    revalidatePath("/softzeniq/projects");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to add project" };
  }
}

export async function deleteProject(id: string) {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  
  if (error) {
    console.error("Error deleting project:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath("/softzeniq/projects");
  return { success: true };
}

export async function updateProject(id: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const category = formData.get("category") as string;
    const client = formData.get("client") as string;
    const summary = formData.get("summary") as string;
    const result = formData.get("result") as string;
    const tagsString = formData.get("tags") as string;
    const gradient = formData.get("gradient") as string;
    const link = formData.get("link") as string;
    const image_url_input = formData.get("image_url") as string;
    const show_on_home = formData.get("show_on_home") === "on";

    const tags = tagsString.split(",").map((t) => t.trim()).filter(Boolean);

    // Handle image upload if provided
    const image_url = await handleImageUpload(formData, image_url_input);

    const { error } = await supabase.from("projects").update({
      title,
      slug,
      category,
      client,
      summary,
      result,
      tags,
      gradient,
      link,
      image_url,
      show_on_home,
    }).eq("id", id);

    if (error) {
      console.error("Error updating project:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/portfolio");
    revalidatePath("/softzeniq/projects");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update project" };
  }
}
