/* =========================================================
   Réalisations : une entrée par projet.
   Ajouter un projet = ajouter un objet ici, sans toucher aux composants.
   - slug : identifiant unique, sert d'ancre partageable (#projet-slug)
     et de nom de dossier pour les médias :
       public/images/projets/<slug>/<slug>-01.webp, <slug>-02.webp…
       public/videos/projets/<slug>/01.mp4 (+ 01.webp pour la vignette)
   - service : range le projet dans sa ligne de métier (voir LIGNES) ;
     une ligne sans projet n'est pas affichée
   - ordre : dans chaque ligne, les projets apparaissent dans l'ordre de PROJETS
     (mettre les plus récents en tête)
   - photos : la première sert de vignette et de grande image du tiroir
   - annee : facultative, n'est affichée que si elle est renseignée
   - videos : facultatives, affichées dans le tiroir sous le texte
   ========================================================= */

export type ServiceKey = "travaux" | "climatisation" | "hygiene" | "contrat";

export type ProjetVideo = {
  src: string;
  poster: string;
  /** vidéo tournée à la verticale (téléphone) */
  portrait?: boolean;
};

export type Projet = {
  slug: string;
  service: ServiceKey;
  serviceLabel: string;
  client: string;
  titre: string;
  resume: string;
  lieu: string;
  annee?: string;
  contexte: string;
  realisation: string;
  resultat: string;
  photos: string[];
  videos?: ProjetVideo[];
};

/* Lignes de la section Réalisations : une ligne par métier, chacune avec son slider */
export const LIGNES: { key: string; label: string; services: ServiceKey[] }[] = [
  { key: "climatisation", label: "Climatisation et réfrigération", services: ["climatisation"] },
  { key: "hygiene", label: "Hygiène 3D", services: ["hygiene"] },
  { key: "autres", label: "Travaux, maintenance et contrats globaux", services: ["travaux", "contrat"] },
];

/* Chemins des photos d'un projet : public/images/projets/<slug>/<slug>-01.webp … */
const photos = (slug: string, n: number) =>
  Array.from(
    { length: n },
    (_, i) => `/images/projets/${slug}/${slug}-${String(i + 1).padStart(2, "0")}.webp`,
  );

