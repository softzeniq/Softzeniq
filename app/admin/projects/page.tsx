import { createClient } from "@/utils/supabase/server";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit2, Plus, Trash2 } from "lucide-react";

export default async function AdminProjects() {
  const supabase = await createClient();
  const { data: projects } = await supabase.from("projects").select("*").order("display_order", { ascending: true });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Projects</h1>
        <Link href="/admin/projects/new">
          <Button><Plus className="mr-2 h-4 w-4" /> Add Project</Button>
        </Link>
      </div>
      
      <div className="rounded-md border border-zinc-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects?.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium text-white">{project.title}</TableCell>
                <TableCell>{project.category}</TableCell>
                <TableCell>{project.client}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${project.status === 'published' ? 'bg-green-900/50 text-green-400' : 'bg-yellow-900/50 text-yellow-400'}`}>
                    {project.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/projects/${project.id}`}>
                      <Button variant="outline" size="sm" className="bg-transparent border-zinc-700 text-zinc-300 hover:text-white"><Edit2 className="h-4 w-4" /></Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {(!projects || projects.length === 0) && (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-zinc-500">
                  No projects found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
