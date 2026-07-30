"use client";

import { addCategory, updateCategory } from "@/app/actions/categories";
import { useRef, useState } from "react";
import { Category } from "./CategoriesDashboard";

interface CategoryFormProps {
  initialData?: Category;
  onClose?: () => void;
}

export default function CategoryForm({ initialData, onClose }: CategoryFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      const res = initialData 
        ? await updateCategory(initialData.id, formData)
        : await addCategory(formData);
        
      if (!res.success) {
        alert("Error saving category: " + res.error);
      } else {
        alert(initialData ? "Category updated successfully!" : "Category added successfully!");
        if (!initialData) formRef.current?.reset();
        if (onClose) onClose();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Category Name</label>
        <input name="name" required defaultValue={initialData?.name} className="w-full bg-background border rounded-lg px-3 py-2" placeholder="e.g. Web Development" />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Slug (Must be unique)</label>
        <input name="slug" required defaultValue={initialData?.slug} className="w-full bg-background border rounded-lg px-3 py-2" placeholder="e.g. web-development" />
      </div>

      <div className="pt-4 flex gap-3">
        {onClose && (
          <button type="button" onClick={onClose} className="cursor-pointer flex-1 bg-muted text-muted-foreground py-2 rounded-lg font-medium hover:bg-muted/80">
            Cancel
          </button>
        )}
        <button type="submit" disabled={loading} className="cursor-pointer flex-1 bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:opacity-90 disabled:opacity-50">
          {loading ? "Saving..." : (initialData ? "Update Category" : "Add Category")}
        </button>
      </div>
    </form>
  );
}
