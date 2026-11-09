import Image from "next/image";
import { CONTACT } from "@/data/site";
import { ContactLink } from "../ui/ContactLink";
import { CurrentYear } from "../ui/CurrentYear";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Image src="/images/logo-codisco-gibat.png" alt="CODISCO GIBAT" width={80} height={80} />
          <p>
            3 services, 1 seul interlocuteur. Travaux et maintenance, climatisation et réfrigération, hygiène 3D,
            depuis plus de 30 ans.
          </p>
          <div className="socials">
            <span>Suivez-nous</span>
            <a href={CONTACT.reseaux.linkedin} aria-label="LinkedIn">in</a>
            <a href={CONTACT.reseaux.facebook} aria-label="Facebook">f</a>
          </div>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            <li><a href="#service-travaux">Travaux et maintenance</a></li>
            <li><a href="#service-clim">Climatisation et réfrigération</a></li>
            <li><a href="#service-hygiene">Hygiène 3D</a></li>
            <li><a href="#contrat">Contrat global</a></li>
            <li><a href="#service-clim">Robot nettoyeur TEINOVA</a></li>
          </ul>
        </div>
        <div>
          <h4>Entreprise</h4>
          <ul>
            <li><a href="#a-propos">À propos de nous</a></li>
            <li><a href="#realisations">Nos réalisations</a></li>
            <li><a href="#references">Nos références</a></li>
            <li><a href="#a-propos">Onshore et offshore</a></li>
            <li><ContactLink objet="Candidature">Recrutement et ateliers</ContactLink></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>41 av. Jean Marie Mavoungou</li>
            <li>ZI de la Foire, Pointe-Noire</li>
            {CONTACT.telephones.map((t) => (
              <li key={t.lien}><a href={`tel:${t.lien}`}>{t.affichage}</a></li>
            ))}
            <li><a className="footer-link-strong" href="#contact">Nous contacter →</a></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>
          © <CurrentYear /> CODISCO GIBAT · Réalisé par sOmedia
        </p>
        <p>
          {/* À rédiger : peuvent s'ouvrir dans le même tiroir que les projets */}
          <a href="#">Mentions légales</a>
          <a href="#">Politique de confidentialité</a>
        </p>
      </div>
    </footer>
  );
}
