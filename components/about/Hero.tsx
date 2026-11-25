import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GridBackdrop } from "../shared/GridBackDrop";
import { Reveal } from "../shared/Revel";

export default function AboutHero() {
  return (
    <section className="relative pt-30 pb-10 overflow-hidden">
      <GridBackdrop />
      <div className=" mx-auto px-5 sm:px-8 text-center">
        <Reveal>
          {/* <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-muted-foreground mb-4">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            About SoftZeniq
          </span> */}
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-foreground">
            We build software for{" "}
            <span className="text-primary">
              founders who refuse to compromise
            </span>
            .
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
            SoftZeniq is a senior product team partnering with startups and
            businesses to design, build and grow digital products that customers
            love and investors notice.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
            <Button
              asChild
              variant="hero"
              size="lg"
              className="px-7 h-12 text-sm"
            >
              <Link href="/contact">Work with us</Link>
            </Button>
            <Button
              asChild
              variant="glass"
              size="lg"
              className="px-7 h-12 text-sm"
            >
              <Link href="/portfolio">View Our Work</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
