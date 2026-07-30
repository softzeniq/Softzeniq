"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function addCategory(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;

    const { error } = await supabase.from("categories").insert({
      name,
      slug,
    });

    if (error) {
      console.error("Error adding category:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/portfolio");
    revalidatePath("/softzeniq/categories");
    revalidatePath("/softzeniq/projects");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to add category" };
  }
}

export async function deleteCategory(id: string) {
  try {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    
    if (error) {
      console.error("Error deleting category:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/portfolio");
    revalidatePath("/softzeniq/categories");
    revalidatePath("/softzeniq/projects");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete category" };
  }
}

export async function updateCategory(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;

    const { error } = await supabase.from("categories").update({
      name,
      slug,
    }).eq("id", id);

    if (error) {
      console.error("Error updating category:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/portfolio");
    revalidatePath("/softzeniq/categories");
    revalidatePath("/softzeniq/projects");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update category" };
  }
}
