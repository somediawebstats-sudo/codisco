"use client";

import { useSite } from "../SiteProvider";

/* Bouton qui ouvre la fenêtre vidéo (fichier MP4 dans public/videos/ ou lien YouTube « /embed/ »). */
export function VideoButton({
  src,
  title,
  className,
  ariaLabel,
  children,
}: {
  src: string;
  title: string;
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}) {
  const { openVideo } = useSite();
  return (
    <button className={className} type="button" aria-label={ariaLabel} onClick={() => openVideo(src, title)}>
      {children}
    </button>
  );
}
