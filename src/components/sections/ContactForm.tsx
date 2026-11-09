"use client";

import { useState } from "react";
import { OBJETS, type Objet } from "@/lib/contact-schema";
import { CONTACT } from "@/data/site";
import { useSite } from "../SiteProvider";
import { BtnArrow } from "../ui/Icon";

/* Formulaire de contact : validation dans le navigateur, puis envoi vers /api/contact
   (src/app/api/contact/route.ts), qui revalide et envoie l'email. */

type Statut = { message: string; ok: boolean } | null;

export function ContactForm() {
  const { objet, setObjet } = useSite();
  const [statut, setStatut] = useState<Statut>(null);
  const [envoi, setEnvoi] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    let valide = true;
    form.querySelectorAll<HTMLInputElement>("[required]").forEach((f) => {
      const ok = f.checkValidity() && f.value.trim() !== "";
      f.setAttribute("aria-invalid", String(!ok));
      if (!ok) valide = false;
    });
    if (!valide) {
      setStatut({ message: "Merci de compléter les champs obligatoires.", ok: false });
      return;
    }

    setEnvoi(true);
    setStatut({ message: "Envoi en cours...", ok: true });
    try {
      const res = await fetch("/api/contact", { method: "POST", body: new FormData(form) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      setObjet("");
      setStatut({ message: "Merci, votre demande est bien envoyée. Nous vous répondons sous 24 h.", ok: true });
    } catch {
      setStatut({
        message: `L'envoi n'a pas abouti. Appelez-nous au ${CONTACT.telephones[0].affichage} ou écrivez-nous sur WhatsApp.`,
        ok: false,
      });
    } finally {
      setEnvoi(false);
    }
  }

  return (
    <form className="contact-form" action="/api/contact" method="post" noValidate onSubmit={onSubmit}>
      <h3>Contactez-nous</h3>
      <p className="form-intro">
        Une question, un projet, un partenariat, une candidature ? Notre équipe vous répond sous 24 h.
      </p>
      <div className="form-grid">
        <label className="field">
          <span>Nom et société *</span>
          <input name="nom" type="text" autoComplete="name" placeholder="Ex : Jean Mavoungou, Société X" required />
        </label>
        <label className="field">
          <span>Email *</span>
          <input name="email" type="email" autoComplete="email" placeholder="nom@entreprise.com" required />
        </label>
        <label className="field">
          <span>Téléphone *</span>
          <input name="telephone" type="tel" autoComplete="tel" placeholder="+242 06 000 00 00" required />
        </label>
        <label className="field">
          <span>Objet de votre demande *</span>
          <select name="objet" required value={objet} onChange={(e) => setObjet(e.target.value as Objet)}>
            <option value="" disabled>
              Choisir
            </option>
            {OBJETS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label className="field field-full">
          <span>Votre message *</span>
          <textarea name="message" rows={5} placeholder="Décrivez votre projet, la localisation et le délai envisagé..." required />
        </label>
        {/* Piège anti-spam : champ invisible, doit rester vide */}
        <label className="hp" aria-hidden="true">
          Ne pas remplir
          <input name="site_web" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button className="btn btn-primary btn-block" type="submit" disabled={envoi}>
        Envoyer ma demande <BtnArrow />
      </button>
      <p
        className={`form-status${statut ? (statut.ok ? " is-ok" : " is-error") : ""}`}
        role="status"
        aria-live="polite"
      >
        {statut?.message}
      </p>
    </form>
  );
}
