"use client";

import { submitInquiry } from "@/app/actions/leads";
import { Button } from "@/components/ui/button";
import { Check, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GridBackdrop } from "../shared/GridBackDrop";
import { Reveal } from "../shared/Revel";

const projectTypes = [
  "Web Development",
  "E-commerce Development",
  "Custom Software",
  "Mobile App Development",
  "UI / UX Design",
  "SEO Optimization",
  "Ads Campaign Management",
  "SaaS Product Development",
];
const budgets = ["< $5k", "$5k – $15k", "$15k – $50k", "$50k+"];

export default function Contact() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") || "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState(() =>
    projectTypes.includes(initialService) ? initialService : ""
  );
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [needsFallback, setNeedsFallback] = useState(false);

  useEffect(() => {
    if (initialService && projectTypes.includes(initialService)) {
      setProjectType(initialService);
    }
  }, [initialService]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);
    setNeedsFallback(false);

    const res = await submitInquiry({
      name,
      email,
      projectType,
      budget,
      message,
    });

    setSubmitting(false);

    if (res.success) {
      setSent(true);
    } else {
      setErrorMsg(res.error || "Failed to submit inquiry.");
      setNeedsFallback(Boolean(res.needsMigration));
    }
  }

  const whatsappBriefUrl = `https://wa.me/8801791091160?text=${encodeURIComponent(
    `Hi SoftZeniq, I'm ${name || "a prospective client"} (${email || "no email"}). Project: ${projectType || "Software"} (${budget || "Budget TBD"}). ${message}`
  )}`;

  const fieldClasses =
    "w-full bg-background border border-border rounded-lg px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-[border-color,box-shadow] duration-150";

  return (
    <>
      <section className="relative pt-24 sm:pt-32 pb-12 overflow-hidden">
        <GridBackdrop />
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary border border-border px-3 py-1 text-xs font-medium text-muted-foreground mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Get in touch
            </span>
            <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-foreground">
              Let&apos;s build{" "}
              <span className="text-primary">your next thing</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Tell us a bit about the project. We respond within 24 hours with a
              tailored proposal.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6">
          {/* Info */}
          <Reveal>
            <div className="bg-card border border-border shadow-xs rounded-2xl p-6 sm:p-7 h-full flex flex-col gap-5">
              <h3 className="font-display text-xl font-semibold text-foreground">
                Reach us directly
              </h3>
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "softzeniq@gmail.com",
                  href: "mailto:softzeniq@gmail.com",
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+880 1791-091160",
                  href: "tel:+8801791091160",
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: "Dhaka · Remote Worldwide",
                },
              ].map((c) => (
                <div key={c.label} className="flex gap-3.5 items-center">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0">
                    <c.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">
                      {c.label}
                    </div>
                    {c.href ? (
                      <a
                        href={c.href}
                        className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <div className="text-sm font-medium text-foreground">
                        {c.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <a
                href="https://wa.me/8801791091160"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-3 text-sm font-medium shadow-xs hover:bg-primary/90 transition-colors"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
              <div className="mt-2 rounded-xl overflow-hidden border border-border w-full h-44 sm:h-56">
                <iframe
                  title="SoftZeniq Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2945.2457475868355!2d90.38816607431781!3d23.878821978582998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDUyJzQzLjgiTiA5MMKwMjMnMjYuNyJF!5e1!3m2!1sen!2sbd!4v1779552441092!5m2!1sen!2sbd"
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <div className="bg-card border border-border shadow-xs rounded-2xl p-6 sm:p-7">
              {sent ? (
                <div className="py-16 text-center">
                  <div className="mx-auto h-14 w-14 rounded-full bg-primary/10 text-primary grid place-items-center">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-foreground">
                    Message received!
                  </h3>
                  <p className="mt-2 text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
                    Thank you, {name}. We&apos;ll review your brief and respond
                    within 24 hours. For urgent inquiries, feel free to ping us
                    on WhatsApp.
                  </p>
                  <Button
                    type="button"
                    variant="glass"
                    size="sm"
                    className="mt-6"
                    onClick={() => {
                      setSent(false);
                      setName("");
                      setEmail("");
                      setBudget("");
                      setMessage("");
                    }}
                  >
                    Send another inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="grid gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Name">
                      <input
                        name="name"
                        required
                        minLength={2}
                        maxLength={100}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={fieldClasses}
                        placeholder="Jane Doe"
                      />
                    </Field>
                    <Field label="Email">
                      <input
                        name="email"
                        required
                        type="email"
                        maxLength={150}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={fieldClasses}
                        placeholder="jane@company.com"
                      />
                    </Field>
                  </div>
                  <Field label="Project type">
                    <select
                      name="projectType"
                      required
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className={fieldClasses}
                    >
                      <option value="">Select a type…</option>
                      {projectTypes.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Budget">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgets.map((b) => (
                        <label key={b} className="cursor-pointer">
                          <input
                            type="radio"
                            name="budget"
                            value={b}
                            checked={budget === b}
                            onChange={(e) => setBudget(e.target.value)}
                            className="peer sr-only"
                          />
                          <div className="text-center text-sm py-2 px-3 rounded-lg border border-border hover:border-primary/40 peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary transition-colors">
                            {b}
                          </div>
                        </label>
                      ))}
                    </div>
                  </Field>
                  <Field label="Tell us about your project">
                    <textarea
                      name="message"
                      required
                      minLength={10}
                      maxLength={1500}
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`${fieldClasses} resize-none`}
                      placeholder="Goals, timeline, anything we should know…"
                    />
                  </Field>

                  {errorMsg && (
                    <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-3.5 text-sm text-destructive">
                      <p>{errorMsg}</p>
                      {needsFallback && (
                        <a
                          href={whatsappBriefUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1.5 font-medium underline underline-offset-4"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Send this brief on WhatsApp instead
                        </a>
                      )}
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    disabled={submitting}
                    className="mt-2"
                  >
                    {submitting ? "Sending..." : "Send message"}{" "}
                    <Send className="h-4 w-4" />
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    By submitting, you agree to our use of this info to reply to
                    your inquiry.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground mb-1.5 block">
        {label}
      </span>
      {children}
    </label>
  );
}
