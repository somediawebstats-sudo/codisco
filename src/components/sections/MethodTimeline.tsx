"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "../ui/Icon";

/* Frise de la méthode.
   - Grand écran : pilotée par le défilement de la page. En descendant, l'étape 1 s'allume,
     sa jauge se remplit, puis l'étape 2 s'allume, etc.
   - Petit écran (≤ 900 px) : carrousel à faire glisser. L'allumage suit le glissement.
   Chaque étape reçoit deux variables CSS : --lit (allumage, 0 → 1) et --fill (jauge, 0 → 1).
   Sans JavaScript ou avec prefers-reduced-motion, tout est allumé. */

export type Etape = { titre: string; texte: string; note: string };

const COMPACT = "(max-width: 900px)";
// Grand écran : chaque étape occupe 1 unité d'allumage + 2 unités de jauge
const LIGHT = 1;
const FILL = 2;

const clamp = (v: number) => Math.min(1, Math.max(0, v));

export function MethodTimeline({ etapes }: { etapes: Etape[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = Array.from(list.children) as HTMLElement[];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mq = window.matchMedia(COMPACT);
    let frame = 0;
    let cleanup = () => {};

    const apply = (lit: (i: number) => number, fill: (i: number) => number) =>
      items.forEach((li, i) => {
        const l = reduce ? 1 : lit(i);
        li.style.setProperty("--lit", l.toFixed(3));
        li.style.setProperty("--fill", (reduce ? 1 : fill(i)).toFixed(3));
        li.classList.toggle("is-lit", l >= 1);
      });

    const listen = (target: EventTarget, update: () => void) => {
      const onScroll = () => {
        if (!frame) frame = requestAnimationFrame(update);
      };
      update();
      target.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      return () => {
        target.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    };

    // Grand écran : progression selon la position de la frise dans la page
    const pageMode = () => {
      const unit = LIGHT + FILL;
      const total = items.length * unit;
      return listen(window, () => {
        frame = 0;
        const vh = window.innerHeight;
        const rect = list.getBoundingClientRect();
        // Début : le haut de la frise à 90 % de l'écran. Fin : son bas à 35 %.
        const start = vh * 0.9;
        const end = vh * 0.35;
        const u = clamp((start - rect.top) / (rect.height + start - end)) * total;
        apply(
          (i) => clamp(u - i * unit),
          (i) => clamp((u - i * unit - LIGHT) / FILL),
        );
      });
    };

    // Petit écran : progression selon le glissement du carrousel
    const carouselMode = () =>
      listen(list, () => {
        frame = 0;
        const step = items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : 1;
        const max = list.scrollWidth - list.clientWidth;
        // En fin de course, la dernière carte ne peut pas s'aligner à gauche : on la considère atteinte
        const pos = list.scrollLeft >= max - 2 ? items.length - 1 : list.scrollLeft / step;
        setCurrent(Math.round(pos));
        apply(
          (i) => clamp(pos - i + 1),
          (i) => clamp(pos - i),
        );
      });

    const setup = () => {
      cleanup();
      cleanup = mq.matches ? carouselMode() : pageMode();
    };
    list.classList.add("is-scroll-driven");
    setup();
    mq.addEventListener("change", setup);
    return () => {
      mq.removeEventListener("change", setup);
      cleanup();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Carrousel : aller à une étape
  const goTo = (i: number) => {
    const list = listRef.current;
    if (!list) return;
    const items = Array.from(list.children) as HTMLElement[];
    const target = items[Math.max(0, Math.min(items.length - 1, i))];
    list.scrollTo({ left: target.offsetLeft - items[0].offsetLeft, behavior: "smooth" });
  };

  return (
    <div
      className="steps-wrap"
      role="region"
      aria-roledescription="carrousel"
      aria-label="Les 4 étapes de notre méthode"
    >
      <ol className="steps" ref={listRef}>
        {etapes.map((e, i) => (
          <li key={e.titre} aria-roledescription="étape" aria-label={`${i + 1} sur ${etapes.length}`}>
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

      {/* Navigation du carrousel (affichée sur petit écran uniquement) */}
      <div className="steps-nav">
        <button
          type="button"
          className="steps-arrow is-prev"
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          aria-label="Étape précédente"
        >
          <Icon name="arrow" />
        </button>
        <div className="steps-dots">
          {etapes.map((e, i) => (
            <button
              key={e.titre}
              type="button"
              className={i === current ? "is-current" : undefined}
              aria-label={`Aller à l'étape ${i + 1} : ${e.titre}`}
              aria-current={i === current ? "step" : undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className="steps-arrow"
          onClick={() => goTo(current + 1)}
          disabled={current === etapes.length - 1}
          aria-label="Étape suivante"
        >
          <Icon name="arrow" />
        </button>
      </div>
    </div>
  );
}
