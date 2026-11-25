"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "../shared/SectionHeading";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqsData = [
    {
      question: "What types of software does SoftZeniq build?",
      answer:
        "We build custom web applications, multi-tenant SaaS platforms, iOS and Android mobile apps, internal business portals (ERP/CRM), e-commerce systems, and high-converting marketing websites.",
    },
    {
      question: "What technology stack do you specialize in?",
      answer:
        "Our primary stack includes Next.js, React, TypeScript, Tailwind CSS, Node.js, PostgreSQL, Supabase, and React Native—chosen for reliability, developer velocity, and long-term maintainability.",
    },
    {
      question: "Do we own 100% of the source code and intellectual property?",
      answer:
        "Yes. Upon completion and milestone sign-off, you receive full ownership of the Git repository, design files, cloud infrastructure, and all intellectual property with zero vendor lock-in.",
    },
    {
      question: "How long does it take to launch an MVP or custom platform?",
      answer:
        "Focused web platforms and MVPs typically ship in 2–6 weeks. Larger custom software systems or multi-platform mobile apps are scoped into bi-weekly milestones based on complexity.",
    },
    {
      question: "Can you redesign or modernize an existing legacy product?",
      answer:
        "Yes. We audit existing codebases and interfaces, resolve performance or UX bottlenecks, and migrate fragile systems onto modern, maintainable architectures without losing data.",
    },
    {
      question: "How do you manage communication and sprint progress?",
      answer:
        "Every project runs in transparent weekly sprints with a live staging preview, clear milestone checklists, and direct communication with the engineers and designers building your product.",
    },
    {
      question: "Do you handle SEO, accessibility, and Core Web Vitals?",
      answer:
        "Yes. Semantic HTML, metadata/OpenGraph setup, responsive accessibility, image optimization, and fast server-side rendering are built into our engineering workflow from day one.",
    },
    {
      question: "Do you provide post-launch support and ongoing maintenance?",
      answer:
        "Yes. After launch, we offer flexible retainer and SLA plans covering uptime monitoring, security updates, bug fixes, and continuous feature sprints as your user base grows.",
    },
  ];

  return (
    <div className="flex flex-col items-center text-center bg-secondary/50 text-foreground px-3 py-12 sm:py-16 w-full">
      <SectionHeading
        eyebrow="FAQ"
        title={
          <>
            Frequently Asked <span className="text-primary">Questions</span>.
          </>
        }
        description="Clear answers on our engineering process, ownership, timelines, and support."
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4 items-start text-left">
        {faqsData.map((faq, index) => (
          <div
            key={index}
            className="flex flex-col items-start w-full bg-card border border-border rounded-xl overflow-hidden shadow-xs hover:border-foreground/20 transition-colors duration-150"
          >
            <button
              type="button"
              aria-expanded={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex items-center justify-between gap-4 w-full cursor-pointer p-4 text-left text-foreground"
            >
              <h3 className="text-sm font-medium text-foreground">
                {faq.question}
              </h3>
              <ChevronDown
                className={`${openIndex === index ? "rotate-180" : ""} transition-transform duration-200 text-muted-foreground shrink-0`}
                size={18}
                aria-hidden="true"
              />
            </button>

            <p
              className={`text-sm text-muted-foreground px-4 transition-[max-height,opacity] duration-200 ease-out overflow-hidden leading-relaxed ${
                openIndex === index
                  ? "opacity-100 max-h-[300px] pb-4"
                  : "opacity-0 max-h-0"
              }`}
            >
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
