import Image from "next/image";
import { ContactLink } from "../ui/ContactLink";
import { CountUp } from "../ui/CountUp";
import { BtnArrow, Icon } from "../ui/Icon";
import { Marquee } from "../ui/Marquee";

const AVANTAGES = [
  { titre: "Un seul interlocuteur", texte: "Un contact, une facture, un suivi centralisé pour tous les corps de métier." },
  { titre: "Des coûts maîtrisés", texte: "Des forfaits préventifs et curatifs, au besoin ou à la demande." },
  { titre: "Des budgets anticipés", texte: "La maintenance proactive vous aide à préparer vos budgets." },
  { titre: "Astreinte 24/7", texte: "Nos équipes interviennent jour et nuit." },
  { titre: "Rapports instantanés", texte: "Chaque intervention est consignée sur tablette et le rapport vous est transmis directement." },
];

/* Références clients : logos PNG dans public/images/references/ (sources dans design/references-sources/).
   Sans logo, le nom s'affiche en texte. À valider : l'accord de chaque marque avant la mise en ligne. */
const REFERENCES: { nom: string; logo?: string }[] = [
  { nom: "TotalEnergies", logo: "totalenergies-2021.png" },
  { nom: "Maersk", logo: "maersk.png" },
  { nom: "Congo Terminal", logo: "congo-terminal.png" },
  { nom: "CMA CGM", logo: "cma-cgm.png" },
  { nom: "Hapag-Lloyd", logo: "hapag-lloyd.png" },
  { nom: "Canal+", logo: "canal-plus-2023.png" },
  { nom: "Bralico", logo: "bralico.png" },
  { nom: "Brasco", logo: "brasco-logo.png" },
  { nom: "Egis Road", logo: "egis-road.png" },
  { nom: "CORAF", logo: "coraf.png" },
  { nom: "Laborex", logo: "laborex.png" },
];

export function Contract() {
  return (
    <section className="section section-tight" id="contrat">
      <div className="container">
        <div className="contract">
          <div className="contract-grid">
            <div className="contract-copy">
              <span className="eyebrow eyebrow-on-green">Notre offre phare</span>
              <h2>Un contrat global pour toutes vos installations</h2>
              <p className="contract-lead">
                Un seul contrat couvre la maintenance de vos bâtiments, de vos équipements de climatisation et de
                réfrigération, et l&apos;hygiène de vos sites.
              </p>
              <ul className="benefits">
                {AVANTAGES.map((a) => (
                  <li key={a.titre}>
                    <span className="check"><Icon name="check" /></span>
                    <span><strong>{a.titre}</strong>{a.texte}</span>
                  </li>
                ))}
              </ul>
              <div className="contract-actions">
                <ContactLink className="btn btn-navy" objet="Contrat global">
                  Parler de mon contrat <BtnArrow />
                </ContactLink>
                <span className="contract-stat">
                  <strong><CountUp to={30} prefix="+" suffix=" ans" /></strong>
                  <small>d&apos;expertise au service<br />des entreprises</small>
                </span>
              </div>
            </div>
            <div className="contract-visual">
              <div className="ph" data-label="Photo : technicien avec tablette de rapport" />
              <div className="contract-tag">
                <span>Astreinte 24 h/24, 7 j/7</span>
                <em>Incluse</em>
              </div>
            </div>
          </div>

          <div className="references" id="references">
            <p className="references-title">Ils nous font confiance, onshore et offshore</p>
            <Marquee className="references-track">
              {REFERENCES.map((r) => (
                <li key={r.nom}>
                  <span className={`ref-logo${r.logo ? "" : " is-text"}`}>
                    {r.logo ? (
                      <Image src={`/images/references/${r.logo}`} alt={r.nom} width={240} height={80} sizes="140px" />
                    ) : (
                      r.nom
                    )}
                  </span>
                </li>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
