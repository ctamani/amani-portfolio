import { useEffect, useState } from "react";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";

import { EMAIL_LINK } from "../config/site.js";
import "../styles/Intro.css";
import AnimatedCoder from "./AnimatedCoder.jsx";

const NAME = "amani";
const TYPING_START_DELAY = 450;
const TYPING_INTERVAL = 135;

function TypedName() {
  const [visibleLength, setVisibleLength] = useState(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    return prefersReducedMotion ? NAME.length : 0;
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    let intervalId;

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setVisibleLength((length) => {
          const nextLength = length + 1;

          if (nextLength >= NAME.length) {
            window.clearInterval(intervalId);
          }

          return Math.min(nextLength, NAME.length);
        });
      }, TYPING_INTERVAL);
    }, TYPING_START_DELAY);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <span className="intro-name">
      {NAME.slice(0, visibleLength)}
    </span>
  );
}

export default function Intro() {
  return (
    <section id="top" className="intro-section">
      <div className="intro-copy">
        <h1 className="intro-title" aria-label="Hi, Amani here.">
          <span aria-hidden="true">
            hi, <TypedName />
            <span className="intro-ending">
              {" "}here.<span className="intro-cursor">|</span>
            </span>
          </span>
        </h1>

        <p className="intro-description">
          I'm a recent Computer Science and Data Science graduate with a passion
          for machine learning, software engineering, and human-centered technology.
        </p>

        <div className="intro-actions">
          <a className="intro-primary-action" href={EMAIL_LINK}>
            <EmailRoundedIcon fontSize="small" />
            Say hi!
          </a>

          <a className="intro-secondary-action" href="#projects">
            View projects
            <ArrowForwardRoundedIcon fontSize="small" />
          </a>
        </div>
      </div>

      <div className="intro-artwork">
        <AnimatedCoder />
      </div>
    </section>
  );
}
