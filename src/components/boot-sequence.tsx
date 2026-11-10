"use client";

import { useEffect, useState } from "react";

const BOOT_LINES = [
  "portfolio v1.0.0 initializing...",
  "loading kernel modules...",
  "mounting filesystem...",
  "initializing network stack...",
  "authenticating user: hassnain_abbas",
  "granting access level: recruiter",
  "launching portfolio interface...",
  "system online. ready for input.",
];

export function BootSequence() {
  const [visible, setVisible] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);

  // Skip boot sequence during automated testing
  const skipBoot =
    typeof window !== "undefined" &&
    ((window.navigator as { webdriver?: boolean }).webdriver === true ||
      window.location.search.includes("__skip_boot"));

  useEffect(() => {
    if (skipBoot) {
      setVisible(false);
      return;
    }

    const timer = setInterval(() => {
      setLineIndex((i) => (i + 1 >= BOOT_LINES.length ? i : i + 1));
    }, 180);

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, BOOT_LINES.length * 180 + 600);

    return () => {
      clearInterval(timer);
      clearTimeout(hideTimer);
    };
  }, [skipBoot]);

  if (!visible) return null;

  return (
    <div className="boot-overlay">
      {BOOT_LINES.slice(0, lineIndex + 1).map((line, i) => (
        <div key={i} className="boot-line" style={{ animationDelay: `${i * 180}ms` }}>
          {line}
          {i === lineIndex && <span className="boot-cursor" />}
        </div>
      ))}
    </div>
  );
}
