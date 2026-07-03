"use client";

import { useEffect, useState } from "react";

/**
 * Types through a list of phrases with a blinking block caret.
 * Under prefers-reduced-motion (or before hydration) it simply shows the
 * first phrase, so no content is ever hidden.
 */
export default function Typewriter({
  phrases,
  className = "",
  typeMs = 55,
  eraseMs = 26,
  holdMs = 2200,
}: {
  phrases: string[];
  className?: string;
  typeMs?: number;
  eraseMs?: number;
  holdMs?: number;
}) {
  const [text, setText] = useState(phrases[0] ?? "");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (
      phrases.length === 0 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    let phraseIndex = 0;
    let charIndex = phrases[0].length;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const phrase = phrases[phraseIndex];

      if (!deleting) {
        charIndex += 1;
        setText(phrase.slice(0, charIndex));
        if (charIndex >= phrase.length) {
          deleting = true;
          timer = setTimeout(tick, holdMs);
          return;
        }
        timer = setTimeout(tick, typeMs);
      } else {
        charIndex -= 1;
        setText(phrase.slice(0, charIndex));
        if (charIndex <= 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          timer = setTimeout(tick, 350);
          return;
        }
        timer = setTimeout(tick, eraseMs);
      }
    };

    timer = setTimeout(() => {
      setAnimate(true);
      tick();
    }, holdMs);
    return () => clearTimeout(timer);
  }, [phrases, typeMs, eraseMs, holdMs]);

  return (
    <span className={className}>
      {text}
      <span className={animate ? "caret-block" : "caret-block opacity-0"} />
    </span>
  );
}
