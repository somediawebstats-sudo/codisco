"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { PROJETS, type Projet } from "@/data/projets";
import { BtnArrow, Icon } from "../ui/Icon";

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
          <Galerie key={p.slug} projet={p} />
          <div className="drawer-body">
            <ul className="project-tags">
              <li>{p.serviceLabel}</li>
            </ul>
            <h2 id="drawer-title">{p.titre}</h2>
            <dl className="drawer-facts">
              <div><dt>Client</dt><dd>{p.client}</dd></div>
              <div><dt>Lieu</dt><dd>{p.lieu}</dd></div>
              {p.annee && <div><dt>Année</dt><dd>{p.annee}</dd></div>}
            </dl>
            <h3>Le contexte</h3>
            <p>{p.contexte}</p>
            <h3>Ce que nous avons fait</h3>
            <p>{p.realisation}</p>
            <h3>Le résultat</h3>
            <p>{p.resultat}</p>
            {p.videos?.length ? (
              <>
                <h3>En vidéo, sur le chantier</h3>
                <div className="drawer-videos">
                  {p.videos.map((v) => (
                    <video
                      key={v.src}
                      className={v.portrait ? "is-portrait" : undefined}
                      src={v.src}
                      poster={v.poster}
                      controls
                      playsInline
                      preload="none"
                    />
                  ))}
                </div>
              </>
            ) : null}
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

/* Galerie en slider : une photo à la fois, hauteur limitée pour laisser le descriptif visible.
   Défilement natif (scroll-snap) : glisser au doigt sur mobile, flèches, vignettes ou touches ← →. */
function Galerie({ projet }: { projet: Projet }) {
  const photos = projet.photos;
  const n = photos.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const [actif, setActif] = useState(0);

  const aller = (k: number) => {
    const t = trackRef.current;
    if (!t || !n) return;
    const j = (k + n) % n;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    t.scrollTo({ left: j * t.clientWidth, behavior: reduce ? "auto" : "smooth" });
  };

  const onScroll = () => {
    const t = trackRef.current;
    if (!t) return;
    const j = Math.round(t.scrollLeft / t.clientWidth);
    if (j !== actif) setActif(j);
  };

  // La vignette active reste visible dans la bande
  useEffect(() => {
    const thumb = thumbsRef.current?.children[actif] as HTMLElement | undefined;
    const bande = thumbsRef.current;
    if (thumb && bande) bande.scrollTo({ left: thumb.offsetLeft - bande.clientWidth / 2 + thumb.clientWidth / 2, behavior: "smooth" });
  }, [actif]);

  if (!n) {
    return (
      <div className="drawer-gallery">
        <div className="gallery-stage"><div className="ph" data-label="Photo du projet" /></div>
      </div>
    );
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); aller(actif + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); aller(actif - 1); }
  };

  return (
    <div className="drawer-gallery" role="region" aria-roledescription="carrousel" aria-label="Photos du projet" onKeyDown={onKeyDown}>
      <div className="gallery-stage">
        <div ref={trackRef} className="gallery-track" onScroll={onScroll}>
          {photos.map((src, i) => (
            <div key={src} className="gallery-slide" aria-hidden={i !== actif}>
              <Image
                src={src}
                alt={i ? `${projet.titre}, photo ${i + 1}` : projet.titre}
                width={1600}
                height={1200}
                sizes="(max-width: 640px) 100vw, 640px"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
        {n > 1 && (
          <>
            <button type="button" className="gallery-nav is-prev" onClick={() => aller(actif - 1)} aria-label="Photo précédente">
              <Icon name="arrow" />
            </button>
            <button type="button" className="gallery-nav is-next" onClick={() => aller(actif + 1)} aria-label="Photo suivante">
              <Icon name="arrow" />
            </button>
            <span className="gallery-count" aria-live="polite">{actif + 1} / {n}</span>
          </>
        )}
      </div>
      {n > 1 && (
        <div ref={thumbsRef} className="gallery-thumbs">
          {photos.map((src, i) => (
            <button
              key={src}
              type="button"
              className={i === actif ? "is-active" : undefined}
              onClick={() => aller(i)}
              aria-label={`Voir la photo ${i + 1}`}
              aria-current={i === actif}
            >
              <Image src={src} alt="" width={160} height={120} sizes="72px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
