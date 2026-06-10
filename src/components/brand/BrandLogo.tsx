import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const DEFAULT_LOGO = "/logo.svg";

interface BrandLogoProps {
  logoUrl?: string | null;
  className?: string;
  href?: string;
  size?: "sm" | "md" | "lg";
}

const iconHeights = { sm: 32, md: 40, lg: 48 };
const wordmarkSizes = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-xl",
};

export function BrandLogo({
  logoUrl,
  className,
  href = "/",
  size = "md",
}: BrandLogoProps) {
  const isCustomLogo = Boolean(logoUrl);
  const iconHeight = iconHeights[size];

  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {isCustomLogo ? (
        <Image
          src={logoUrl!}
          alt=""
          width={iconHeight}
          height={iconHeight}
          className="object-contain rounded-lg shrink-0"
          style={{ height: iconHeight, width: iconHeight }}
          priority
        />
      ) : (
        <Image
          src={DEFAULT_LOGO}
          alt={SITE.name}
          width={220}
          height={iconHeight}
          className="object-contain object-left"
          style={{ height: iconHeight, width: "auto", maxWidth: 220 }}
          priority
        />
      )}
      {isCustomLogo && (
        <span
          className={cn(
            "font-display font-bold leading-none tracking-tight whitespace-nowrap",
            wordmarkSizes[size]
          )}
        >
          <span className="text-foreground">{SITE.brandScience}</span>
          <span className="text-primary">{SITE.brandMines}</span>
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex group hover:opacity-90 transition-opacity"
        aria-label={SITE.name}
      >
        {content}
      </Link>
    );
  }

  return content;
}
