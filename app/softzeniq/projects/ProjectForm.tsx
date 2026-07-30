"use client";

import { addProject, updateProject } from "@/app/actions/projects";
import { Project } from "@/data/Project";
import { useRef, useState } from "react";

interface ProjectFormProps {
  initialData?: Project;
  onClose?: () => void;
  categories: any[];
}

export default function ProjectForm({ initialData, onClose, categories }: ProjectFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      const res = initialData 
        ? await updateProject(initialData.id, formData)
        : await addProject(formData);
        
      if (!res.success) {
        alert("Error saving project: " + res.error);
      } else {
        alert(initialData ? "Project updated successfully!" : "Project added successfully!");
        if (!initialData) formRef.current?.reset();
        if (onClose) onClose();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input name="title" required defaultValue={initialData?.title} className="w-full bg-background border rounded-lg px-3 py-2" placeholder="e.g. Dream Vision" />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Slug (Must be unique)</label>
        <input name="slug" required defaultValue={initialData?.slug} className="w-full bg-background border rounded-lg px-3 py-2" placeholder="e.g. dream-vision-2" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select name="category" required defaultValue={initialData?.category || (categories.length > 0 ? categories[0].name : "Web")} className="w-full bg-background border rounded-lg px-3 py-2">
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
          {categories.length === 0 && <option value="Web">Web</option>}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Client Name</label>
        <input name="client" required defaultValue={initialData?.client} className="w-full bg-background border rounded-lg px-3 py-2" placeholder="e.g. Dream Vision" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Summary</label>
        <input name="summary" required defaultValue={initialData?.summary} className="w-full bg-background border rounded-lg px-3 py-2" placeholder="e.g. medical equipment" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Result</label>
        <input name="result" required defaultValue={initialData?.result} className="w-full bg-background border rounded-lg px-3 py-2" placeholder="e.g. +312% conversion" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tags (Comma separated)</label>
        <input name="tags" required defaultValue={initialData?.tags?.join(", ")} className="w-full bg-background border rounded-lg px-3 py-2" placeholder="e.g. Next.js, Tailwind, Supabase" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">External Link (Optional)</label>
        <input type="url" name="link" defaultValue={initialData?.link || ""} className="w-full bg-background border rounded-lg px-3 py-2" placeholder="e.g. https://example.com" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Preview Image (Upload)</label>
        <input type="file" name="image" accept="image/*" className="w-full bg-background border rounded-lg px-3 py-2 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
        <p className="text-xs text-muted-foreground mt-1">Upload an image from your device.</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">OR Preview Image URL</label>
        <input type="url" name="image_url" defaultValue={initialData?.image_url || ""} className="w-full bg-background border rounded-lg px-3 py-2" placeholder="e.g. https://imgur.com/image.png" />
        <p className="text-xs text-muted-foreground mt-1">Direct link to an image (will be used if no file is uploaded above).</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Gradient (Valid CSS Background)</label>
        <input name="gradient" required defaultValue={initialData?.gradient || "linear-gradient(to bottom right, #3b82f6, #4f46e5)"} className="w-full bg-background border rounded-lg px-3 py-2" />
        <p className="text-xs text-muted-foreground mt-1">Example: linear-gradient(to bottom right, #3b82f6, #4f46e5)</p>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <input type="checkbox" name="show_on_home" id="show_on_home" defaultChecked={initialData ? initialData.show_on_home : false} className="h-4 w-4 rounded border-gray-300" />
        <label htmlFor="show_on_home" className="text-sm font-medium">Show on Home Page</label>
      </div>

      <div className="pt-4 flex gap-3">
        {onClose && (
          <button type="button" onClick={onClose} className="cursor-pointer flex-1 bg-muted text-muted-foreground py-2 rounded-lg font-medium hover:bg-muted/80">
            Cancel
          </button>
        )}
        <button type="submit" disabled={loading} className="cursor-pointer flex-1 bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:opacity-90 disabled:opacity-50">
          {loading ? "Saving..." : (initialData ? "Update Project" : "Add Project")}
        </button>
      </div>
    </form>
  );
}
