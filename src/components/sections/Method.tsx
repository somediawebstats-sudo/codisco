import { Icon } from "../ui/Icon";
import { VideoButton } from "../ui/VideoButton";
import { MethodTimeline, type Etape } from "./MethodTimeline";

const ETAPES: Etape[] = [
  { titre: "Votre demande", texte: "Prise en charge réactive de votre cahier des charges par nos experts techniques, par téléphone, WhatsApp ou email.", note: "Réponse sous 24 h" },
  { titre: "Visite technique", texte: "Déplacement sur site pour l'audit des installations, métrés précis, évaluation des risques et diagnostic des équipements.", note: "Sur site ou plateforme" },
  { titre: "Devis détaillé", texte: "Proposition financière et calendrier opérationnel clairs, sans coûts cachés, avec des options adaptées à votre budget.", note: "Chiffrage transparent" },
  { titre: "Intervention et suivi", texte: "Exécution selon les règles de l'art, contrôles qualité, rapport d'intervention transmis directement, certificats et contrat de maintenance.", note: "Conformité garantie" },
];

export function Method() {
  return (
    <section className="section" id="methode">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow eyebrow-dot">Notre méthode</span>
          <h2>
            Comment nous
            <br />
            intervenons
          </h2>
        </div>
        {/* Frise pilotée par le défilement : voir MethodTimeline.tsx */}
        <MethodTimeline etapes={ETAPES} />

        <div className="video-cta">
          <VideoButton
            className="play"
            src="/videos/equipes.mp4"
            title="Nos équipes sur le terrain"
            ariaLabel="Lire la vidéo : nos équipes sur le terrain"
          >
            <Icon name="play" />
          </VideoButton>
          <h2 className="h2-sm">Découvrez nos équipes sur le terrain</h2>
          <p>
            Plus de 30 années d&apos;exigence technique au service des grands noms de l&apos;industrie, du pétrole et de
            la logistique portuaire au Congo. Une présence humaine et experte à chaque étape.
          </p>
        </div>
      </div>
    </section>
  );
}
