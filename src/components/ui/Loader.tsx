"use client";

import { useEffect, useState } from "react";

/* Loader d'ouverture : un climatiseur s'allume, ses volets s'ouvrent, l'air frais souffle
   et la température descend jusqu'à 18°.
   - Rendu par le serveur et animé en CSS pur : il s'affiche avant même le chargement du JavaScript.
   - Reste au moins MIN_MS, puis disparaît dès que la page est chargée (au plus MAX_MS).
   - Sécurité : si le JavaScript ne se charge pas, le CSS le fait disparaître seul après 4 s.
   - Désactivé si prefers-reduced-motion.
   À la fin, il prévient le reste du site (onSiteReady) : entrée du hero, compteurs. */

const MIN_MS = 1600;
const MAX_MS = 3200;
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

export function Loader() {
  const [state, setState] = useState<"visible" | "leaving" | "gone">("visible");

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
        setState("leaving");
        markReady();
        goneTimer = window.setTimeout(() => setState("gone"), 700);
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
    <div className={`loader${state === "leaving" ? " is-leaving" : ""}`} role="status" aria-label="Chargement du site">
      <div className="loader-inner">
        <svg className="loader-ac" viewBox="0 0 240 150" aria-hidden="true">
          {/* Unité murale */}
          <rect className="ac-body" x="10" y="8" width="220" height="70" rx="16" />
          <rect className="ac-grille" x="26" y="20" width="120" height="4" rx="2" />
          <rect className="ac-grille" x="26" y="30" width="96" height="4" rx="2" />
          {/* Afficheur de température */}
          <rect className="ac-screen" x="166" y="20" width="46" height="24" rx="6" />
          <circle className="ac-led" cx="178" cy="58" r="3" />
          {/* Volet qui s'ouvre */}
          <rect className="ac-flap" x="22" y="66" width="196" height="8" rx="4" />
          {/* Souffle d'air frais */}
          <g className="ac-air">
            <path d="M60 92 q10 10 0 20 t0 20" />
            <path d="M100 92 q10 10 0 20 t0 20" />
            <path d="M140 92 q10 10 0 20 t0 20" />
            <path d="M180 92 q10 10 0 20 t0 20" />
          </g>
        </svg>
        <span className="loader-temp" aria-hidden="true" />
        <p className="loader-brand">
          CODISCO <span>GIBAT</span>
        </p>
        <span className="loader-bar" aria-hidden="true">
          <span />
        </span>
      </div>
    </div>
  );
}
