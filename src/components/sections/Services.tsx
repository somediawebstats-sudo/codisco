import Image from "next/image";
import { ContactLink } from "../ui/ContactLink";
import { Icon } from "../ui/Icon";
import { VideoButton } from "../ui/VideoButton";
import { ServicesTabs, type ServiceItem } from "./ServicesTabs";

/* Chaque carte : la photo occupe toute la hauteur à gauche, le texte à droite.
   Photos dans public/images/services/. Sans src, un bloc gris légendé s'affiche. */

/* position : cadrage de la photo (CSS object-position), utile quand le sujet n'est pas au centre */
function Media({ label, num, src, position }: { label: string; num: string; src?: string; position?: string }) {
  return (
    <div className="panel-media">
      {src ? (
        <Image src={src} alt={label} fill sizes="(max-width: 900px) 100vw, 480px" style={position ? { objectPosition: position } : undefined} />
      ) : (
        <div className="ph" data-label={label} />
      )}
      <span className="panel-media-num" aria-hidden="true">{num}</span>
    </div>
  );
}

const SERVICES: ServiceItem[] = [
  {
    id: "service-travaux",
    num: "01",
    titre: "Travaux et maintenance des infrastructures",
    sous: "Génie civil et second œuvre",
    content: (
      <>
        <Media num="01" src="/images/services/genie-civil-chantier.webp" label="Équipe CODISCO GIBAT montant une structure métallique sur un chantier" />
        <div className="panel-body">
          <span className="panel-tag">01 · Génie civil et second œuvre</span>
          <h3>Construire, rénover et entretenir vos infrastructures</h3>
          <p>
            Études et travaux de génie civil et de second œuvre pour le bâtiment et l&apos;industrie. Une seule équipe
            coordonne l&apos;ensemble des corps de métier, de l&apos;étude à la réception, puis assure la maintenance.
          </p>
          <ul className="chips chips-dark">
            {["Maçonnerie", "Carrelage", "Plomberie", "Électricité", "Luminaires", "Menuiserie", "Cloisonnage", "Étanchéité", "Peinture"].map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <ContactLink className="link-arrow" objet="Travaux et maintenance">
            Nous contacter <Icon name="arrow" />
          </ContactLink>
        </div>
      </>
    ),
  },
  {
    id: "service-clim",
    num: "02",
    titre: "Climatisation et réfrigération",
    sous: "HVAC / CVC",
    content: (
      <>
        <Media num="02" src="/images/services/climatisation-groupe-condenseur.webp" position="78% center" label="Technicien CODISCO GIBAT intervenant sur un groupe condenseur en atelier" />
        <div className="panel-body">
          <span className="panel-tag">02 · HVAC / CVC</span>
          <h3>Climatisation et réfrigération, de l&apos;étude à l&apos;astreinte</h3>
          <p>Notre bureau d&apos;études en génie énergétique conçoit vos installations.</p>
          <p>
            Nos équipes réalisent les travaux de maintenance préventive, prédictive et curative. Elles assurent le suivi et
            la maintenance des équipements.
          </p>
          <p><strong className="text-on-dark">Astreinte 24 h/24, 7 j/7, 365 j/an</strong></p>
          <ul className="spec-list">
            <li><strong>Systèmes eau glacée</strong> production et réseaux d&apos;eau glacée</li>
            <li><strong>Détente directe et VRV</strong> du split aux systèmes à débit variable</li>
            <li><strong>Aéraulique et hydraulique</strong> <span className="video-ref">Installation et maintenance</span> des réseaux de gaines et de conduites</li>
            <li><strong>Régulation</strong> pilotage et optimisation de vos installations</li>
            <li><strong>Cuisines professionnelles</strong> <span className="video-ref">Étude, installation et entretien</span></li>
            <li><strong>Traitement anti-marin</strong> protection des unités extérieures contre l&apos;air salin</li>
          </ul>
          <div className="highlight">
            <strong>Conteneurs frigorifiques (reefers)</strong>
            {/* À FAIRE VALIDER PAR LE CLIENT avant mise en ligne */}
            <p>
              Partenaire des armateurs locaux, CODISCO GIBAT assure 80 à 90 % des dépannages de reefers sur le port de
              Pointe-Noire.
            </p>
          </div>
          <p className="brands">
            Compte professionnel et représentant <strong>Daikin</strong> et <strong>Mitsubishi</strong>.
          </p>
          <VideoButton className="link-arrow" src="https://www.youtube-nocookie.com/embed/rEOw4nwfnQc" title="Robot TEINOVA">
            Voir la vidéo du robot TEINOVA <Icon name="arrow" />
          </VideoButton>
        </div>
      </>
    ),
  },
  {
    id: "service-hygiene",
    num: "03",
    titre: "Hygiène 3D",
    sous: "Désinsectisation, dératisation, désinfection",
    mention: "Fourni par LODI GROUPE",
    content: (
      <>
        <Media num="03" src="/images/services/hygiene-3d-technicien.webp" label="Technicien hygiène 3D en combinaison et masque, avec pulvérisateur" />
        <div className="panel-body">
          <span className="panel-tag">03 · Hygiène 3D, lutte antinuisible</span>
          <h3>Protéger vos sites, préserver l&apos;hygiène de vos installations</h3>
          <p className="provider">Fourni par <strong>LODI GROUPE</strong></p>
          <p>
            Lutte contre les nuisibles pour le résidentiel, les bâtiments, l&apos;industrie, la grande distribution, la
            restauration, les bases vie et les sites onshore et offshore. Agrément du ministère de l&apos;Environnement.
          </p>
          <ul className="chips chips-dark">
            {["Insectes volants", "Insectes rampants", "Rongeurs", "Chauves-souris", "Pigeons", "Serpents"].map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <ul className="spec-list">
            <li><strong>Gaines nettoyées par robot</strong> nettoyage et désinfection des gaines de climatisation avec notre robot TEINOVA</li>
            <li><strong>Hottes et extracteurs</strong> dégraissage et nettoyage des cuisines professionnelles</li>
            <li><strong>Certificats fournis</strong> certificats de passage et de traitement remis après chaque intervention</li>
          </ul>
          <ContactLink className="link-arrow" objet="Hygiène 3D">
            Nous contacter <Icon name="arrow" />
          </ContactLink>
        </div>
      </>
    ),
  },
];

export function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-head split">
          <div>
            <span className="eyebrow">Nos services</span>
            <h2 className="h2-sm">Trois expertises pour vos infrastructures</h2>
          </div>
          <p className="section-intro">
            Travaux et maintenance, climatisation et réfrigération, hygiène 3D : une seule équipe conçoit, réalise et
            maintient vos installations, onshore et offshore.
          </p>
        </div>

        <ServicesTabs
          items={SERVICES}
          aside={
            <a className="services-aside" href="#contrat">
              <span className="services-aside-icon"><Icon name="check" /></span>
              <strong>Besoin des trois métiers ?</strong>
              <span>Une offre globale couvre bâtiments, climatisation et hygiène, avec astreinte 24/7.</span>
              <span className="link-arrow">Découvrir l&apos;offre globale <Icon name="arrow" /></span>
            </a>
          }
        />
      </div>
    </section>
  );
}
