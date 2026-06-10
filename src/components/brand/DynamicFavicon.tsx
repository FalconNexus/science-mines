"use client";

import { useEffect } from "react";

interface DynamicFaviconProps {
  href: string;
}

export function DynamicFavicon({ href }: DynamicFaviconProps) {
  useEffect(() => {
    const rels = ["icon", "shortcut icon", "apple-touch-icon"];
    for (const rel of rels) {
      let link = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement("link");
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
    }
  }, [href]);

  return null;
}
