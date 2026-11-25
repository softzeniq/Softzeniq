import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "../shared/Revel";
import { Button } from "../ui/button";

export default function CTA() {
  return (
    <div>
      {" "}
      <section className="relative py-12 sm:py-16 w-full">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden p-10 sm:p-16 text-center bg-primary shadow-md">
              <div className="absolute inset-0 grid-bg opacity-15" />
              <h2 className="relative text-3xl sm:text-5xl font-semibold tracking-tight text-primary-foreground">
                Ready to build something remarkable?
              </h2>
              <p className="relative mt-4 text-primary-foreground/80 max-w-lg mx-auto">
                Tell us about your idea — we'll send a proposal within 24 hours.
              </p>
              <div className="relative mt-8 flex flex-col sm:flex-row justify-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-background text-foreground hover:bg-background/90 h-12 px-7"
                >
                  <Link href="/contact">
                    Book Free Consultation <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 h-12 px-7"
                >
                  <Link href="/services">Explore services</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
