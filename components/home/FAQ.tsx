"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "../shared/SectionHeading";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqsData = [
    {
      question: "Why does my e-commerce business need a professional website?",
      answer:
        "A professional website builds customer trust, increases conversions, improves brand value, and gives your business a strong online presence beyond social media platforms.",
    },
    {
      question: "How can Softzeniq IT help grow my online business?",
      answer:
        "We help businesses grow through modern website development, SEO optimization, high-converting UI/UX, branding, and digital marketing strategies tailored for e-commerce success.",
    },
    {
      question: "Do you create custom e-commerce websites?",
      answer:
        "Yes. Every website we build is fully customized based on your business goals, target audience, products, and brand identity — no generic templates.",
    },
    {
      question: "Will my website be mobile responsive?",
      answer:
        "Absolutely. All our websites are optimized for mobile, tablet, and desktop devices to ensure the best user experience across all screen sizes.",
    },
    {
      question: "Can you redesign my existing website?",
      answer:
        "Yes. We redesign outdated websites into modern, fast, and conversion-focused platforms that improve customer engagement and business performance.",
    },
    {
      question: "Do you provide SEO and Google ranking optimization?",
      answer:
        "Yes. We implement technical SEO, fast-loading architecture, metadata optimization, sitemap setup, and search engine best practices to help improve your Google visibility.",
    },
    {
      question: "Can you help with Facebook and Google Ads?",
      answer:
        "Yes. We create data-driven ad campaigns designed to increase traffic, generate leads, and improve sales performance for e-commerce businesses.",
    },
    {
      question: "How long does it take to build a website?",
      answer:
        "Project timelines depend on complexity and features. Most business websites are completed within 1–3 weeks, while advanced platforms may require additional time.",
    },
    {
      question: "Will I be able to manage my website after launch?",
      answer:
        "Yes. We build user-friendly systems and can provide admin dashboards, CMS integration, and training so you can easily manage your content and products.",
    },
    {
      question: "Why should I choose Softzeniq IT?",
      answer:
        "We focus on more than just design — we build modern digital experiences that help businesses increase trust, improve conversions, and scale online professionally.",
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
        description="Proactively answering FAQs boosts user confidence and cuts down on support tickets."
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
              <h3 className="text-sm font-medium text-foreground">{faq.question}</h3>
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
