"use client";

import { useState } from "react";
import {
  ArrowRight,
  Bolt,
  Droplets,
  Hammer,
  PaintRoller,
  Waves,
  Wrench,
} from "lucide-react";
import { discoverService } from "../lib/discovery";

const spots = [
  {
    title: "Un luminaire à remplacer ?",
    label: "Petits travaux électriques",
    icon: Bolt,
    x: 57,
    y: 57,
    className: "electric",
  },
  {
    title: "Un robinet à changer ?",
    label: "Petits travaux de plomberie",
    icon: Droplets,
    x: 77,
    y: 53,
    className: "plumbing",
  },
  {
    title: "Une pièce à rafraîchir ?",
    label: "Peinture",
    icon: PaintRoller,
    x: 42,
    y: 43,
    className: "paint",
  },
  {
    title: "Une porte à régler ?",
    label: "Petits travaux de menuiserie",
    icon: Hammer,
    x: 34,
    y: 63,
    className: "wood",
  },
  {
    title: "Une piscine à entretenir ?",
    label: "Entretien de piscine",
    icon: Waves,
    x: 78,
    y: 78,
    className: "pool",
  },
  {
    title: "Un petit souci à résoudre ?",
    label: "Petit dépannage",
    icon: Wrench,
    x: 20,
    y: 74,
    className: "repair",
  },
];

const houseArtwork = (
  <svg
    viewBox="0 0 680 500"
    fill="none"
    aria-hidden="true"
    className="house-art"
  >
    <defs>
      <linearGradient
        id="house-ground"
        x1="140"
        y1="200"
        x2="520"
        y2="490"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#f1f0e5" />
        <stop offset="1" stopColor="#dce3cf" />
      </linearGradient>
      <linearGradient
        id="house-roof"
        x1="350"
        y1="70"
        x2="520"
        y2="280"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#ba8063" />
        <stop offset="1" stopColor="#98634e" />
      </linearGradient>
      <linearGradient
        id="house-glass"
        x1="270"
        y1="260"
        x2="380"
        y2="350"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#c1d8d8" />
        <stop offset="1" stopColor="#789d9f" />
      </linearGradient>
      <linearGradient
        id="house-water"
        x1="465"
        y1="350"
        x2="570"
        y2="430"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#91bcb7" />
        <stop offset="1" stopColor="#4b8c91" />
      </linearGradient>
      <filter id="house-shadow" x="-30%" y="-30%" width="160%" height="180%">
        <feGaussianBlur stdDeviation="10" />
      </filter>
      <pattern
        id="house-tiles"
        width="18"
        height="12"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(36)"
      >
        <path
          d="M0 0H18M0 12V0"
          stroke="#e9c4a8"
          strokeOpacity=".22"
          strokeWidth="1"
        />
      </pattern>
    </defs>
    <ellipse
      cx="357"
      cy="411"
      rx="238"
      ry="51"
      fill="#344b3e"
      opacity=".09"
      filter="url(#house-shadow)"
    />
    <path
      d="M55 327L327 172Q343 163 359 170L641 324Q657 334 641 344L374 493Q359 501 344 493L55 345Q40 337 55 327Z"
      fill="url(#house-ground)"
    />
    <path
      d="M55 345L344 493Q359 501 374 493L641 344V352L374 500Q359 509 344 500L55 353Z"
      fill="#cbd3bc"
    />
    <path d="M177 347L402 418L535 341L307 267Z" fill="#506252" opacity=".12" />
    <path d="M175 337L404 409L539 331V343L404 423L175 350Z" fill="#d1c7b3" />
    <path
      className="house-wall"
      d="M170 202L400 274V410L170 338Z"
      fill="#f8f1df"
    />
    <path d="M400 274L530 199V335L400 410Z" fill="#e2d3b8" />
    <path d="M170 202L285 100L400 274Z" fill="#fbf6e8" />
    <path d="M161 202L285 89L415 14L290 128Z" fill="#c99b7b" />
    <path d="M285 89L415 14L544 198L400 282Z" fill="url(#house-roof)" />
    <path d="M285 89L415 14L544 198L400 282Z" fill="url(#house-tiles)" />
    <path
      d="M161 202L285 89L400 282L544 198"
      stroke="#754f42"
      strokeWidth="6"
      strokeLinejoin="round"
    />
    <path
      d="M285 89L415 14L544 198"
      stroke="#ddb08d"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <path d="M365 63L382 54L400 61V111L383 122L365 97Z" fill="#eee0c5" />
    <path d="M382 54L400 61V111L383 122V68Z" fill="#bfac8c" />
    <path d="M361 63L381 51L403 59L383 72Z" fill="#8f7662" />
    <path
      d="M295 183L323 192V221L295 212Z"
      fill="#e5cfaa"
      stroke="#d8c39b"
      strokeWidth="5"
    />
    <path d="M309 188V216M297 198L322 206" stroke="#faf5e8" strokeWidth="3" />
    <g className="house-door">
      <path
        d="M209 247L252 260V363L209 350Z"
        fill="#406364"
        stroke="#faf8ef"
        strokeWidth="7"
      />
      <path d="M214 253L247 263V333L214 323Z" fill="#7c9a96" />
      <path
        d="M245 315V330"
        stroke="#ecd39c"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </g>
    <path
      d="M278 265L369 293V365L278 337Z"
      fill="url(#house-glass)"
      stroke="#fcf9ef"
      strokeWidth="7"
    />
    <path d="M323 279V351M282 312L366 338" stroke="#f5f3e9" strokeWidth="4" />
    <path d="M282 270L317 281V343L282 332Z" fill="#e5eeee" opacity=".2" />
    <path
      d="M427 271L504 227V298L427 342Z"
      fill="url(#house-glass)"
      stroke="#eee7d6"
      strokeWidth="7"
    />
    <path d="M466 251V318" stroke="#f1eddf" strokeWidth="4" />
    <path d="M427 332L504 288V299L427 343Z" fill="#bbac92" />
    <g className="house-lamp">
      <ellipse cx="384" cy="290" rx="14" ry="22" fill="#e9bd62" opacity=".2" />
      <path d="M384 275V289" stroke="#5b655a" strokeWidth="3" />
      <path d="M376 287L389 291L393 300L374 294Z" fill="#8b7959" />
      <path d="M377 296L390 300" stroke="#f3c767" strokeWidth="3" />
    </g>
    <path
      d="M520 271V289L512 294"
      stroke="#687d79"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M514 275L527 268"
      stroke="#687d79"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      className="house-drip"
      d="M511 301Q505 308 511 311Q516 309 511 301Z"
      fill="#5698a3"
    />
    <path
      d="M209 354L256 369L267 363M208 363L254 377L269 369M208 372L253 386L271 376"
      stroke="#d4c5a7"
      strokeWidth="5"
    />
    <path d="M218 385L251 395L165 447L130 433Z" fill="#f6efde" />
    <path
      d="M414 386L509 331Q514 328 520 331L626 363Q632 366 626 371L531 428Q525 431 518 428L414 395Q408 392 414 386Z"
      fill="#f6f1e4"
    />
    <path d="M429 389L515 340L614 368L526 419Z" fill="url(#house-water)" />
    <path d="M429 389L515 340L614 368" stroke="#487f86" strokeWidth="3" />
    <g
      className="house-waves"
      stroke="#d6eee5"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity=".7"
    >
      <path d="M464 383L489 390M494 370L526 379M523 399L549 384M553 365L573 371M484 400L505 406" />
      <path d="M454 389L470 394M533 364L550 369M557 393L574 383" opacity=".5" />
    </g>
    <g stroke="#8b7356" strokeWidth="4" strokeLinecap="round">
      <path d="M119 322L117 267M117 298L97 279M117 290L137 268" />
    </g>
    <g fill="#97a37e">
      <ellipse cx="111" cy="255" rx="31" ry="37" />
      <ellipse cx="89" cy="269" rx="23" ry="27" />
      <ellipse cx="135" cy="267" rx="26" ry="31" />
    </g>
    <g fill="#b4ba93" opacity=".7">
      <ellipse cx="100" cy="241" rx="18" ry="23" />
      <ellipse cx="132" cy="250" rx="17" ry="23" />
    </g>
    <path
      d="M105 327Q120 319 134 329Q120 338 105 327Z"
      fill="#7b8d69"
      opacity=".3"
    />
    <g>
      <path d="M280 392L298 397L294 425L284 422Z" fill="#b98566" />
      <path d="M280 392L289 388L307 393L298 398Z" fill="#c99a76" />
      <path d="M294 422L303 417L307 393L298 398Z" fill="#9c6f56" />
      <path d="M294 394Q269 372 283 369Q291 370 294 394Z" fill="#798f71" />
      <path d="M295 392Q310 366 315 375Q317 384 295 392Z" fill="#8da17b" />
      <path d="M293 391Q288 362 298 362Q306 365 293 391Z" fill="#647d63" />
    </g>
    <path d="M102 361L133 342L177 357L145 377Z" fill="#c49a70" />
    <path
      d="M102 361V382M145 377V397M177 357V377"
      stroke="#886f55"
      strokeWidth="5"
    />
    <path
      d="M126 351L147 358M143 347L158 353"
      stroke="#e9d7b5"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <g stroke="#8d9d7c" strokeWidth="1.5" strokeLinecap="round">
      <path d="M91 353L86 345M94 350L97 342M373 460L370 452M376 458L381 453M578 325L583 316" />
    </g>
    <path
      className="house-drawing"
      d="M150 205L284 82L416 8L552 198M170 211V340L400 413L531 338V212"
      stroke="#b99759"
      strokeWidth="1.5"
      strokeDasharray="5 8"
      opacity=".55"
    />
  </svg>
);

