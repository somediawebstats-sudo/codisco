"use client";

import { useEffect } from "react";

/* Apparition douce des blocs au défilement.
   - Les blocs déjà visibles au chargement ne sont jamais masqués (pas de clignotement).
   - Les blocs voisins apparaissent en cascade (délai calculé selon leur rang).
   - La frise de la méthode a sa propre animation, liée au défilement (MethodTimeline.tsx).
   - Désactivé si prefers-reduced-motion. */

const BLOCS = [
  ".section-head",
  ".services-card",
  ".about-visual",
  ".about-copy > *",
  ".filters",
  ".project",
  ".contract-copy > *",
  ".contract-visual",
  ".references",
  ".video-cta",
  ".faq-item",
  ".contact-info > *",
  ".contact-form",
  ".footer-grid > *",
].join(", ");

const STAGGER_MS = 90;
const MAX_DELAY_MS = 540;

export function RevealOnScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const below = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.92;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }),
      { rootMargin: "0px 0px -8% 0px" },
    );

    const blocs = Array.from(document.querySelectorAll<HTMLElement>(BLOCS)).filter(below);
    blocs.forEach((el) => {
      // Rang parmi les frères également animés, pour l'effet de cascade
      const siblings = el.parentElement
        ? Array.from(el.parentElement.children).filter((c) => blocs.includes(c as HTMLElement))
        : [];
      const rank = Math.max(0, siblings.indexOf(el));
      el.style.setProperty("--reveal-delay", `${Math.min(rank * STAGGER_MS, MAX_DELAY_MS)}ms`);
      el.classList.add("reveal");
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);
  return null;
}
