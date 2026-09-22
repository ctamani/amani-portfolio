import { useEffect, useState } from "react";

import "../styles/AnimatedCoder.css";

const FRAMES = [
  "/images/coder-frame-1.png",
  "/images/coder-frame-2.png",
  "/images/coder-frame-1.png",
  "/images/coder-frame-4.png",
  "/images/coder-frame-1.png",
  "/images/coder-frame-3.png",
];

const FRAME_INTERVAL = 520;

export default function AnimatedCoder() {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    FRAMES.forEach((src) => {
      const image = new Image();
      image.src = src;
    });

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setFrameIndex((index) => (index + 1) % FRAMES.length);
    }, FRAME_INTERVAL);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <img
      className="coder-animation"
      src={FRAMES[frameIndex]}
      draggable="false"
    />
  );
}
