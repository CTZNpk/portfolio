"use client";

import { useEffect, useState, type ElementType, type ReactNode } from "react";

type RevealDirection = "up" | "left" | "right" | "scale";

/**
 * Reveals its children with a soft entrance the first time they scroll into
 * view. The hidden state lives in CSS behind `html.js [data-reveal]`, so if JS
 * never runs (or IntersectionObserver is unavailable) the content stays visible.
 */
export default function Reveal({
  children,
  as,
  className = "",
  direction = "up",
  delay = 0,
  once = true,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  once?: boolean;
}) {
  const Tag = (as ?? "div") as ElementType;
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      // Old browsers without IO: reveal on the next tick so we never leave
      // content hidden (avoids a synchronous setState inside the effect).
      const timer = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, once]);

  return (
    <Tag
      ref={setNode}
      data-reveal={direction}
      className={`${className} ${visible ? "is-visible" : ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
