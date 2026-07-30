import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, Users, Settings, FolderKanban, BarChart3, LogOut } from "lucide-react";

import { MobileSidebar } from "@/components/dashboard/MobileSidebar";

export const metadata: Metadata = {
  title: "Dashboard | SoftZeniq",
  description: "Admin Dashboard for SoftZeniq",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-slate-50 font-sans">
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50 flex flex-col justify-between hidden md:flex">
        <div className="px-6 py-8">
          <Link href="/softzeniq" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <span className="font-bold text-white text-lg leading-none">S</span>
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
              SoftZeniq
            </span>
          </Link>

          <nav className="mt-10 flex flex-col gap-2">
            <Link href="/softzeniq" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-medium transition-colors">
              <LayoutDashboard className="h-5 w-5" />
              Overview
            </Link>
            <Link href="/softzeniq/projects" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
              <FolderKanban className="h-5 w-5" />
              Projects
            </Link>
            <Link href="/softzeniq/categories" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
              <FolderKanban className="h-5 w-5" />
              Categories
            </Link>

            <Link href="/softzeniq/testimonials" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
              <Users className="h-5 w-5" />
              Testimonials
            </Link>
            <Link href="/softzeniq/pricing" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
              <BarChart3 className="h-5 w-5" />
              Pricing
            </Link>
            <Link href="/softzeniq/stats" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
              <BarChart3 className="h-5 w-5" />
              Stats (Hero)
            </Link>
          </nav>
        </div>

        <div className="p-6">
          <Link href="/softzeniq/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
            <Settings className="h-5 w-5" />
            Settings
          </Link>
          <button className="cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors mt-2">
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative overflow-y-auto">
        <header className="h-16 flex items-center justify-between px-6 md:px-8 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3 md:hidden">
            <MobileSidebar />
            <span className="font-bold text-lg">SoftZeniq</span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-medium text-sm">
              SZ
            </div>
          </div>
        </header>

        <div className="flex-1 p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
