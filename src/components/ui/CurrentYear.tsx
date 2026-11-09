"use client";

import { useSyncExternalStore } from "react";

/* Année en cours, calculée dans le navigateur (la page reste statique). */
export function CurrentYear() {
  const year = useSyncExternalStore(
    () => () => {},
    () => new Date().getFullYear(),
    () => 2026,
  );
  return <span>{year}</span>;
}
