import Image from "next/image";
import { CountUp } from "../ui/CountUp";
import { BtnArrow, Icon } from "../ui/Icon";

export function About() {
  return (
    <section className="section about" id="a-propos">
      <div className="container about-grid">
        <div className="about-visual">
          <div className="ph about-img-back">
            <Image src="/images/a-propos/equipe-techniciens-codisco-gibat.webp" alt="Équipe CODISCO GIBAT en intervention dans une salle des machines" fill sizes="(max-width: 900px) 45vw, 260px" />
          </div>
          <div className="ph about-img-front">
            <Image src="/images/a-propos/levage-climatisation-site-totalenergies.webp" alt="Levage d'une unité de climatisation à la grue sur un site TotalEnergies" fill sizes="(max-width: 900px) 70vw, 420px" />
          </div>
          <div className="about-badge">
            <strong><CountUp to={30} prefix="+" /></strong>
            <span>ans d&apos;expérience<br />prouvée au Congo</span>
          </div>
        </div>
        <div className="about-copy">
          <span className="eyebrow">À propos de nous</span>
          <h2 className="h2-sm">Des experts de terrain reconnus pour leur savoir-faire</h2>
          <p>
            Nous fournissons des services techniques de haute qualité aux installations industrielles, tertiaires et
            pétrolières, de Pointe-Noire à Brazzaville. Nos équipes d&apos;ingénieurs et de techniciens congolais
            certifiés interviennent avec rigueur et réactivité pour assurer la continuité de vos activités.
          </p>
          <div className="mini-cards">
            <div className="mini-card">
              <span className="mini-icon is-amber"><Icon name="badge" /></span>
              <h3>Sécurité certifiée</h3>
              <p>Respect absolu des protocoles QHSE, habilitations électriques et plans de prévention des risques industriels.</p>
            </div>
            <div className="mini-card">
              <span className="mini-icon is-blue"><Icon name="shield" /></span>
              <h3>Agréments et conformité</h3>
              <p>Agrément officiel du ministère de l&apos;Environnement de la République du Congo.</p>
            </div>
          </div>
          <a className="btn btn-primary" href="#methode">
            En savoir plus sur nos engagements <BtnArrow />
          </a>
        </div>
      </div>
    </section>
  );
}
