import { supabase } from "@/lib/supabase";
import CategoriesDashboard from "./CategoriesDashboard";

export default async function CategoriesPage() {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  return (
    <div className="min-h-screen bg-background/50">
      <CategoriesDashboard categories={categories || []} />
    </div>
  );
}
