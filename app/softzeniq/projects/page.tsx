import { supabase } from "@/lib/supabase";
import DashboardView from "./DashboardView";

export default async function ProjectsDashboard() {
  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: categories, error: categoriesError } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  return (
    <div className="min-h-screen bg-background/50">
      <DashboardView projects={projects} categories={categories || []} />
    </div>
  );
}
