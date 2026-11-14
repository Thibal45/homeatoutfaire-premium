import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };
type Kind = "electrical" | "plumbing" | "paint" | "wood" | "pool" | "repair";

// A single readable pictogram set: bulb, tap, roller, door, pool net, crossed tools.
const drawings = {
  electrical: (
    <>
      <path d="M8.5 15.5c0-2-3-2.8-3-6.3a6.5 6.5 0 0 1 13 0c0 3.5-3 4.3-3 6.3v1h-7z" />
      <path d="M9 19h6m-5 2h4M10 11l2 2 2-2m-2 2v3.5M12 1V0M3 4 1.5 3M21 4l1.5-1M3 10H1m20 0h2" />
    </>
  ),
  plumbing: (
    <>
      <path d="M3 11h11V8h-4V5h8v4c3 0 4 2 4 4v2h-5v-2H3zM2 9v6M14 5V2m-4 0h8" />
      <path d="M19.5 17c-.8 1-2 2.4-2 3.5a2 2 0 0 0 4 0c0-1.1-1.2-2.5-2-3.5z" />
    </>
  ),
  paint: (
    <>
      <rect x="2" y="3" width="15" height="7" rx="1.5" />
      <path d="M17 5h4v8h-9v3M5 5v3" />
      <rect x="10" y="16" width="4" height="7" rx="1.3" />
    </>
  ),
  wood: (
    <>
      <path d="M3 22V3h15v19M6 22V5l10-3v20M6 5l10-3M1 22h20" />
      <path d="M12.5 12v2" />
    </>
  ),
  pool: (
    <>
      <path d="m16 2-5 10m1-1 8 4-4 7-8-4zM11 14l7 4m-6-5-2 6m6-4-2 6M2 6q2 2 4 0t4 0M1 10q2 2 4 0t4 0" />
    </>
  ),
  repair: (
    <>
      <path d="m14 6 4-4 1 4 3 1-4 4-3-1-9 11-3-3L14 8z" />
      <path d="m3 2 4 1 1 4 5 5m3 4 5 5-2 2-5-5M3 2 2 5l4 3" />
    </>
  ),
};
function Pictogram({ kind, size = 24, ...props }: IconProps & { kind: Kind }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      data-service-icon={kind}
      {...props}
    >
      {drawings[kind]}
    </svg>
  );
}
export const ElectricalIcon = (props: IconProps) => (
  <Pictogram kind="electrical" {...props} />
);
export const PlumbingIcon = (props: IconProps) => (
  <Pictogram kind="plumbing" {...props} />
);
export const PaintingIcon = (props: IconProps) => (
  <Pictogram kind="paint" {...props} />
);
export const WoodworkIcon = (props: IconProps) => (
  <Pictogram kind="wood" {...props} />
);
export const PoolCareIcon = (props: IconProps) => (
  <Pictogram kind="pool" {...props} />
);
export const RepairIcon = (props: IconProps) => (
  <Pictogram kind="repair" {...props} />
);
