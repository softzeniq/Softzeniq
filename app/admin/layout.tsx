import { ReactNode } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Briefcase, 
  FolderGit2, 
  Settings, 
  Image as ImageIcon,
  LogOut 
} from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Services", href: "/admin/services", icon: Briefcase },
    { name: "Projects", href: "/admin/projects", icon: FolderGit2 },
    { name: "Media", href: "/admin/media", icon: ImageIcon },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-950/50 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800 font-semibold text-lg">
          SoftZeniq Admin
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white"
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-zinc-800">
          <form action="/auth/signout" method="post">
            <button className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white">
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-zinc-800 flex items-center px-8 bg-zinc-950/50">
          <div className="ml-auto flex items-center gap-4 text-sm text-zinc-400">
            {user.email}
          </div>
        </header>
        <div className="flex-1 p-8 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
