import { createClient } from "@/utils/supabase/server";
import ServicesDashboard from "./ServicesDashboard";

export default async function ServicesPage() {
  const supabase = await createClient();
  
  // Fetch services ordered by display_order
  const { data: services, error } = await supabase
    .from("services")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching services:", error);
  }

  return <ServicesDashboard services={services || []} />;
}
