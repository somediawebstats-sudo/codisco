"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import type { Objet } from "@/lib/contact-schema";
import { Icon } from "./ui/Icon";

/* État partagé entre les sections :
   - l'objet pré-rempli du formulaire (boutons « Parler de mon contrat », « Recrutement »...)
   - la fenêtre vidéo, ouverte depuis plusieurs endroits de la page */

type SiteContextValue = {
  objet: Objet | "";
  setObjet: (o: Objet | "") => void;
  openVideo: (src: string, title: string) => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite doit être utilisé dans <SiteProvider>");
  return ctx;
}

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [objet, setObjet] = useState<Objet | "">("");
  const [video, setVideo] = useState<{ src: string; title: string } | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const openVideo = useCallback((src: string, title: string) => {
    setVideo({ src, title });
    dialogRef.current?.showModal();
    // La source est posée au rendu suivant
    requestAnimationFrame(() => videoRef.current?.play().catch(() => {}));
  }, []);

  const closeVideo = () => {
    videoRef.current?.pause();
    setVideo(null);
    dialogRef.current?.close();
  };

  return (
    <SiteContext.Provider value={{ objet, setObjet, openVideo }}>
      {children}

      <dialog
        ref={dialogRef}
        className="video-modal"
        aria-label={video?.title ?? "Vidéo"}
        onClick={(e) => e.target === e.currentTarget && closeVideo()}
        onCancel={(e) => {
          e.preventDefault();
          closeVideo();
        }}
      >
        <button className="drawer-close" type="button" onClick={closeVideo} aria-label="Fermer la vidéo">
          <Icon name="close" />
        </button>
        <video ref={videoRef} key={video?.src} src={video?.src} controls playsInline preload="none" />
      </dialog>
    </SiteContext.Provider>
  );
}
