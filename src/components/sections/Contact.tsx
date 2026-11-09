import { CONTACT } from "@/data/site";
import { Icon } from "../ui/Icon";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const [tel1, tel2] = CONTACT.telephones;
  const { adresse } = CONTACT;

  return (
    <section className="section section-tight" id="contact">
      <div className="container">
        <div className="contact">
          <div className="contact-info">
            <span className="eyebrow eyebrow-on-dark">Contact direct</span>
            <h2 className="h2-sm">Parlons de votre projet ou de votre contrat de maintenance</h2>
            <p>
              Nos ingénieurs et chargés d&apos;affaires sont à votre disposition pour analyser vos besoins et vous
              proposer des solutions techniques fiables et pérennes.
            </p>
            <ul className="info-list">
              <li>
                <span className="info-icon"><Icon name="phone" /></span>
                <span>
                  <small>Téléphone direct</small>
                  <a href={`tel:${tel1.lien}`}>{tel1.affichage}</a> · <a href={`tel:${tel2.lien}`}>06 621 79 79</a>
                </span>
              </li>
              <li>
                <span className="info-icon"><Icon name="pin" /></span>
                <span>
                  <small>Siège social</small>
                  <a href={adresse.carte} target="_blank" rel="noopener">
                    {adresse.rue}, {adresse.zone}, {adresse.ville}
                  </a>
                </span>
              </li>
              <li>
                <span className="info-icon"><Icon name="map" /></span>
                <span><small>Zone d&apos;intervention</small>{CONTACT.zone}</span>
              </li>
              <li>
                <span className="info-icon"><Icon name="clock" /></span>
                <span><small>Astreinte</small>{CONTACT.astreinte}</span>
              </li>
            </ul>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
