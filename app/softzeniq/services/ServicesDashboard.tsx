"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { deleteService } from "@/app/actions/services";
import ServiceForm from "./ServiceForm";
import { DynamicIcon } from "@/components/shared/DynamicIcon";

export type Service = {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  description: string;
  icon_name: string;
  benefits: string[];
  status: string;
  display_order: number;
};

export default function ServicesDashboard({ services }: { services: Service[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setEditingService(null), 300);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">Services Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage services for the home and services pages.</p>
        </div>
        <button
          onClick={handleAddNew}
          className="cursor-pointer bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-medium hover:shadow-glow transition-all active:scale-95"
        >
          + Add New Service
        </button>
      </div>

      <div className="glass rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="p-5 font-semibold text-muted-foreground">Icon</th>
                <th className="p-5 font-semibold text-muted-foreground">Title</th>
                <th className="p-5 font-semibold text-muted-foreground hidden md:table-cell">Slug</th>
                <th className="p-5 font-semibold text-muted-foreground hidden lg:table-cell">Status</th>
                <th className="p-5 font-semibold text-muted-foreground hidden sm:table-cell">Order</th>
                <th className="p-5 font-semibold text-right text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="p-5">
                    <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                       <DynamicIcon name={service.icon_name} className="h-5 w-5" />
                    </div>
                  </td>
                  <td className="p-5 font-semibold text-base">{service.title}</td>
                  <td className="p-5 text-muted-foreground hidden md:table-cell">{service.slug}</td>
                  <td className="p-5 hidden lg:table-cell">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${service.status === 'published' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                      {service.status}
                    </span>
                  </td>
                  <td className="p-5 text-muted-foreground hidden sm:table-cell">{service.display_order}</td>
                  <td className="p-5">
                    <div className="flex items-center justify-end gap-3 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(service)}
                        className="cursor-pointer text-sm font-medium text-blue-500 hover:text-blue-600 hover:underline px-2 py-1"
                      >
                        Edit
                      </button>
                      <form action={async () => {
                        if(confirm('Are you sure you want to delete this service?')) {
                          await deleteService(service.id);
                        }
                      }}>
                        <button type="submit" className="cursor-pointer text-sm font-medium text-destructive hover:text-red-600 hover:underline px-2 py-1">
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {(!services || services.length === 0) && (
                <tr>
                  <td colSpan={6} className="p-12 text-center">
                    <h3 className="text-lg font-medium text-foreground">No services found</h3>
                    <p className="text-muted-foreground mt-1">Get started by adding your first service.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

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
              className="relative w-full max-w-xl glass rounded-2xl shadow-2xl border bg-card/50 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b bg-muted/20 flex justify-between items-center shrink-0">
                <h2 className="text-xl font-semibold font-display">
                  {editingService ? "Edit Service" : "Add New Service"}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors p-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
              <div className="p-6 overflow-y-auto">
                <ServiceForm initialData={editingService || undefined} onClose={handleCloseModal} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
