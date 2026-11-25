import Contact from "@/components/contact/Contact";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Start Your Project | Contact Us",
  description: "Get in touch with SoftZeniq today. Share your project requirements and let's collaborate to build, scale, and transform your digital vision.",
  keywords: ["contact SoftZeniq", "hire software developers", "software development agency contact", "start project", "custom software estimate"],
  openGraph: {
    title: "Start Your Project | Contact SoftZeniq",
    description: "Get in touch with SoftZeniq today. Share your project requirements and let's collaborate to build, scale, and transform your digital vision.",
  }
};

export default function page() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <Contact />
    </Suspense>
  );
}

