"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  ShoppingCart,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  SiFigma,
  SiGithub,
  SiNextdotjs,
  SiPython,
  SiReact,
  SiStripe,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import LogoIcon from "../../public/images/logo.png";
import { Button } from "../ui/button";

// Rotating title words every 2 seconds matching the reference design
const rotatingWords = [
  "Solution",
  "Ideas",
  "Products",
  "Software",
  "Strategies",
];

// 5 Left converging bezier curves (from Left x=0 towards Center x=470, y=150)
const leftCurves = [
  { d: "M 0 35   C 200 45,  380 140, 470 150" },
  { d: "M 0 85   C 210 90,  390 145, 470 150" },
  { d: "M 0 145  C 220 148, 400 150, 470 150" },
  { d: "M 0 205  C 210 200, 390 155, 470 150" },
  { d: "M 0 260  C 200 250, 380 160, 470 150" },
];

// 5 Right converging bezier curves (from Right x=1000 towards Center x=530, y=150)
const rightCurves = [
  { d: "M 1000 35   C 800 45,  620 140, 530 150" },
  { d: "M 1000 85   C 790 90,  610 145, 530 150" },
  { d: "M 1000 145  C 780 148, 600 150, 530 150" },
  { d: "M 1000 205  C 790 200, 610 155, 530 150" },
  { d: "M 1000 260  C 800 250, 620 160, 530 150" },
];

// Left Tech Stack Nodes traveling smoothly along the curved lines
const leftTechNodes = [
  {
    path: leftCurves[0].d,
    icon: SiReact,
    color: "text-[#06b6d4]",
    name: "React",
    dur: 6.2,
    delay: 0,
  },
  {
    path: leftCurves[1].d,
    icon: SiNextdotjs,
    color: "text-foreground",
    name: "Next.js",
    dur: 6.8,
    delay: 1.2,
  },
  {
    path: leftCurves[2].d,
    icon: SiGithub,
    color: "text-foreground",
    name: "GitHub",
    dur: 5.8,
    delay: 0.4,
  },
  {
    path: leftCurves[3].d,
    icon: SiTypescript,
    color: "text-[#3178c6]",
    name: "TypeScript",
    dur: 6.5,
    delay: 1.8,
  },
  {
    path: leftCurves[4].d,
    icon: SiTailwindcss,
    color: "text-[#38bdf8]",
    name: "Tailwind CSS",
    dur: 7.0,
    delay: 0.8,
  },
  // Staggered second wave for constant natural flow
  {
    path: leftCurves[0].d,
    icon: SiReact,
    color: "text-[#06b6d4]",
    name: "React",
    dur: 6.2,
    delay: 3.1,
  },
  {
    path: leftCurves[2].d,
    icon: SiGithub,
    color: "text-foreground",
    name: "GitHub",
    dur: 5.8,
    delay: 3.3,
  },
];

