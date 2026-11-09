/* =========================================================
   Informations générales du site : coordonnées, menu, liens.
   Modifier ici plutôt que dans les composants.
   ========================================================= */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.codisco-gibat.com";

export const SITE = {
  nom: "CODISCO GIBAT",
  titre: "CODISCO GIBAT · Travaux, climatisation et hygiène 3D au Congo",
  description:
    "CODISCO GIBAT : travaux et maintenance des infrastructures, climatisation et réfrigération, hygiène 3D. Un seul interlocuteur, onshore et offshore, de Pointe-Noire à Brazzaville, depuis plus de 30 ans.",
  partage: {
    titre: "CODISCO GIBAT · 3 services, 1 seul interlocuteur",
    description:
      "Travaux et maintenance, climatisation et réfrigération, hygiène 3D. De Pointe-Noire à Brazzaville, onshore et offshore.",
    image: "/images/og-image.jpg", // 1200 × 630, à ajouter dans public/images/
  },
};

export const CONTACT = {
  telephones: [
    { affichage: "+242 06 621 38 38", lien: "+242066213838" },
    { affichage: "+242 06 621 79 79", lien: "+242066217979" },
  ],
  // À vérifier : quel numéro est relié à WhatsApp
  whatsapp: "https://wa.me/242066213838",
  adresse: {
    rue: "41 avenue Jean Marie Mavoungou",
    zone: "Zone industrielle de la Foire",
    ville: "Pointe-Noire",
    pays: "CG",
    carte: "https://maps.google.com/?q=41+avenue+Jean+Marie+Mavoungou+Pointe-Noire",
  },
  zone: "De Pointe-Noire à Brazzaville, onshore et offshore",
  astreinte: "24 h/24, 7 j/7",
  reseaux: {
    linkedin: "https://www.linkedin.com/company/codisco-gibat/",
    facebook: "https://www.facebook.com/people/Codisco-Gibat/61582201768052/",
  },
};

export const MENU = [
  { href: "#accueil", label: "Accueil" },
  { href: "#services", label: "Nos services" },
  { href: "#realisations", label: "Réalisations" },
  { href: "#contrat", label: "Contrat global" },
  { href: "#references", label: "Références" },
];
