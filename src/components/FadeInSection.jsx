import { useEffect, useRef, useState } from "react";

import "../styles/FadeInSection.css";

const OBSERVER_OPTIONS = {
  threshold: 0.12,
};

function formatDelay(delay) {
  return typeof delay === "number" ? `${delay}ms` : delay;
}

export default function FadeInSection({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  motion = "slide",
  ...props
}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        return;
      }

      setIsVisible(true);
      observer.disconnect();
    }, OBSERVER_OPTIONS);

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const classes = [
    "fade-section",
    `fade-section--${motion}`,
    isVisible ? "is-visible" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag
      ref={elementRef}
      className={classes}
      {...props}
      style={{
        ...props.style,
        "--fade-delay": formatDelay(delay),
      }}
    >
      {children}
    </Tag>
  );
}