// Right Tech Stack Nodes traveling smoothly along the curved lines
const rightTechNodes = [
  {
    path: rightCurves[0].d,
    icon: SiFigma,
    color: "text-[#f24e1e]",
    name: "Figma",
    dur: 6.4,
    delay: 0.3,
  },
  {
    path: rightCurves[1].d,
    icon: SiSupabase,
    color: "text-[#3ecf8e]",
    name: "Supabase",
    dur: 6.7,
    delay: 1.5,
  },
  {
    path: rightCurves[2].d,
    icon: SiStripe,
    color: "text-[#635bff]",
    name: "Stripe",
    dur: 5.6,
    delay: 0.6,
  },
  {
    path: rightCurves[3].d,
    icon: SiPython,
    color: "text-[#3776ab]",
    name: "Python",
    dur: 6.9,
    delay: 1.9,
  },
  {
    path: rightCurves[4].d,
    icon: SiVercel,
    color: "text-foreground",
    name: "Vercel",
    dur: 7.2,
    delay: 0.9,
  },
  // Staggered second wave for constant natural flow
  {
    path: rightCurves[0].d,
    icon: SiFigma,
    color: "text-[#f24e1e]",
    name: "Figma",
    dur: 6.4,
    delay: 3.5,
  },
  {
    path: rightCurves[2].d,
    icon: SiStripe,
    color: "text-[#635bff]",
    name: "Stripe",
    dur: 5.6,
    delay: 3.4,
  },
];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);

  // Cycle the word every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full overflow-hidden border-b border-border bg-background pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12">
      {/* Subtle site background gradient wash and architectural grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="absolute inset-0 grid-bg opacity-35 pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7.5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Centered Capsule Badge */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/85 backdrop-blur-md px-3.5 py-1.5 text-xs text-muted-foreground shadow-2xs hover:border-primary/40 transition-colors"
          >
            <span className="rounded-full bg-primary/10 text-primary font-semibold px-2 py-0.5 text-[11px] tracking-wide flex items-center gap-1">
              {/* <Sparkles className="size-3" /> */}
              AI-Powered
            </span>
            <span className="text-foreground/80 font-medium">
              Solutions for Client Businesses
            </span>
          </motion.div>
        </div>

        {/* Center Hero Heading & Floating Cards Wrapper */}
        <div className="relative w-full max-w-7xl mx-auto">
          {/* Left Floating Card: Compact & Sleek */}
          <motion.div
            initial={{ opacity: 0, x: -25, rotate: -6 }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, -6, 0],
              rotate: [-6, -4, -6],
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0.2 },
              x: { duration: 0.6, delay: 0.2 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
            className="hidden xl:block absolute left-0 2xl:left-4 top-10 xl:top-14 2xl:top-16 z-20 w-[210px] xl:w-[225px] 2xl:w-[240px] rounded-2xl bg-card/95 backdrop-blur-xl border border-border/80 p-4 sm:p-4.5 shadow-xl shadow-black/6 text-left select-none pointer-events-none"
          >
            <div className="flex items-center justify-between text-xs mb-2.5">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-foreground text-xs">Activity</span>
              </div>
              <span className="text-[10px] text-muted-foreground font-mono">
                Weekly Report
              </span>
            </div>

            {/* Simulated Line Chart - Slightly more height */}
            <div className="h-13 w-full mb-2.5 relative flex items-end">
              <svg
                viewBox="0 0 100 32"
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,26 Q15,6 30,20 T60,10 T90,5 L100,8 L100,32 L0,32 Z"
                  fill="url(#chartGrad)"
                />
                <path
                  d="M0,26 Q15,6 30,20 T60,10 T90,5 L100,8"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <circle cx="90" cy="5" r="3" fill="var(--primary)" />
              </svg>
            </div>

            <div className="flex items-baseline justify-between mb-2">
              <span className="text-2xl font-bold text-foreground tracking-tight">
                82%
              </span>
              <span className="inline-flex items-center text-[10px] font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                ↑ 38%
              </span>
            </div>

            {/* Days Row */}
            <div className="flex justify-between text-[10px] text-muted-foreground font-mono pt-2.5 border-t border-border/50">
              <span>MO</span>
              <span>TU</span>
              <span className="text-primary font-bold">WE</span>
              <span>TH</span>
              <span>FR</span>
              <span>SA</span>
              <span>SU</span>
            </div>
          </motion.div>

          {/* Right Floating Card: Compact & Sleek */}
          <motion.div
            initial={{ opacity: 0, x: 25, rotate: 6 }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, 6, 0],
              rotate: [6, 4, 6],
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0.3 },
              x: { duration: 0.6, delay: 0.3 },
              y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
              rotate: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
            }}
            className="hidden xl:block absolute right-0 2xl:right-4 top-24 xl:top-28 2xl:top-28 z-20 w-[210px] xl:w-[225px] 2xl:w-[240px] rounded-2xl bg-card/95 backdrop-blur-xl border border-border/80 p-4 sm:p-4.5 shadow-xl shadow-black/6 text-left select-none pointer-events-none"
          >
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-muted-foreground font-medium text-xs">
                Sales Overview
              </span>
              <span className="inline-flex items-center text-[10px] font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                +15.2%
              </span>
            </div>

            <div className="flex items-baseline gap-1.5 mb-3">
              <span className="text-2xl font-bold text-foreground tracking-tight">
                $38.5k
              </span>
              <span className="text-[10px] text-muted-foreground">Monthly</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2.5 border-t border-border/50">
              <div className="p-2.5 rounded-lg bg-accent/35 border border-border/30">
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground mb-0.5">
                  <ShoppingCart className="size-3" />
                  <span>Order</span>
                </div>
                <div className="font-bold text-foreground text-xs">82.2%</div>
                <div className="text-[9px] text-muted-foreground">6,440</div>
              </div>

              <div className="p-2.5 rounded-lg bg-accent/35 border border-border/30">
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground mb-0.5">
                  <TrendingUp className="size-3 text-primary" />
                  <span>Delivered</span>
                </div>
                <div className="font-bold text-foreground text-xs">26.8%</div>
                <div className="text-[9px] text-muted-foreground">2,710</div>
              </div>
            </div>
          </motion.div>

          {/* Center Hero Heading & Text */}
          <div className="max-w-3xl lg:max-w-4xl mx-auto text-center px-4">
            {/* Main Title: Adjusted to be smaller & more elegant */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[44px] font-extrabold tracking-tight text-foreground leading-[1.24] sm:leading-[1.18]"
            >
              <span>Innovative </span>

              {/* Rotating Word Capsule */}
              <span className="inline-flex items-center justify-center min-w-[95px] sm:min-w-[125px] md:min-w-[150px] h-[1.22em] px-2.5 sm:px-4 rounded-full border-2 border-foreground/80 bg-foreground/5 backdrop-blur-md align-middle mx-1 sm:mx-1.5 overflow-hidden shadow-xs">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotatingWords[wordIndex]}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{ duration: 0.32, ease: "easeOut" }}
                    className="inline-block font-extrabold text-foreground"
                  >
                    {rotatingWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>

              <span>and Creative</span>
              <br />
              <span>Ideas To Boost </span>
              {/* <span className="inline-block transform hover:rotate-12 transition-transform duration-200">
                🚀
              </span> */}
              <span> Your Brand!</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-[17px] text-muted-foreground max-w-xl sm:max-w-2xl mx-auto leading-relaxed"
            >
              Our trusted agency for designs that captivate and strategies that drive
              results. We transform ideas into unforgettable digital experiences.
            </motion.p>

            {/* Review / Social Proof Stack */}
            < motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.10 }}
              className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            >
              {/* Overlapping Avatar Stack */}
              <div className="flex -space-x-2.5 overflow-hidden p-0.5">
                {[
                  { name: "Sarah", bg: "from-blue-500 to-indigo-600" },
                  { name: "Flex", bg: "from-purple-500 to-pink-600" },
                  // { name: "Liam", bg: "from-emerald-500 to-teal-600" },
                  // { name: "Emma", bg: "from-amber-500 to-orange-600" },
                ].map((avatar, idx) => (
                  <div
                    key={idx}
                    className={`size-8 sm:size-8.5 rounded-full bg-gradient-to-tr ${avatar.bg} ring-2 ring-background flex items-center justify-center text-white text-[11px] font-bold shadow-xs`}
                  >
                    {avatar.name[0]}
                  </div>
                ))}
              </div>

              {/* Stars and Text */}
              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-foreground">4.9</span>
                <span className="text-xs text-muted-foreground font-medium">
                  Trusted by 1000+ Designers &amp; Developers
                </span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 sm:mt-7 flex items-center justify-center gap-3.5"
            >
              <Button
                asChild
                size="lg"
                className="rounded-full px-6 sm:px-7 h-10 sm:h-11 bg-foreground text-background hover:bg-foreground/90 font-semibold text-sm shadow-md active:scale-95 transition-all gap-2"
              >
                <Link href="/contact">
                  <span>Book a Call</span>
                  <Phone className="size-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-6 sm:px-7 h-10 sm:h-11 bg-card border-border/90 hover:bg-secondary text-foreground font-semibold text-sm shadow-2xs active:scale-95 transition-all gap-1.5"
              >
                <Link href="/services">
                  <span>View Pricing</span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* Converging Fixed Lines with Tech Stack Moving Smoothly */}
        {/* ======================================================== */}
        <div className="relative mt-12 sm:mt-16 w-full max-w-7xl mx-auto h-[230px] sm:h-[290px] md:h-[320px] flex items-center justify-center overflow-hidden">
          {/* SVG Converging Lines & Moving Tech Nodes */}
          <svg
            className="absolute inset-0 w-full h-full overflow-visible"
            viewBox="0 0 1000 300"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Soft Drop Shadow for Tech Node Badges */}
              <filter id="nodeShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.08" />
              </filter>

              {/* Center Subtle Aura Filter */}
              <radialGradient id="centerAura" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.06" />
                <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Ambient Background Aura behind center hub */}
            <circle cx="500" cy="150" r="130" fill="url(#centerAura)" />

            {/* 1) Fixed, static neutral lines (no color strokes) */}
            {leftCurves.map((line, i) => (
              <path
                key={`left-fixed-${i}`}
                d={line.d}
                fill="none"
                stroke="currentColor"
                className="text-border/75"
                strokeWidth="1.2"
              />
            ))}

            {rightCurves.map((line, i) => (
              <path
                key={`right-fixed-${i}`}
                d={line.d}
                fill="none"
                stroke="currentColor"
                className="text-border/75"
                strokeWidth="1.2"
              />
            ))}

            {/* 2) Left Tech Stack Nodes: Traveling smoothly along the lines to center */}
            {
              leftTechNodes.map((node, i) => {
                const Icon = node.icon;
                return (
                  <g key={`left-node-${i}`} className="pointer-events-auto select-none">
                    <animateMotion
                      path={node.path}
                      dur={`${node.dur}s`}
                      repeatCount="indefinite"
                      begin={`${node.delay}s`}
                      calcMode="linear"
                    />
                    <animate
                      attributeName="opacity"
                      values="0; 1; 1; 0"
                      keyTimes="0; 0.12; 0.88; 1"
                      dur={`${node.dur}s`}
                      repeatCount="indefinite"
                      begin={`${node.delay}s`}
                    />
                    {/* Transparent Tech Icon (No background circle) */}
                    <foreignObject x="-14" y="-14" width="28" height="28">
                      <div className="w-full h-full flex items-center justify-center">
                        <Icon className={`size-5 sm:size-5.5 ${node.color} drop-shadow-xs transition-transform hover:scale-125`} />
                      </div>
                    </foreignObject>
                  </g>
                );
              })
            }

            {/* 3) Right Tech Stack Nodes: Traveling smoothly along the lines to center */}
            {rightTechNodes.map((node, i) => {
              const Icon = node.icon;
              return (
                <g key={`right-node-${i}`} className="pointer-events-auto select-none">
                  <animateMotion
                    path={node.path}
                    dur={`${node.dur}s`}
                    repeatCount="indefinite"
                    begin={`${node.delay}s`}
                    calcMode="linear"
                  />
                  <animate
                    attributeName="opacity"
                    values="0; 1; 1; 0"
                    keyTimes="0; 0.12; 0.88; 1"
                    dur={`${node.dur}s`}
                    repeatCount="indefinite"
                    begin={`${node.delay}s`}
                  />
                  {/* Transparent Tech Icon (No background circle) */}
                  <foreignObject x="-14" y="-14" width="28" height="28">
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon className={`size-5 sm:size-5.5 ${node.color} drop-shadow-xs transition-transform hover:scale-125`} />
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>

          {/* Center Hub Logo Card (Matching screenshot) */}
          <div className="relative z-30 flex items-center justify-center">
            {/* Outer Subtle Pulse Ring */}
            <div className="absolute -inset-2 rounded-3xl bg-foreground/5 blur-md animate-pulse pointer-events-none" />

            {/* Hub Card */}
            <div className="relative size-16 sm:size-20 rounded-2xl bg-card border-2 border-border/90 shadow-2xl shadow-black/10 flex items-center justify-center p-3 hover:scale-105 transition-transform duration-300">
              <Image
                src={LogoIcon}
                alt="SoftZeniq Brand Hub"
                width={64}
                height={64}
                priority
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div >
    </section >
  );
}
