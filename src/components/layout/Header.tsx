"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MENU } from "@/data/site";
import { BtnArrow } from "../ui/Icon";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(MENU[0].href);

  // Ombre après quelques pixels de défilement
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu mobile : Échap le referme
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Lien actif selon la section visible
  useEffect(() => {
    const sections = MENU.map((m) => document.querySelector(m.href)).filter((s) => s !== null);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive("#" + e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container header-inner">
        <a className="brand" href="#accueil" aria-label="CODISCO GIBAT, retour à l'accueil">
          <Image src="/images/logo-codisco-gibat.png" alt="CODISCO GIBAT" width={72} height={72} priority />
        </a>
        <nav className={`main-nav${menuOpen ? " is-open" : ""}`} id="menu" aria-label="Navigation principale">
          <ul>
            {MENU.map((m) => (
              <li key={m.href}>
                <a
                  href={m.href}
                  className={active === m.href ? "is-active" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {m.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="btn btn-primary btn-sm header-cta" href="#contact">
          Contact <BtnArrow />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-controls="menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="sr-only">{menuOpen ? "Fermer le menu" : "Ouvrir le menu"}</span>
          {/* Trois traits qui se transforment en croix à l'ouverture */}
          <span className="burger" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
    </header>
  );
}
