import { z } from "zod";

/* Règles du formulaire de contact, partagées entre le navigateur et l'API. */

export const OBJETS = [
  "Demande de devis",
  "Contrat global",
  "Travaux et maintenance",
  "Climatisation et réfrigération",
  "Hygiène 3D",
  "Partenariat",
  "Candidature",
  "Autre",
] as const;

export type Objet = (typeof OBJETS)[number];

// Champs courts : une seule ligne (empêche l'injection d'en-têtes dans l'email)
const ligne = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((v) => v.replace(/[\r\n]+/g, " "));

export const contactSchema = z.object({
  nom: ligne(200).pipe(z.string().min(1)),
  email: ligne(200).pipe(z.email()),
  telephone: ligne(40).pipe(z.string().regex(/^[0-9 +().]{6,40}$/)),
  objet: z.enum(OBJETS),
  message: z.string().trim().min(5).max(5000),
});

export type ContactData = z.infer<typeof contactSchema>;
