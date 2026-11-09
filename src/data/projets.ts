/* =========================================================
   Réalisations : une entrée par projet.
   Ajouter un projet = ajouter un objet ici, sans toucher aux composants.
   - slug : identifiant unique, sert d'ancre partageable (#projet-slug)
   - service : sert aux filtres
   - photos : chemins dans public/ (ex. "/images/projets/mon-projet-1.webp") ;
     la première sert de vignette et de grande image du tiroir
   Les 4 fiches ci-dessous sont des MODÈLES à remplacer par les vrais projets.
   ========================================================= */

export type ServiceKey = "travaux" | "climatisation" | "hygiene" | "contrat";

export type Projet = {
  slug: string;
  service: ServiceKey;
  serviceLabel: string;
  client: string;
  titre: string;
  resume: string;
  lieu: string;
  annee: string;
  contexte: string;
  realisation: string;
  resultat: string;
  photos: string[];
};

export const FILTRES: { key: ServiceKey | "tous"; label: string }[] = [
  { key: "tous", label: "Tous" },
  { key: "travaux", label: "Travaux et maintenance" },
  { key: "climatisation", label: "Climatisation et réfrigération" },
  { key: "hygiene", label: "Hygiène 3D" },
  { key: "contrat", label: "Contrat global" },
];

export const PROJETS: Projet[] = [
  {
    slug: "modele-travaux",
    service: "travaux",
    serviceLabel: "Travaux et maintenance",
    client: "Nom du client",
    titre: "Titre du projet",
    resume: "Deux lignes pour décrire l'intervention réalisée et le résultat obtenu pour le client.",
    lieu: "Pointe-Noire",
    annee: "2026",
    contexte: "Le besoin du client, la situation de départ et les contraintes du site.",
    realisation: "Ce que les équipes CODISCO GIBAT ont fait : corps de métier mobilisés, délais, méthodes.",
    resultat: "Le résultat concret pour le client : mise en service, gain, continuité d'activité.",
    photos: [],
  },
  {
    slug: "modele-climatisation",
    service: "climatisation",
    serviceLabel: "Climatisation et réfrigération",
    client: "Nom du client",
    titre: "Titre du projet",
    resume: "Deux lignes pour décrire l'intervention réalisée et le résultat obtenu pour le client.",
    lieu: "Pointe-Noire",
    annee: "2026",
    contexte: "Le besoin du client, la situation de départ et les contraintes du site.",
    realisation: "Ce que les équipes CODISCO GIBAT ont fait : études, installation, mise en service.",
    resultat: "Le résultat concret pour le client.",
    photos: [],
  },
  {
    slug: "modele-hygiene",
    service: "hygiene",
    serviceLabel: "Hygiène 3D",
    client: "Nom du client",
    titre: "Titre du projet",
    resume: "Deux lignes pour décrire l'intervention réalisée et le résultat obtenu pour le client.",
    lieu: "Pointe-Noire",
    annee: "2026",
    contexte: "Le besoin du client, la situation de départ et les contraintes du site.",
    realisation: "Traitement réalisé, produits agréés, robot TEINOVA si utilisé.",
    resultat: "Le résultat concret et les certificats remis.",
    photos: [],
  },
  {
    slug: "modele-contrat",
    service: "contrat",
    serviceLabel: "Contrat global",
    client: "Nom du client",
    titre: "Titre du projet",
    resume: "Deux lignes pour décrire l'intervention réalisée et le résultat obtenu pour le client.",
    lieu: "Pointe-Noire",
    annee: "2026",
    contexte: "Le périmètre du contrat : sites, équipements, corps de métier couverts.",
    realisation: "Organisation de la maintenance préventive et curative, astreinte, rapports sur tablette.",
    resultat: "Le résultat concret pour le client.",
    photos: [],
  },
];
