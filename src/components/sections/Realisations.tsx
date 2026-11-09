"use client";

import Image from "next/image";
import { useState } from "react";
import { FILTRES, PROJETS, type Projet, type ServiceKey } from "@/data/projets";
import { BtnArrow } from "../ui/Icon";
import { ProjectDrawer } from "./ProjectDrawer";

/* Photo du projet, ou bloc gris tant qu'elle n'est pas fournie */
export function ProjectPhoto({ projet, index = 0 }: { projet: Projet; index?: number }) {
  const src = projet.photos[index];
  if (!src) return <div className="ph" data-label="Photo du projet" />;
  return <Image src={src} alt={projet.titre} width={1600} height={1200} sizes="(max-width: 900px) 100vw, 50vw" />;
}

export function Realisations() {
  const [filtre, setFiltre] = useState<ServiceKey | "tous">("tous");
  const [ouvert, setOuvert] = useState<string | null>(null);

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
        <div className="filters" role="group" aria-label="Filtrer les réalisations">
          {FILTRES.map((f) => (
            <button key={f.key} type="button" aria-pressed={filtre === f.key} onClick={() => setFiltre(f.key)}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="projects">
          {PROJETS.map((p) => (
            <article key={p.slug} className="project" hidden={filtre !== "tous" && p.service !== filtre}>
              <div className="project-media ph">{p.photos[0] && <ProjectPhoto projet={p} />}</div>
              <div className="project-card">
                <ul className="project-tags">
                  <li>{p.serviceLabel}</li>
                  <li>{p.client}</li>
                </ul>
                <h3>{p.titre}</h3>
                <p>{p.resume}</p>
                <p className="project-meta">
                  {p.lieu}, {p.annee}
                </p>
                <a
                  className="btn btn-primary btn-sm"
                  href={`#projet-${p.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setOuvert(p.slug);
                  }}
                >
                  Voir le projet <BtnArrow />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ProjectDrawer slug={ouvert} onSlugChange={setOuvert} />
    </section>
  );
}
