import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Contract } from "@/components/sections/Contract";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Method } from "@/components/sections/Method";
import { Realisations } from "@/components/sections/Realisations";
import { Services } from "@/components/sections/Services";
import { SiteProvider } from "@/components/SiteProvider";
import { IconSprite } from "@/components/ui/Icon";
import { Loader } from "@/components/ui/Loader";
import { Marquee } from "@/components/ui/Marquee";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { CONTACT, SITE, SITE_URL } from "@/data/site";

/* Le one-page : l'ordre des sections suit la maquette VA (voir design/sections/). */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE.nom,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/images/logo-codisco-gibat.png`,
  image: `${SITE_URL}${SITE.partage.image}`,
  description: "Travaux et maintenance des infrastructures, climatisation et réfrigération, hygiène 3D.",
  telephone: CONTACT.telephones.map((t) => t.lien),
  address: {
    "@type": "PostalAddress",
    streetAddress: `${CONTACT.adresse.rue}, ${CONTACT.adresse.zone}`,
    addressLocality: CONTACT.adresse.ville,
    addressCountry: CONTACT.adresse.pays,
  },
  areaServed: ["Pointe-Noire", "Brazzaville", "République du Congo"],
  openingHours: "Mo-Su 00:00-23:59",
};

export default function Home() {
  return (
    <SiteProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Loader />
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <IconSprite />
      <Header />

      <main id="contenu">
        <Hero />
        <div className="ticker" aria-label="Nos domaines d'intervention">
          <Marquee
            className="ticker-track"
            items={["Travaux et maintenance", "Climatisation et réfrigération", "Hygiène 3D", "Onshore & offshore", "De Pointe-Noire à Brazzaville"]}
          />
        </div>
        <Services />
        <About />
        <Realisations />
        <Contract />
        <Method />
        <Faq />
        <Contact />
      </main>

      <Footer />
      <RevealOnScroll />
    </SiteProvider>
  );
}
