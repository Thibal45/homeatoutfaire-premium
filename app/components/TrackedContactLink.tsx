"use client";

import type { ReactNode } from "react";
import {
  type ContactMethod,
  trackContactClick,
} from "../lib/analytics";

type TrackedContactLinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
  location: string;
  method: ContactMethod;
};

export default function TrackedContactLink({
  children,
  className,
  href,
  location,
  method,
}: TrackedContactLinkProps) {
  return (
    <a
      href={href}
      onClick={() => trackContactClick(method, location)}
      className={className}
    >
      {children}
    </a>
  );
}
