"use client";

import { addService, updateService } from "@/app/actions/services";
import { useRef, useState } from "react";
import { Service } from "./ServicesDashboard";

interface ServiceFormProps {
  initialData?: Service;
  onClose?: () => void;
}

export default function ServiceForm({ initialData, onClose }: ServiceFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [benefits, setBenefits] = useState<string>(
    initialData?.benefits ? JSON.stringify(initialData.benefits, null, 2) : "[\n  \"Benefit 1\",\n  \"Benefit 2\"\n]"
  );

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    formData.set("benefits", benefits);
    
    try {
      const res = initialData 
        ? await updateService(initialData.id, formData)
        : await addService(formData);
        
      if (!res.success) {
        alert("Error saving service: " + res.error);
      } else {
        alert(initialData ? "Service updated successfully!" : "Service added successfully!");
        if (!initialData) {
          formRef.current?.reset();
          setBenefits("[\n  \"Benefit 1\",\n  \"Benefit 2\"\n]");
        }
        if (onClose) onClose();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input name="title" required defaultValue={initialData?.title} className="w-full bg-background border rounded-lg px-3 py-2" placeholder="e.g. Web Development" />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Slug (Must be unique)</label>
        <input name="slug" required defaultValue={initialData?.slug} className="w-full bg-background border rounded-lg px-3 py-2" placeholder="e.g. web-development" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Icon Name (lucide-react)</label>
        <input name="icon_name" required defaultValue={initialData?.icon_name || "Code2"} className="w-full bg-background border rounded-lg px-3 py-2" placeholder="e.g. Code2, Search, Smartphone" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Short Description</label>
        <input name="short_description" required defaultValue={initialData?.short_description} className="w-full bg-background border rounded-lg px-3 py-2" placeholder="Short description for home page..." />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea name="description" required defaultValue={initialData?.description} rows={3} className="w-full bg-background border rounded-lg px-3 py-2" placeholder="Full description for service card..." />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Benefits (JSON array of strings)</label>
        <textarea 
          value={benefits} 
          onChange={(e) => setBenefits(e.target.value)} 
          rows={4} 
          className="w-full font-mono text-sm bg-background border rounded-lg px-3 py-2" 
          placeholder="[&quot;Benefit 1&quot;]" 
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select name="status" defaultValue={initialData?.status || "published"} className="w-full bg-background border rounded-lg px-3 py-2">
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Display Order</label>
          <input type="number" name="display_order" defaultValue={initialData?.display_order || 0} className="w-full bg-background border rounded-lg px-3 py-2" />
        </div>
      </div>

      <div className="pt-4 flex gap-3 sticky bottom-0 bg-card/95 backdrop-blur-sm pb-2 z-10">
        {onClose && (
          <button type="button" onClick={onClose} className="cursor-pointer flex-1 bg-muted text-muted-foreground py-2 rounded-lg font-medium hover:bg-muted/80">
            Cancel
          </button>
        )}
        <button type="submit" disabled={loading} className="cursor-pointer flex-1 bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:opacity-90 disabled:opacity-50">
          {loading ? "Saving..." : (initialData ? "Update Service" : "Add Service")}
        </button>
      </div>
    </form>
  );
}
