import "server-only";
import nodemailer from "nodemailer";
import type { ContactData } from "./contact-schema";

/* Envoi des demandes du formulaire par SMTP authentifié.
   Configuration dans .env.local (voir .env.example). */

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } = process.env;

export const smtpConfigure = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS && CONTACT_TO);

export async function envoyerDemande(d: ContactData) {
  const port = Number(SMTP_PORT ?? 465);
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transport.sendMail({
    from: `CODISCO GIBAT <${CONTACT_FROM ?? SMTP_USER}>`,
    to: CONTACT_TO,
    replyTo: d.email,
    subject: `[Site] ${d.objet} · ${d.nom}`,
    text:
      "Nouvelle demande depuis le site CODISCO GIBAT\n\n" +
      `Objet : ${d.objet}\n` +
      `Nom et société : ${d.nom}\n` +
      `Email : ${d.email}\n` +
      `Téléphone : ${d.telephone}\n\n` +
      `Message :\n${d.message}\n`,
  });
}
