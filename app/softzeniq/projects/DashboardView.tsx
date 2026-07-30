"use client";

import { Project } from "@/data/Project";
import { useState } from "react";
import ProjectForm from "./ProjectForm";
import { AnimatePresence, motion } from "framer-motion";
import { deleteProject } from "@/app/actions/projects";

export default function DashboardView({ projects, categories }: { projects: Project[] | null, categories: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setEditingProject(null), 300);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">Projects Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your portfolio projects and external links.</p>
        </div>
        <button
          onClick={handleAddNew}
          className="cursor-pointer bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-medium hover:shadow-glow transition-all active:scale-95"
        >
          + Add New Project
        </button>
      </div>

      <div className="glass rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="p-5 font-semibold text-muted-foreground">Project Details</th>
                <th className="p-5 font-semibold text-muted-foreground">Category</th>
                <th className="p-5 font-semibold text-muted-foreground">Visibility</th>
                <th className="p-5 font-semibold text-right text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {projects?.map((project) => (
                <tr key={project.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="p-5">
                    <div className="font-semibold text-base mb-1">{project.title}</div>
                    {project.link && (
                      <div className="text-xs text-muted-foreground">
                        <a href={project.link} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                          {project.link.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    )}
                  </td>
                  <td className="p-5">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                      {project.category}
                    </span>
                  </td>
                  <td className="p-5">
                    {project.show_on_home ? (
                      <span className="inline-flex items-center gap-1.5 text-green-500 font-medium text-xs bg-green-500/10 px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Home Page
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-muted-foreground text-xs bg-muted px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></span> Portfolio Only
                      </span>
                    )}
                  </td>
                  <td className="p-5">
                    <div className="flex items-center justify-end gap-3 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(project)}
                        className="cursor-pointer text-sm font-medium text-blue-500 hover:text-blue-600 hover:underline px-2 py-1"
                      >
                        Edit
                      </button>
                      <form action={async () => {
                        await deleteProject(project.id);
                      }}>
                        <button type="submit" className="cursor-pointer text-sm font-medium text-destructive hover:text-red-600 hover:underline px-2 py-1">
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {(!projects || projects.length === 0) && (
                <tr>
                  <td colSpan={4} className="p-12 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" x2="12" y1="3" y2="15"></line></svg>
                    </div>
                    <h3 className="text-lg font-medium text-foreground">No projects found</h3>
                    <p className="text-muted-foreground mt-1">Get started by adding your first portfolio project.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg glass rounded-2xl shadow-2xl border bg-card/50 overflow-hidden"
            >
              <div className="p-6 border-b bg-muted/20 flex justify-between items-center">
                <h2 className="text-xl font-semibold font-display">
                  {editingProject ? "Edit Project" : "Add New Project"}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors p-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
              <div className="p-6">
                <ProjectForm initialData={editingProject || undefined} onClose={handleCloseModal} categories={categories} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
