"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Code2,
  Cpu,
  Smartphone,
  Rocket,
  Palette,
  ShoppingCart,
  Search,
  Megaphone,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "../../public/images/logo2.png";

// Two-column categorized services matching the design screenshot
const serviceCategories = [
  {
    category: "Development & Engineering",
    items: [
      {
        slug: "web",
        title: "Web Development",
        desc: "Lightning-fast websites and platforms engineered to convert.",
        icon: Code2,
      },
      {
        slug: "software",
        title: "Custom Software",
        desc: "Bespoke platforms, ERPs, CRMs, and APIs tailored to you.",
        icon: Cpu,
      },
      {
        slug: "mobile",
        title: "Mobile App Development",
        desc: "Native-feel iOS & Android apps built for performance.",
        icon: Smartphone,
      },
      {
        slug: "saas",
        title: "SaaS Product Development",
        desc: "Zero-to-one SaaS products shipped by senior engineering teams.",
        icon: Rocket,
      },
    ],
  },
  {
    category: "Design & Growth Marketing",
    items: [
      {
        slug: "design",
        title: "UI / UX Design",
        desc: "Research-driven product design that elevates your brand.",
        icon: Palette,
      },
      {
        slug: "ecommerce",
        title: "E-commerce Development",
        desc: "Optimized storefronts that turn browsers into paying buyers.",
        icon: ShoppingCart,
      },
      {
        slug: "seo",
        title: "SEO Optimization",
        desc: "Rank higher, capture high-intent search, and compound traffic.",
        icon: Search,
      },
      {
        slug: "ads",
        title: "Ads Campaign Management",
        desc: "Performance ads with positive ROAS on Meta and Google.",
        icon: Megaphone,
      },
    ],
  },
];

// Navigation links (Home link removed as per requirement)
type NavItem = {
  to: string;
  label: string;
  hasDropdown?: boolean;
};

const navItems: NavItem[] = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services", hasDropdown: true },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
];