export const PROJETS: Projet[] = [
  {
    slug: "total-energies-djeno-local-four",
    service: "climatisation",
    serviceLabel: "Climatisation et réfrigération",
    client: "TotalEnergies",
    titre: "Climatisation du local électrique de la salle convertisseur du four, raffinerie de Djéno",
    resume:
      "Étude, conception, fabrication et mise en œuvre du réseau aéraulique qui climatise le local électrique de la salle convertisseur du four.",
    lieu: "Raffinerie de Djéno",
    annee: "2025",
    contexte:
      "À la raffinerie TotalEnergies de Djéno, le local électrique de la salle convertisseur du four abrite des armoires électriques qui doivent être maintenues au frais. TotalEnergies a confié à CODISCO GIBAT l'installation d'un système de climatisation aéraulique dédié.",
    realisation:
      "Étude et conception du réseau aéraulique, puis fabrication et installation : groupes de production posés à l'extérieur du local, armoires de climatisation à l'intérieur, réseau de gaines et raccordements, jusqu'à la mise en œuvre complète du système.",
    resultat:
      "Le local électrique de la salle convertisseur dispose d'une climatisation aéraulique conçue, fabriquée et installée par CODISCO GIBAT.",
    photos: photos("total-energies-djeno-local-four", 5),
  },
  {
    slug: "total-energies-batiment-x4",
    service: "climatisation",
    serviceLabel: "Climatisation et réfrigération",
    client: "TotalEnergies",
    titre: "Installation des réseaux aérauliques du bâtiment X4",
    resume:
      "Levage des unités de traitement d'air en toiture et installation des réseaux aérauliques du bâtiment X4 de TotalEnergies.",
    lieu: "Pointe-Noire",
    contexte:
      "TotalEnergies a confié à CODISCO GIBAT l'installation des réseaux aérauliques de son bâtiment X4. Les nouvelles unités de traitement d'air devaient être hissées sur la toiture d'un site en activité, dans le respect des règles de sécurité du client.",
    realisation:
      "Acheminement des unités par camion plateau, levage à la grue jusqu'à la toiture, montage des supports métalliques, puis pose et raccordement des gaines par nos techniciens, sur échafaudage et dans une zone balisée.",
    resultat:
      "Les unités de traitement d'air sont en place sur la toiture et les réseaux aérauliques du bâtiment X4 sont installés.",
    photos: photos("total-energies-batiment-x4", 8),
  },
  {
    slug: "borr-drilling-desinsectisation",
    service: "hygiene",
    serviceLabel: "Hygiène 3D",
    client: "Borr Drilling",
    titre: "Désinsectisation de la base industrielle",
    resume:
      "Traitement de la base industrielle de Borr Drilling contre les insectes et les termites : ateliers, entrepôts, bureaux et circulations.",
    lieu: "Pointe-Noire",
    contexte:
      "Borr Drilling a fait appel à CODISCO GIBAT pour traiter sa base industrielle contre les insectes nuisibles, dont des termites installés le long de certains murs. L'intervention devait couvrir des espaces très différents : ateliers, entrepôts, bureaux et escaliers extérieurs.",
    realisation:
      "Contrôle des équipements de protection et du matériel avant l'intervention, puis traitement zone par zone : pulvérisateurs à dos et nébulisation dans les ateliers et les entrepôts, traitement ciblé des galeries de termites, pulvérisation des bureaux et des sols. Les équipes portaient combinaison intégrale et masque respiratoire.",
    resultat:
      "L'ensemble de la base a été traité, des ateliers aux bureaux, y compris les murs attaqués par les termites.",
    photos: photos("borr-drilling-desinsectisation", 14),
  },
  {
    slug: "navire-tamesis-chambres-froides",
    service: "climatisation",
    serviceLabel: "Climatisation et réfrigération",
    client: "Dixstone",
    titre: "Remplacement de compresseur et réparation des chambres froides du navire Tamesis",
    resume:
      "Pour Dixstone, remplacement d'un compresseur et réparation des chambres froides positive et négative à bord du navire Tamesis.",
    lieu: "Navire Tamesis",
    contexte:
      "Les chambres froides positive et négative du navire Tamesis devaient être remises en état, avec le remplacement d'un compresseur. Dixstone a confié l'opération à CODISCO GIBAT, à mener à bord du navire.",
    realisation:
      "Dépose de l'ancien compresseur et pose du nouveau, brasage des raccordements frigorifiques, contrôle du circuit au manomètre, puis réparation des deux chambres froides.",
    resultat: "Un compresseur neuf en place et des chambres froides positive et négative réparées.",
    photos: photos("navire-tamesis-chambres-froides", 2),
  },
  {
    slug: "navire-prabha-compresseur",
    service: "climatisation",
    serviceLabel: "Climatisation et réfrigération",
    client: "Diamond SA",
    titre: "Démontage, réparation et remontage d'un compresseur sur le navire Prabha",
    resume:
      "Intervention à bord du navire Prabha pour Diamond SA : démontage, réparation et remontage d'un compresseur en salle des machines.",
    lieu: "Navire Prabha",
    contexte:
      "Diamond SA avait besoin d'une intervention sur un compresseur du navire Prabha. Le travail devait être mené à bord, en salle des machines, dans un espace restreint.",
    realisation:
      "Démontage du compresseur, réparation, puis remontage et raccordement par une équipe CODISCO GIBAT, en coordination avec l'équipage du navire.",
    resultat: "Le compresseur réparé a été remonté à bord du navire Prabha.",
    photos: photos("navire-prabha-compresseur", 2),
  },
  {
    slug: "tchilassi-groupes-condenseurs",
    service: "climatisation",
    serviceLabel: "Climatisation et réfrigération",
    client: "Immeuble Le Tchilassi",
    titre: "Traitement marin des groupes condenseurs de l'immeuble Le Tchilassi",
    resume:
      "Démontage en atelier d'un groupe condenseur pour lui appliquer un traitement marin, avant son installation sur l'immeuble Le Tchilassi.",
    lieu: "Pointe-Noire",
    contexte:
      "Dans le cadre de l'installation des groupes condenseurs de l'immeuble Le Tchilassi, les équipements allaient être exposés à l'air salin. Un traitement marin était nécessaire pour protéger leurs batteries et leurs composants contre la corrosion.",
    realisation:
      "Démontage du groupe condenseur dans l'atelier CODISCO : dépose des panneaux et des ventilateurs, puis accès aux batteries d'échange et aux composants internes pour appliquer le traitement marin, avant le remontage et l'installation sur site.",
    resultat: "Un groupe condenseur protégé contre la corrosion saline, prêt pour l'immeuble Le Tchilassi.",
    photos: photos("tchilassi-groupes-condenseurs", 3),
  },
];
