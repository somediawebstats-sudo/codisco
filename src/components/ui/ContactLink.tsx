"use client";

import type { Objet } from "@/lib/contact-schema";
import { useSite } from "../SiteProvider";

/* Lien vers #contact qui pré-remplit l'objet du formulaire. */
export function ContactLink({
  objet,
  className,
  children,
}: {
  objet: Objet;
  className?: string;
  children: React.ReactNode;
}) {
  const { setObjet } = useSite();
  return (
    <a className={className} href="#contact" onClick={() => setObjet(objet)}>
      {children}
    </a>
  );
}
