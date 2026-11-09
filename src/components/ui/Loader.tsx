"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

/* Loader d'ouverture : « +30 ans d'expérience ».
   1. Un anneau se remplit pendant qu'une lumière tourne autour ; au centre, le chiffre monte de 0 à 30.
      Les trois métiers s'allument à 10, 20 et 30.
   2. À la fin, le « +30 » quitte le loader et vient se poser à sa place dans le hero
      (élément [data-hero-counter]) pendant que le fond s'efface. Si cette place n'est pas
      visible à l'écran (mobile, page rechargée plus bas), le « +30 » s'efface simplement.
   - Phase 1 en CSS pur : elle démarre avant même le chargement du JavaScript.
   - Le loader reste au moins MIN_MS (le temps du compteur), puis part dès que la page est prête (au plus MAX_MS).
   - Sécurité : sans JavaScript, le CSS le fait disparaître seul après 5,5 s.
   - Désactivé si prefers-reduced-motion.
   Au début de l'atterrissage, il prévient le reste du site (onSiteReady) : entrée du hero, compteurs. */

const MIN_MS = 2400;
const MAX_MS = 4000;
const LAND_MS = 900;
const READY_EVENT = "codisco:ready";

declare global {
  interface Window {
    __codiscoReady?: boolean;
  }
}

/** Appelle `fn` quand le loader a terminé (immédiatement s'il a déjà terminé). */
export function onSiteReady(fn: () => void) {
  if (window.__codiscoReady) {
    fn();
    return () => {};
  }
  window.addEventListener(READY_EVENT, fn, { once: true });
  return () => window.removeEventListener(READY_EVENT, fn);
}

function markReady() {
  if (window.__codiscoReady) return;
  window.__codiscoReady = true;
  document.body.dataset.ready = "true";
  window.dispatchEvent(new Event(READY_EVENT));
}

/** Fait voler le « +30 » du loader jusqu'à sa place dans le hero. Renvoie false si c'est impossible. */
function flyToHero(source: HTMLElement): Animation | null {
  const target = document.querySelector<HTMLElement>("[data-hero-counter]");
  if (!target) return null;
  const from = source.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  const header = document.querySelector("header")?.getBoundingClientRect().bottom ?? 0;
  const visible = to.top >= header && to.bottom <= window.innerHeight && to.width > 0;
  if (!visible || from.height === 0) return null;

  // Échelle = rapport des tailles de police ; alignement sur le bord gauche et le centre vertical
  const targetStyle = getComputedStyle(target);
  const scale = parseFloat(targetStyle.fontSize) / parseFloat(getComputedStyle(source).fontSize);
  const dx = to.left - from.left;
  const dy = to.top + to.height / 2 - (from.top + (from.height * scale) / 2);
  target.style.visibility = "hidden";
  const anim = source.animate(
    [
      { transform: "translate(0, 0) scale(1)" },
      { transform: `translate(${dx}px, ${dy}px) scale(${scale})`, color: targetStyle.color },
    ],
    { duration: LAND_MS, easing: "cubic-bezier(0.65, 0, 0.35, 1)", fill: "forwards" },
  );
  anim.finished.finally(() => {
    target.style.visibility = "";
  });
  return anim;
}

export function Loader() {
  const [state, setState] = useState<"visible" | "landing" | "gone">("visible");
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      markReady();
      const raf = requestAnimationFrame(() => setState("gone"));
      return () => cancelAnimationFrame(raf);
    }
    const t0 = performance.now();
    let leaveTimer = 0;
    let goneTimer = 0;

    const leave = () => {
      if (leaveTimer) return;
      const wait = Math.max(0, MIN_MS - (performance.now() - t0));
      leaveTimer = window.setTimeout(() => {
        setState("landing");
        markReady();
        const count = countRef.current;
        const anim = count ? flyToHero(count) : null;
        if (anim) anim.finished.then(() => setState("gone")).catch(() => setState("gone"));
        else {
          // Cible hors écran : le « +30 » s'efface sur place avec le reste
          count?.animate([{ opacity: 1 }, { opacity: 0, transform: "scale(0.85)" }], {
            duration: 450,
            easing: "ease-out",
            fill: "forwards",
          });
          goneTimer = window.setTimeout(() => setState("gone"), LAND_MS);
        }
      }, wait);
    };

    if (document.readyState === "complete") leave();
    else window.addEventListener("load", leave, { once: true });
    const maxTimer = window.setTimeout(leave, MAX_MS);

    return () => {
      window.removeEventListener("load", leave);
      clearTimeout(maxTimer);
      clearTimeout(leaveTimer);
      clearTimeout(goneTimer);
    };
  }, []);

  if (state === "gone") return null;

  return (
    <div className={`loader${state === "landing" ? " is-landing" : ""}`} role="status" aria-label="Chargement du site">
      <div className="loader-bg" />
      <div className="loader-inner">
        <div className="loader-ring">
          {/* Lumière qui tourne en continu derrière l'anneau */}
          <span className="loader-sweep" aria-hidden="true" />
          <svg viewBox="0 0 200 200" aria-hidden="true">
            <circle className="ring-track" cx="100" cy="100" r="88" />
            <circle className="ring-arc" cx="100" cy="100" r="88" />
            {/* Tête lumineuse au bout de l'anneau */}
            <g className="ring-comet">
              <circle cx="100" cy="12" r="9" className="ring-comet-glow" />
              <circle cx="100" cy="12" r="4.5" className="ring-comet-dot" />
            </g>
          </svg>
          <span className="loader-count" ref={countRef} aria-hidden="true" />
        </div>
        <p className="loader-label">Ans d&apos;expérience au Congo</p>
        <ul className="loader-metiers" aria-hidden="true">
          <li>
            <span>
              <Icon name="building" />
            </span>
            Travaux
          </li>
          <li>
            <span>
              <Icon name="snow" />
            </span>
            Climatisation
          </li>
          <li>
            <span>
              <Icon name="shield" />
            </span>
            Hygiène 3D
          </li>
        </ul>
      </div>
    </div>
  );
}
