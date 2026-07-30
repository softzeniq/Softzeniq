"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { UploadCloud, Trash2, Copy } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function AdminMedia() {
  const supabase = createClient();
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = async () => {
    setLoading(true);
    const { data, error } = await supabase.storage.from('media').list();
    if (!error && data) {
      // Get public URLs
      const filesWithUrls = data.filter(f => f.name !== '.emptyFolderPlaceholder').map((file) => ({
        ...file,
        url: supabase.storage.from('media').getPublicUrl(file.name).data.publicUrl
      }));
      setFiles(filesWithUrls);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;
    
    await supabase.storage.from('media').upload(filePath, file);
    fetchFiles();
  };

  const handleDelete = async (name: string) => {
    await supabase.storage.from('media').remove([name]);
    fetchFiles();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Media Library</h1>
        <div>
          <Label htmlFor="upload-media" className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md inline-flex items-center gap-2">
            <UploadCloud className="h-4 w-4" />
            Upload File
          </Label>
          <input
            id="upload-media"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleUpload}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-zinc-500">Loading media...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {files.map((file) => (
            <div key={file.id} className="relative group rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900/50 aspect-square">
              {/* Using native img for simplicity here since sizes are dynamic */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="sm" variant="secondary" onClick={() => navigator.clipboard.writeText(file.url)}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(file.name)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {files.length === 0 && (
            <div className="col-span-full text-center py-12 text-zinc-500">
              No media files found. Upload some images to get started.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Just duplicating Label here to avoid import issues inside client component if not set correctly
function Label({ children, htmlFor, className }: any) {
  return <label htmlFor={htmlFor} className={className}>{children}</label>;
}
