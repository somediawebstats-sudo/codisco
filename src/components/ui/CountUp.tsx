"use client";

import { useEffect, useRef, useState } from "react";
import { onSiteReady } from "./Loader";

/* Compteur animé (ex. « +30 ans »).
   Le serveur rend la valeur finale (référencement, sans JavaScript). Dans le navigateur, le chiffre
   repart de 0 et monte jusqu'à la valeur quand il entre à l'écran, après le loader.
   Les lecteurs d'écran lisent uniquement la valeur finale. */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1800,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let io: IntersectionObserver | null = null;

    const run = () => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - t, 4); // décélération en fin de course
        setValue(Math.round(eased * to));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    // Remise à zéro dans une frame (jamais visible : loader à l'écran ou bloc hors écran)
    raf = requestAnimationFrame(() => setValue(0));
    const stopReady = onSiteReady(() => {
      io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          io?.disconnect();
          run();
        },
        { rootMargin: "0px 0px -10% 0px" },
      );
      io.observe(el);
    });

    return () => {
      stopReady();
      io?.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className="count-up">
      {/* Double invisible : réserve la largeur finale, le texte voisin ne bouge pas */}
      <span className="count-up-ghost" aria-hidden="true">
        {prefix}
        {to}
        {suffix}
      </span>
      <span aria-hidden="true">
        {prefix}
        {value}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {to}
        {suffix}
      </span>
    </span>
  );
}
