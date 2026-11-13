"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Progressive enhancement: content is visible even without JavaScript. */
export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (
      !element ||
      typeof element.animate !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    let animation: Animation | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        animation = element.animate(
          [
            { opacity: 0, transform: "translateY(28px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            duration: 650,
            delay,
            easing: "cubic-bezier(.22,1,.36,1)",
            fill: "backwards",
          },
        );
        observer.disconnect();
      },
      { threshold: 0.08 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      animation?.cancel();
    };
  }, [delay]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
