"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { PROJETS } from "@/data/projets";
import { BtnArrow, Icon } from "../ui/Icon";
import { ProjectPhoto } from "./Realisations";

/* Tiroir latéral d'un projet.
   - ancre partageable #projet-slug (un lien WhatsApp ouvre directement le projet)
   - bouton Retour du navigateur et touche Échap pour fermer
   - le focus clavier reste dans le tiroir tant qu'il est ouvert */

const DUREE = 420; // ms, identique à --dur-slow

export function ProjectDrawer({ slug, onSlugChange }: { slug: string | null; onSlugChange: (s: string | null) => void }) {
  const [affiche, setAffiche] = useState<string | null>(null); // projet rendu (reste le temps de l'animation)
  const [entre, setEntre] = useState(false); // vrai une image après l'ouverture, pour l'animation
  const panelRef = useRef<HTMLElement>(null);
  const lastFocus = useRef<Element | null>(null);
  const etaitOuvert = useRef(false);

  // Le projet reste affiché pendant l'animation de fermeture
  if (slug && slug !== affiche) setAffiche(slug);
  const visible = slug !== null && entre;

  // Synchronisation avec l'adresse : lien partagé, bouton Retour
  useEffect(() => {
    const sync = () => {
      const m = location.hash.match(/^#projet-(.+)$/);
      onSlugChange(m && PROJETS.some((p) => p.slug === decodeURIComponent(m[1])) ? decodeURIComponent(m[1]) : null);
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [onSlugChange]);

  // Ouverture / fermeture
  useEffect(() => {
    if (slug) {
      etaitOuvert.current = true;
      lastFocus.current = document.activeElement;
      document.body.classList.add("is-locked");
      if (location.hash !== `#projet-${slug}`) history.pushState({ projet: slug }, "", `#projet-${slug}`);
      const raf = requestAnimationFrame(() => {
        setEntre(true);
        panelRef.current?.focus();
      });
      return () => cancelAnimationFrame(raf);
    }
    if (!etaitOuvert.current) return;
    etaitOuvert.current = false;
    document.body.classList.remove("is-locked");
    if (location.hash.startsWith("#projet-")) history.pushState({}, "", location.pathname + location.search + "#realisations");
    (lastFocus.current as HTMLElement | null)?.focus({ preventScroll: true });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => {
      setAffiche(null);
      setEntre(false);
    }, reduce ? 0 : DUREE);
    return () => clearTimeout(t);
  }, [slug]);

  const close = () => onSlugChange(null);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") close();
    if (e.key === "Tab" && panelRef.current) {
      const f = Array.from(panelRef.current.querySelectorAll<HTMLElement>("a, button, [tabindex]:not([tabindex='-1'])"));
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const p = PROJETS.find((x) => x.slug === affiche);
  if (!p) return null;

  return createPortal(
    <div className={`drawer${visible ? " is-open" : ""}`} onKeyDown={onKeyDown}>
      <div className="drawer-backdrop" onClick={close} />
      <aside ref={panelRef} className="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="drawer-title" tabIndex={-1}>
        <button className="drawer-close" type="button" onClick={close} aria-label="Fermer le projet">
          <Icon name="close" />
        </button>
        <div className="drawer-content">
          <div className="drawer-gallery">
            {(p.photos.length ? p.photos : [null, null, null]).map((_, i) => (
              <ProjectPhoto key={i} projet={p} index={i} />
            ))}
          </div>
          <div className="drawer-body">
            <ul className="project-tags">
              <li>{p.serviceLabel}</li>
            </ul>
            <h2 id="drawer-title">{p.titre}</h2>
            <dl className="drawer-facts">
              <div><dt>Client</dt><dd>{p.client}</dd></div>
              <div><dt>Lieu</dt><dd>{p.lieu}</dd></div>
              <div><dt>Année</dt><dd>{p.annee}</dd></div>
            </dl>
            <h3>Le contexte</h3>
            <p>{p.contexte}</p>
            <h3>Ce que nous avons fait</h3>
            <p>{p.realisation}</p>
            <h3>Le résultat</h3>
            <p>{p.resultat}</p>
            <a className="btn btn-primary" href="#contact" onClick={close}>
              Nous contacter <BtnArrow />
            </a>
          </div>
        </div>
      </aside>
    </div>,
    document.body,
  );
}
