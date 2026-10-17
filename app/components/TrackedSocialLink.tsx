"use client";

import type { ReactNode } from "react";
import {
  type SocialPlatform,
  trackSocialClick,
} from "../lib/analytics";

type TrackedSocialLinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
  location: string;
  platform: SocialPlatform;
  rel?: string;
  target?: string;
};

export default function TrackedSocialLink({
  children,
  className,
  href,
  location,
  platform,
  rel,
  target,
}: TrackedSocialLinkProps) {
  return (
    <a
      className={className}
      href={href}
      onClick={() => trackSocialClick(platform, location)}
      rel={rel}
      target={target}
    >
      {children}
    </a>
  );
}
