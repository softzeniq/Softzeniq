"use client";
import { subscribeNewsletter } from "@/app/actions/leads";
import { Check, Mail, MessageCircle, Phone, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "../../public/images/logo2.png";

export default function Footer({
  customLogoUrl,
}: {
  customLogoUrl?: string | null;
}) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const pathname = usePathname();

  if (pathname.startsWith("/softzeniq")) return null;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setErrorMsg(null);

    const res = await subscribeNewsletter(email);
    setSubmitting(false);

    if (res.success) {
      setSubscribed(true);
      setEmail("");
    } else {
      setErrorMsg(res.error || "Could not subscribe.");
    }
  };

  return (
    <footer className="relative border-t border-border bg-secondary mt-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 sm:py-16 grid gap-6 md:gap-12 grid-cols-2 lg:grid-cols-6">
        {/* Brand */}
        <div className="col-span-2 space-y-4">
          {customLogoUrl ? (
            <img
              src={customLogoUrl}
              alt="SoftZeniq Logo"
              className="h-10 w-auto object-contain"
            />
          ) : (
            <Image
              src={Logo}
              alt="SoftZeniq Logo"
              loading="eager"
              className="h-10 w-auto"
            />
          )}
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            SoftZeniq builds reliable web applications, mobile apps, and custom
            software systems for startups and growing businesses worldwide.
          </p>
          <div className="flex gap-2.5 pt-2">
            <a
              href="https://wa.me/8801791091160"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp SoftZeniq"
              className="h-9 w-9 grid place-items-center rounded-lg bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href="tel:+8801791091160"
              aria-label="Call SoftZeniq"
              className="h-9 w-9 grid place-items-center rounded-lg bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
            >
              <Phone className="h-4 w-4" />
            </a>
            <a
              href="mailto:softzeniq@gmail.com"
              aria-label="Email SoftZeniq"
              className="h-9 w-9 grid place-items-center rounded-lg bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="font-display font-semibold mb-4 text-sm text-foreground">
            Company
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/about" className="hover:text-foreground transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-foreground transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-foreground transition-colors">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-semibold mb-4 text-sm text-foreground">
            Contact
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a
                href="mailto:softzeniq@gmail.com"
                className="hover:text-foreground transition-colors"
              >
                softzeniq@gmail.com
              </a>
            </li>
            <li>
              <a
                href="tel:+8801791091160"
                className="hover:text-foreground transition-colors"
              >
                +880 1791-091160
              </a>
            </li>
            <li>Dhaka · Remote Worldwide</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="col-span-2 space-y-2">
          <h4 className="font-display font-semibold mb-4 text-sm text-foreground">
            Engineering Dispatch
          </h4>
          <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
            Product engineering notes, case studies, and release updates — zero
            fluff.
          </p>
          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="flex overflow-hidden rounded-xl border border-border bg-background focus-within:ring-1 focus-within:ring-primary/40 focus-within:border-primary transition-[border-color,box-shadow]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@business.com"
                className="flex-1 bg-transparent py-2.5 pl-3.5 pr-2 text-xs text-foreground placeholder-muted-foreground focus:outline-none"
                required
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-5 bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Subscribe"
              >
                {subscribed ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
            {subscribed && (
              <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                Subscribed! Thank you for joining.
              </p>
            )}
            {errorMsg && (
              <p className="text-xs text-destructive">{errorMsg}</p>
            )}
          </form>
          <p className="text-[11px] text-muted-foreground mt-3 leading-relaxed">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>

      <div className="border-t border-border/50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} SoftZeniq. All rights reserved.</p>
          <p>Software Engineering · Web &amp; Mobile Products</p>
        </div>
      </div>
    </footer>
  );
}
