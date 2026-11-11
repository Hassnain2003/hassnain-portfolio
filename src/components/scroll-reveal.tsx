"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollReveal({ children, delay = 0, once = true }: { children: React.ReactNode; delay?: number; once?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div ref={ref} className="reveal-wrapper">
      <div
        className={`reveal-content transition-all duration-[400ms] ease-out ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-[1rem]"
        }`}
        style={{
          transitionDelay: `${delay}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
}