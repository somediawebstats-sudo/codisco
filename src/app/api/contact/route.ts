import { contactSchema } from "@/lib/contact-schema";
import { envoyerDemande, smtpConfigure } from "@/lib/mailer";

/* Réception du formulaire de contact (remplace l'ancien api/contact.php). */

export async function POST(request: Request) {
  const form = await request.formData();

  // Piège anti-robot : ce champ invisible doit rester vide
  if (form.get("site_web")) return Response.json({ ok: true });

  const result = contactSchema.safeParse(Object.fromEntries(form));
  if (!result.success) {
    const champs = [...new Set(result.error.issues.map((i) => String(i.path[0])))];
    return Response.json({ ok: false, champs }, { status: 422 });
  }

  if (!smtpConfigure) {
    if (process.env.NODE_ENV !== "production") {
      // En local sans SMTP : la demande s'affiche dans le terminal
      console.info("[contact] SMTP non configuré, demande reçue :", result.data);
      return Response.json({ ok: true });
    }
    console.error("[contact] SMTP non configuré (variables SMTP_* et CONTACT_TO)");
    return Response.json({ ok: false }, { status: 500 });
  }

  try {
    await envoyerDemande(result.data);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] échec de l'envoi :", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}