/** An illustrative house, never a claimed client property. */
export default function HouseScene() {
  const [active, setActive] = useState(2);
  const selected = spots[active];
  return (
    <div className="house-experience">
      <div className="house-scene-heading">
        <span className="house-kicker">LA MAISON AUX PETITS SOINS</span>
        <span>
          À vous d’explorer <ArrowRight size={15} aria-hidden="true" />
        </span>
      </div>
      <div className={`house-scene house-is-${selected.className}`}>
        {houseArtwork}
        <div
          className="house-hotspots"
          role="group"
          aria-label="Explorer les petits travaux dans la maison"
        >
          {spots.map((spot, index) => {
            const Icon = spot.icon;
            return (
              <button
                key={spot.label}
                type="button"
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                aria-label={spot.label}
                aria-pressed={active === index}
                onClick={() => setActive(index)}
                className="house-hotspot"
              >
                <Icon size={19} aria-hidden="true" />
                <span className="house-hotspot-label">{spot.label}</span>
              </button>
            );
          })}
        </div>
        <span className="house-illustration-note">
          Maison illustrative · Explorez les 6 repères
        </span>
      </div>
      <div className="house-selection" aria-live="polite" aria-atomic="true">
        <span className="house-selection-number" aria-hidden="true">
          0{active + 1}
        </span>
        <div>
          <span>{selected.label}</span>
          <strong>{selected.title}</strong>
        </div>
        <a
          href="#services"
          aria-label={`Découvrir : ${selected.label}`}
          onClick={() => discoverService(active)}
        >
          <ArrowRight size={23} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