export function Navbar({ customLogoUrl }: { customLogoUrl?: string | null }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const pathname = usePathname();

  // Handle sticky border on scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on path change
  useEffect(() => {
    setMobileOpen(false);
    setServicesDropdownOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  // Smooth hover handlers for Services menu
  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 160);
  };

  // Hide on admin/backend paths
  if (pathname.startsWith("/softzeniq") || pathname.startsWith("/admin")) {
    return null;
  }

  const isServicesActive =
    pathname === "/services" || pathname.startsWith("/services/");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 bg-white/95 backdrop-blur-md ${scrolled
        ? "border-b border-gray-200/90 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)]"
        : "border-b border-gray-200/70"
        }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-4">
        <div className="h-16 md:h-18 flex items-center justify-between">
          {/* Brand Logo - default home link */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-90"
            aria-label="SoftZeniq Home"
          >
            <div className="relative h-9 w-24 md:h-10 md:w-28 flex items-center">
              {customLogoUrl ? (
                <img
                  src={customLogoUrl}
                  alt="SoftZeniq"
                  className="w-full h-full object-contain"
                />
              ) : (
                <Image
                  src={Logo}
                  alt="SoftZeniq"
                  width={280}
                  height={110}
                  priority
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </Link>

          {/* Center Navigation Links (Matching Screenshot Style) */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              if (item.hasDropdown) {
                const isOpenOrActive = isServicesActive || servicesDropdownOpen;

                return (
                  <div
                    key={item.to}
                    className="relative py-2"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={item.to}
                      className={`inline-flex items-center gap-1.5 text-sm transition-colors duration-150 ${isOpenOrActive
                        ? "font-semibold text-gray-950"
                        : "font-medium text-gray-600 hover:text-gray-950"
                        }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`size-3.5 transition-transform duration-200 ${servicesDropdownOpen ? "rotate-180" : ""
                          }`}
                      />
                    </Link>

                    {/* Exact Screenshot-Style 2-Column Dropdown */}
                    <AnimatePresence>
                      {servicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.99 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.99 }}
                          transition={{ duration: 0.16, ease: "easeOut" }}
                          className="absolute left-1/2 -translate-x-[32%] lg:-translate-x-1/2 top-full pt-2 w-[640px] max-w-[calc(100vw-2rem)] pointer-events-auto z-50"
                        >
                          <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xl shadow-black/10 p-6 grid grid-cols-2 gap-8 text-left">
                            {serviceCategories.map((group) => (
                              <div key={group.category} className="flex flex-col">
                                {/* Column Category Header */}
                                <h3 className="text-xs font-medium text-gray-400 tracking-normal mb-3">
                                  {group.category}
                                </h3>

                                {/* Column Service Items */}
                                <div className="flex flex-col gap-3.5">
                                  {group.items.map((svc) => {
                                    const Icon = svc.icon;
                                    const isCurrent =
                                      pathname === `/services/${svc.slug}`;

                                    return (
                                      <Link
                                        key={svc.slug}
                                        href={`/services/${svc.slug}`}
                                        onClick={() =>
                                          setServicesDropdownOpen(false)
                                        }
                                        className={`group flex items-start gap-3 p-1.5 -mx-1.5 rounded-xl transition-colors duration-150 ${isCurrent
                                          ? "bg-gray-50"
                                          : "hover:bg-gray-50/90"
                                          }`}
                                      >
                                        {/* Outlined Icon Box */}
                                        <div className="size-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-700 shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.03)] group-hover:border-gray-300 group-hover:text-primary transition-colors">
                                          <Icon
                                            className="size-4"
                                            strokeWidth={1.75}
                                          />
                                        </div>

                                        {/* Title + 2-line Description */}
                                        <div className="flex-1 min-w-0">
                                          <div className="text-[13px] font-semibold text-gray-900 leading-tight group-hover:text-primary transition-colors">
                                            {svc.title}
                                          </div>
                                          <p className="text-xs text-gray-500 leading-snug mt-1">
                                            {svc.desc}
                                          </p>
                                        </div>
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const active = pathname === item.to;

              return (
                <Link
                  href={item.to}
                  className={`text-sm transition-colors duration-150 ${active
                    ? "font-semibold text-gray-950"
                    : "font-medium text-gray-600 hover:text-gray-950"
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA Button (Tactile button matching screenshot) */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-gray-200/90 bg-blue-700 hover:bg-blue-800 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] hover:bg-blue-500 hover:text-white active:scale-[0.98] transition-all"
            >
              Start Project
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/contact"
              className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-xs"
            >
              Start Project
            </Link>

            <button
              className="h-9 w-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="size-4.5" />
              ) : (
                <Menu className="size-4.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-b border-gray-200 bg-white shadow-lg"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 text-sm rounded-lg font-medium ${pathname === "/about"
                  ? "text-gray-950 font-semibold bg-gray-50"
                  : "text-gray-600 hover:bg-gray-50"
                  }`}
              >
                About
              </Link>

              {/* Mobile Services Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((prev) => !prev)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg font-medium ${isServicesActive
                    ? "text-gray-950 font-semibold bg-gray-50"
                    : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`size-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-3 pr-2 py-2 flex flex-col gap-3"
                    >
                      {serviceCategories.map((group) => (
                        <div key={group.category} className="flex flex-col gap-1.5">
                          <span className="text-[11px] font-medium text-gray-400 px-2 uppercase tracking-wider">
                            {group.category}
                          </span>
                          {group.items.map((svc) => {
                            const Icon = svc.icon;
                            return (
                              <Link
                                key={svc.slug}
                                href={`/services/${svc.slug}`}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-xs text-gray-700 hover:bg-gray-50"
                              >
                                <div className="size-6 rounded border border-gray-200 flex items-center justify-center shrink-0">
                                  <Icon className="size-3 text-gray-600" />
                                </div>
                                <span className="font-medium truncate">
                                  {svc.title}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/portfolio"
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 text-sm rounded-lg font-medium ${pathname === "/portfolio"
                  ? "text-gray-950 font-semibold bg-gray-50"
                  : "text-gray-600 hover:bg-gray-50"
                  }`}
              >
                Portfolio
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 text-sm rounded-lg font-medium ${pathname === "/contact"
                  ? "text-gray-950 font-semibold bg-gray-50"
                  : "text-gray-600 hover:bg-gray-50"
                  }`}
              >
                Contact
              </Link>

              <div className="pt-3 mt-2 border-t border-gray-100">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-center rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-800 shadow-xs"
                >
                  Start Project
                </Link>
              </div >
            </div >
          </motion.div >
        )
        }
      </AnimatePresence >
    </header >
  );
}
