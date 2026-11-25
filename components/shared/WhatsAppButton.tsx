"use client";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export function WhatsAppButton() {
  const pathname = usePathname();

  if (pathname.startsWith("/softzeniq")) return null;

  return (
    <motion.a
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      href="https://wa.me/8801791091160"
      target="_blank"
      rel="noopener"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-primary grid place-items-center shadow-md hover:bg-primary/90 active:scale-[0.96] transition-[background-color,transform] duration-150"
    >
      <MessageCircle className="h-6 w-6 text-primary-foreground" />
    </motion.a>
  );
}
