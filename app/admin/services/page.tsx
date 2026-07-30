import { createClient } from "@/utils/supabase/server";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit2, Plus, Trash2 } from "lucide-react";

export default async function AdminServices() {
  const supabase = await createClient();
  const { data: services } = await supabase.from("services").select("*").order("display_order", { ascending: true });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Services</h1>
        <Link href="/admin/services/new">
          <Button><Plus className="mr-2 h-4 w-4" /> Add Service</Button>
        </Link>
      </div>
      
      <div className="rounded-md border border-zinc-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services?.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium text-white">{service.title}</TableCell>
                <TableCell>{service.slug}</TableCell>
                <TableCell>{service.icon_name}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${service.status === 'published' ? 'bg-green-900/50 text-green-400' : 'bg-yellow-900/50 text-yellow-400'}`}>
                    {service.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/services/${service.id}`}>
                      <Button variant="outline" size="sm" className="bg-transparent border-zinc-700 text-zinc-300 hover:text-white"><Edit2 className="h-4 w-4" /></Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {(!services || services.length === 0) && (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-zinc-500">
                  No services found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
