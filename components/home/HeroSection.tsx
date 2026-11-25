"use client";

import { ArrowRight } from "lucide-react";
import CircuitBoard from "./CircuitBoard";
// import {IoChevronForward} from "react-icons/io5";
// import CircuitBoard from "./CircuitBoard.jsx"
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <CircuitBoard>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-24 pb-12 sm:pt-28 sm:pb-14 text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 rounded-full bg-card border border-border shadow-xs px-3.5 py-1.5 text-xs font-medium text-muted-foreground mb-6"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Software Engineering Studio
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.06] text-foreground"
        >
          Web, mobile &amp; custom software{" "}
          <span className="text-primary">engineered to scale</span>.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed"
        >
          SoftZeniq designs and builds production web applications, SaaS
          platforms, and mobile products for startups and growing businesses —
          from architecture to launch.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button
            asChild
            variant="hero"
            size="lg"
            className="px-7 h-12 text-sm"
          >
            <Link href="/contact">
              Get a Free Consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="glass"
            size="lg"
            className="px-7 h-12 text-sm"
          >
            <Link href="/portfolio">View Our Work</Link>
          </Button>
        </motion.div>
      </div>
    </CircuitBoard>
  );
}
