"use client";

import { useEffect, useRef } from "react";

/* Frise de la méthode, pilotée par le défilement de la page.
   En descendant : l'étape 1 s'allume, sa jauge se remplit, puis l'étape 2 s'allume, etc.

   - Grand écran (frise horizontale) : le titre et la frise sont ÉPINGLÉS à l'écran (position sticky)
     pendant toute la séquence. La page ne reprend son défilement qu'une fois les 4 étapes allumées :
     impossible de passer la section sans l'avoir vue en entier.
   - Petit écran (≤ 900 px, frise verticale) : pas d'épinglage, l'allumage suit la lecture.

   Chaque étape reçoit deux variables CSS : --lit (allumage, 0 → 1) et --fill (jauge, 0 → 1).
   Sans JavaScript ou avec prefers-reduced-motion : pas d'épinglage, frise entièrement allumée. */

export type Etape = { titre: string; texte: string; note: string };

const COMPACT = "(max-width: 900px)";
// Chaque étape occupe 1 unité d'allumage + 2 unités de jauge sur l'échelle de progression
const LIGHT = 1;
const FILL = 2;
// Grand écran : part du défilement épinglé gardée en réserve au début et à la fin,
// pour que la frise complète reste un instant affichée avant de repartir
const HOLD_START = 0.04;
const HOLD_END = 0.18;

const clamp = (v: number) => Math.min(1, Math.max(0, v));

export function MethodTimeline({ etapes, head }: { etapes: Etape[]; head?: React.ReactNode }) {
  const pinRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const pin = pinRef.current;
    const sticky = stickyRef.current;
    const list = listRef.current;
    if (!pin || !sticky || !list || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = Array.from(list.children) as HTMLElement[];
    const mq = window.matchMedia(COMPACT);
    const unit = LIGHT + FILL;
    const total = items.length * unit;
    let frame = 0;

    // Progression de 0 à 1
    const progress = () => {
      const vh = window.innerHeight;
      if (mq.matches) {
        // Vertical : le haut de la frise à 90 % de l'écran → son bas à 35 %
        const rect = list.getBoundingClientRect();
        const start = vh * 0.9;
        const end = vh * 0.35;
        return clamp((start - rect.top) / (rect.height + start - end));
      }
      // Horizontal : avancée dans la zone épinglée
      const stickyTop = parseFloat(getComputedStyle(sticky).top) || 0;
      const range = pin.offsetHeight - sticky.offsetHeight;
      const p = range > 0 ? clamp((stickyTop - pin.getBoundingClientRect().top) / range) : 1;
      return clamp((p - HOLD_START) / (1 - HOLD_START - HOLD_END));
    };

    const update = () => {
      frame = 0;
      const u = progress() * total;
      items.forEach((li, i) => {
        const lit = clamp(u - i * unit);
        li.style.setProperty("--lit", lit.toFixed(3));
        li.style.setProperty("--fill", clamp((u - i * unit - LIGHT) / FILL).toFixed(3));
        li.classList.toggle("is-lit", lit >= 1);
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    pin.classList.add("is-pinned");
    list.classList.add("is-scroll-driven");
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mq.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mq.removeEventListener("change", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="steps-pin" ref={pinRef}>
      <div className="steps-sticky" ref={stickyRef}>
        {head}
        <ol className="steps" ref={listRef}>
          {etapes.map((e, i) => (
            <li key={e.titre}>
              <div className="step-head">
                <span className="step-num">
                  <small>Étape</small>
                  <b>{String(i + 1).padStart(2, "0")}</b>
                </span>
                <span className="step-line" aria-hidden="true">
                  <span />
                </span>
              </div>
              <div className="step-body">
                <h3>{e.titre}</h3>
                <p>{e.texte}</p>
                <em>{e.note}</em>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
