"use client";

import { Fragment, useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Icon } from "../ui/Icon";

/* Services : une seule structure, deux présentations.
   - Grand écran : titres à gauche, la carte du service ouvert à droite (grille CSS).
   - Petit écran (≤ 900 px) : accordéon, la carte s'ouvre juste sous son titre et décale les suivants.
   Chaque titre est un bouton aria-expanded qui contrôle sa région : modèle accessible dans les deux cas.
   Les liens #service-xxx (pied de page) ouvrent directement le bon service. */

export type ServiceItem = {
  id: string;
  num: string;
  titre: string;
  sous: string;
  content: React.ReactNode;
};

const COMPACT = "(max-width: 900px)";

function useCompact() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(COMPACT);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(COMPACT).matches,
    () => false,
  );
}

export function ServicesTabs({ items, aside }: { items: ServiceItem[]; aside?: React.ReactNode }) {
  const compact = useCompact();
  const [open, setOpen] = useState<string | null>(items[0].id);
  // Sur grand écran, une carte est toujours affichée
  const active = open ?? (compact ? null : items[0].id);
  const rootRef = useRef<HTMLDivElement>(null);
  const headRefs = useRef<Record<string, HTMLHeadingElement | null>>({});

  const reveal = useCallback(
    (id: string) => {
      const target = compact ? headRefs.current[id] : rootRef.current;
      requestAnimationFrame(() => target?.scrollIntoView({ behavior: "smooth", block: "start" }));
    },
    [compact],
  );

  const toggle = (id: string) => {
    if (!compact) return setOpen(id);
    const next = open === id ? null : id;
    setOpen(next);
    if (next) reveal(id);
  };

  // Lien #service-xxx : ouvrir le service puis le faire défiler à l'écran
  const syncHash = useCallback(() => {
    const id = window.location.hash.slice(1);
    if (!items.some((i) => i.id === id)) return;
    setOpen(id);
    reveal(id);
  }, [items, reveal]);

  useEffect(() => {
    const raf = requestAnimationFrame(syncHash); // lien partagé au chargement
    window.addEventListener("hashchange", syncHash);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", syncHash);
    };
  }, [syncHash]);

  return (
    <div className="services-card" ref={rootRef}>
      {items.map((t, i) => {
        const isOpen = active === t.id;
        return (
          <Fragment key={t.id}>
            <h3
              className="service-head"
              style={{ "--row": i + 1 } as React.CSSProperties}
              ref={(el) => {
                headRefs.current[t.id] = el;
              }}
            >
              <button
                type="button"
                id={`tab-${t.id}`}
                aria-expanded={isOpen}
                aria-controls={t.id}
                className={`service-tab${isOpen ? " is-active" : ""}`}
                onClick={() => toggle(t.id)}
              >
                <span className="tab-num">{t.num}</span>
                <span className="tab-text">
                  <strong>{t.titre}</strong>
                  <small>{t.sous}</small>
                </span>
                <span className="tab-arrow">
                  <Icon name="arrow" />
                </span>
              </button>
            </h3>
            <section
              id={t.id}
              role="region"
              aria-labelledby={`tab-${t.id}`}
              className={`service-panel${isOpen ? " is-active" : ""}`}
              hidden={!isOpen}
            >
              {t.content}
            </section>
          </Fragment>
        );
      })}
      {aside && <div className="services-aside-wrap">{aside}</div>}
    </div>
  );
}
