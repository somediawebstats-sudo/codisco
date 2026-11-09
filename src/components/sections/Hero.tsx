import { CountUp } from "../ui/CountUp";
import { Icon } from "../ui/Icon";

/* Hero : volontairement sans bouton (voir docs/BRIEF-DEVELOPPEMENT.md §1).
   Animation « glitch » du visuel à développer (§4.2), images dans public/images/hero/. */
export function Hero() {
  return (
    <section className="hero" id="accueil">
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1 className="display">
            3 services,
            <br />
            <span className="text-green">1 seul interlocuteur.</span>
          </h1>
          <p className="lead">
            Travaux et maintenance des infrastructures, climatisation et réfrigération, hygiène 3D. CODISCO GIBAT
            conçoit, réalise et maintient les installations des entreprises, onshore et offshore, de Pointe-Noire à
            Brazzaville.
          </p>
          <ul className="hero-stats">
            <li>
              <span className="stat-icon"><Icon name="history" /></span>
              <span><strong><CountUp to={30} prefix="+" suffix=" ans" /></strong><small>d&apos;expérience au Congo</small></span>
            </li>
            <li>
              <span className="stat-icon is-blue"><Icon name="shield" /></span>
              <span><strong>24/7</strong><small>astreinte, à tout moment</small></span>
            </li>
          </ul>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-halo" />
          <div className="hero-portrait ph" data-label="Portrait détouré : technicien(ne) CODISCO en EPI" />
          {/* Les étiquettes changeront avec les objets de l'animation glitch */}
          <div className="float-badge badge-top">
            <span className="badge-icon"><Icon name="badge" /></span>
            <span><small>Agrément officiel</small><strong>Santé et Environnement</strong></span>
          </div>
          <div className="float-badge badge-bottom">
            <span className="badge-icon is-green"><Icon name="headset" /></span>
            <span><small>Astreinte</small><strong>Intervention 24 h/24, 7 j/7</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
}
