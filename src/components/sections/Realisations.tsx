"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { LIGNES, PROJETS, type Projet } from "@/data/projets";
import { BtnArrow, Icon } from "../ui/Icon";
import { ProjectDrawer } from "./ProjectDrawer";

/* Une ligne de métier : titre, compteur, flèches et slider horizontal de fiches.
   Le défilement est natif (scroll-snap) : glisser au doigt, molette, flèches du clavier. */
function LigneProjets({ label, projets, onOpen }: { label: string; projets: Projet[]; onOpen: (slug: string) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [bords, setBords] = useState({ debut: true, fin: true });

  const majBords = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    setBords({ debut: t.scrollLeft <= 4, fin: t.scrollLeft + t.clientWidth >= t.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    majBords();
    window.addEventListener("resize", majBords);
    return () => window.removeEventListener("resize", majBords);
  }, [majBords]);

  const defiler = (sens: 1 | -1) => {
    const t = trackRef.current;
    const carte = t?.querySelector<HTMLElement>(".project-slide");
    if (!t || !carte) return;
    const pas = carte.offsetWidth + parseFloat(getComputedStyle(t).columnGap || "0");
    t.scrollBy({ left: sens * pas, behavior: "smooth" });
  };

  const navigable = !(bords.debut && bords.fin);

  return (
    <div className="project-row" role="region" aria-roledescription="carrousel" aria-label={`Réalisations : ${label}`}>
      <div className="project-row-head">
        <h3>
          {label} <span className="project-row-count">{projets.length} projet{projets.length > 1 ? "s" : ""}</span>
        </h3>
        {navigable && (
          <div className="project-row-nav">
            <button type="button" className="is-prev" onClick={() => defiler(-1)} disabled={bords.debut} aria-label="Projet précédent">
              <Icon name="arrow" />
            </button>
            <button type="button" onClick={() => defiler(1)} disabled={bords.fin} aria-label="Projet suivant">
              <Icon name="arrow" />
            </button>
          </div>
        )}
      </div>
      <div ref={trackRef} className="project-track" onScroll={majBords}>
        {projets.map((p) => (
          <article key={p.slug} className="project-slide">
            <a
              className="project-slide-media ph"
              href={`#projet-${p.slug}`}
              tabIndex={-1}
              aria-hidden="true"
              onClick={(e) => {
                e.preventDefault();
                onOpen(p.slug);
              }}
            >
              {p.photos[0] && <Image src={p.photos[0]} alt="" fill sizes="(max-width: 700px) 85vw, (max-width: 1100px) 45vw, 380px" />}
            </a>
            <div className="project-slide-body">
              <ul className="project-tags">
                <li>{p.client}</li>
                {p.annee && <li>{p.annee}</li>}
              </ul>
              <h4>{p.titre}</h4>
              <p>{p.resume}</p>
              <p className="project-meta">{p.lieu}</p>
              <a
                className="btn btn-primary btn-sm"
                href={`#projet-${p.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onOpen(p.slug);
                }}
              >
                Voir le projet <BtnArrow />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function Realisations() {
  const [ouvert, setOuvert] = useState<string | null>(null);

  const lignes = LIGNES.map((l) => ({ ...l, projets: PROJETS.filter((p) => l.services.includes(p.service)) })).filter(
    (l) => l.projets.length > 0,
  );

  return (
    <section className="section" id="realisations">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Nos réalisations</span>
          <h2>
            Des projets concrets,
            <br />
            sur le terrain
          </h2>
        </div>
        <div className="project-rows">
          {lignes.map((l) => (
            <LigneProjets key={l.key} label={l.label} projets={l.projets} onOpen={setOuvert} />
          ))}
        </div>
      </div>

      <ProjectDrawer slug={ouvert} onSlugChange={setOuvert} />
    </section>
  );
}
