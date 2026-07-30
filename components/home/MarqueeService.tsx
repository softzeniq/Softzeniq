"use client";
import { DynamicIcon } from "../shared/DynamicIcon";
import React, { useCallback, useEffect, useRef } from "react";

function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

const useAnimationFrame = (callback: (time: number, delta: number) => void) => {
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  const animate = useCallback(
    (time: number) => {
      if (
        previousTimeRef.current !== null &&
        previousTimeRef.current !== undefined
      ) {
        const delta = time - previousTimeRef.current;
        callback(time, delta);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [callback],
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);
};

interface MarqueeProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  speed?: number;
  vertical?: boolean;
  repeat?: number;
}

function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  speed = 50,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const singleContentBlockRef = useRef<HTMLDivElement | null>(null);
  const animX = useRef<number>(0);
  const isPaused = useRef<boolean>(false);

  useAnimationFrame((_, delta) => {
    if (
      !containerRef.current ||
      !contentRef.current ||
      !singleContentBlockRef.current
    )
      return;

    if (pauseOnHover && isPaused.current) {
      return;
    }

    const singleContentBlockSize = vertical
      ? singleContentBlockRef.current.offsetHeight
      : singleContentBlockRef.current.offsetWidth;

    const contentStyle = window.getComputedStyle(contentRef.current);
    const computedGap = parseFloat(
      vertical ? contentStyle.rowGap || "0" : contentStyle.columnGap || "0",
    );
    const loopDistance = singleContentBlockSize + computedGap;
    const dx = (speed * delta) / 1000;
    const effectiveDx = reverse ? dx : -dx;
    animX.current += effectiveDx;

    if (Math.abs(animX.current) >= loopDistance) {
      animX.current = animX.current % loopDistance;
    }

    if (vertical) {
      contentRef.current.style.transform = `translateY(${animX.current}px)`;
    } else {
      contentRef.current.style.transform = `translateX(${animX.current}px)`;
    }
  });

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      isPaused.current = true;
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      isPaused.current = false;
    }
  }, [pauseOnHover]);

  return (
    <div
      {...props}
      ref={containerRef}
      className={cn(
        "group flex overflow-hidden p-2 [--gap:2rem] [gap:var(--gap)]" +
          (vertical ? " flex-col" : " flex-row"),
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={contentRef}
        className={cn(
          "flex shrink-0 justify-around [gap:var(--gap)]" +
            (vertical ? " flex-col" : " flex-row"),
        )}
      >
        {Array(repeat)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              ref={i === 0 ? singleContentBlockRef : null}
              className="flex gap-8"
            >
              {children}
            </div>
          ))}
      </div>
    </div>
  );
}

export default function MarqueeService({ services }: { services: any[] }) {
  return (
    <section className="relative overflow-hidden py-2 sm:py-6">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent dark:from-zinc-950" />

          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent dark:from-zinc-950" />

          <Marquee pauseOnHover speed={35} repeat={4} className="py-5">
            {services?.map((service) => (
              <div
                key={service.slug}
                className="mx-3 flex items-center gap-3 rounded-full border border-zinc-200 bg-white px-5 py-3 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 dark:bg-zinc-900 dark:border-zinc-800"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-600">
                  <DynamicIcon name={service.icon_name} className="h-4 w-4" />
                </div>

                <span className="text-sm font-medium whitespace-nowrap text-zinc-700 dark:text-zinc-200">
                  {service.title}
                </span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
