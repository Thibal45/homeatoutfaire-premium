"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const windowHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        windowHeight > 0
          ? (window.scrollY / windowHeight) * 100
          : 0;

      setScroll(progress);
    };

    window.addEventListener("scroll", updateScroll);

    updateScroll();

    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

return (
  <div className="fixed top-0 left-0 w-full h-[4px] z-[999] bg-transparent">

    <div
      style={{ width: `${scroll}%` }}
      className="
        h-full
        rounded-r-full
        bg-gradient-to-r
        from-yellow-400
        via-yellow-500
        to-amber-500
        transition-[width]
        duration-150
        shadow-[0_0_12px_rgba(250,204,21,0.9)]
      "
    />

  </div>
);
}