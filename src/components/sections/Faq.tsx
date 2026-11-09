"use client";

import { useId, useState } from "react";
import { FAQ } from "@/data/faq";
import { Icon } from "../ui/Icon";

/* Accordéon : une seule réponse ouverte à la fois.
   La hauteur s'anime en CSS (grid-template-rows 0fr → 1fr), sans mesure en JavaScript. */
export function Faq() {
  const [ouvert, setOuvert] = useState<number | null>(0);
  const uid = useId();

  return (
    <section className="section section-tight" id="faq">
      <div className="container container-narrow">
        <div className="section-head center">
          <span className="eyebrow">Questions fréquentes</span>
          <h2 className="h2-sm">Vous avez une question ? Nous avons la réponse</h2>
        </div>
        <div className="faq">
          {FAQ.map((item, i) => {
            const open = ouvert === i;
            const qId = `${uid}-q${i}`;
            const rId = `${uid}-r${i}`;
            return (
              <div key={item.question} className={`faq-item${open ? " is-open" : ""}`}>
                <h3 className="faq-title">
                  <button
                    type="button"
                    id={qId}
                    className="faq-q"
                    aria-expanded={open}
                    aria-controls={rId}
                    onClick={() => setOuvert(open ? null : i)}
                  >
                    {item.question}
                    <span className="faq-icon">
                      <Icon name="plus" />
                    </span>
                  </button>
                </h3>
                <div id={rId} className="faq-panel" role="region" aria-labelledby={qId} inert={!open}>
                  <div className="faq-inner">
                    <p>{item.reponse}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
