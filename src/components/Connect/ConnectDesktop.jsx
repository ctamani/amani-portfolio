import {
  useEffect,
  useState,
} from "react";

import { PORTFOLIO_LINKS } from "../../config/portfolioLinks.js";

import DraggableDesktopItem from "./DraggableDesktopItem.jsx";
import RetroWindow from "../RetroWindow.jsx";

import "./ConnectDesktop.css";

const LAPTOP_IMAGE = "/images/connect/typing-laptop.png";

const CONNECT_MESSAGE =
  "good conversations\nlead to great things.";

const MESSAGE_START_DELAY = 450;
const MESSAGE_TYPING_INTERVAL = 60;

/* =========================================================
   DESKTOP LINKS
   ========================================================= */

const DESKTOP_LINKS = PORTFOLIO_LINKS.map((link) => {
  const desktopConfig = {
    linkedin: {
      className: "is-linkedin",
      initialPosition: {
        x: 0.05,
        y: 0.08,
      },
    },

    github: {
      className: "is-github",
      initialPosition: {
        x: 0.22,
        y: 0.08,
      },
    },

    email: {
      className: "is-email",
      initialPosition: {
        x: 0.05,
        y: 0.43,
      },
    },

    resume: {
      className: "is-resume",
      initialPosition: {
        x: 0.22,
        y: 0.43,
      },
    },
  };

  return {
    ...link,
    ...desktopConfig[link.key],
  };
});

/* =========================================================
   TYPED MESSAGE
   ========================================================= */

function TypedConnectMessage() {
  const [visibleLength, setVisibleLength] =
    useState(() => {
      const prefersReducedMotion =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

      return prefersReducedMotion
        ? CONNECT_MESSAGE.length
        : 0;
    });

  useEffect(() => {
    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    if (prefersReducedMotion) {
      return;
    }

    let intervalId;

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setVisibleLength((length) => {
          const nextLength = length + 1;

          if (
            nextLength >=
            CONNECT_MESSAGE.length
          ) {
            window.clearInterval(intervalId);
          }

          return Math.min(
            nextLength,
            CONNECT_MESSAGE.length,
          );
        });
      }, MESSAGE_TYPING_INTERVAL);
    }, MESSAGE_START_DELAY);


    return () => {
      window.clearTimeout(timeoutId);

      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, []);


  return (
    <span aria-hidden="true">
      {CONNECT_MESSAGE.slice(
        0,
        visibleLength,
      )}
    </span>
  );
}

/* =========================================================
   CONNECT DESKTOP
   ========================================================= */

export default function ConnectDesktop() {
  return (
    <div className="connect-laptop">
      <img
        className="connect-laptop-image"
        src={LAPTOP_IMAGE}
        alt="Pixel-art laptop displaying a grassy desktop background"
        draggable="false"
      />


      <div className="connect-desktop">

        {/* DESKTOP SHORTCUTS */}

        <nav
          className="connect-desktop-icons"
          aria-label="Contact shortcuts"
        >
          {DESKTOP_LINKS.map(
            ({
              label,
              href,
              Icon,
              className,
              external,
              initialPosition,
            }) => (
              <DraggableDesktopItem
                key={label}
                className="connect-desktop-shortcut"
                initialPosition={
                  initialPosition
                }
              >
                <a
                  className={
                    `connect-desktop-icon ${className}`
                  }
                  href={href}
                  aria-label={label}
                  title={label}
                  draggable="false"
                  {...(
                    external
                      ? {
                          target: "_blank",
                          rel: "noreferrer",
                        }
                      : {}
                  )}
                >
                  <span className="connect-desktop-icon-image">
                    <Icon
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </DraggableDesktopItem>
            ),
          )}
        </nav>

        {/* DRAGGABLE NOTEPAD */}

        <DraggableDesktopItem
          className="connect-notepad-drag"
          initialPosition={{
            x: 0.82,
            y: 0.14,
          }}
          handleClassName="connect-notepad-drag-handle"
        >
          <RetroWindow
            title="Untitled - Notepad"
            className="connect-notepad"
          >
            <div className="connect-notepad-body">
              <p
                className="connect-typed-message"
                aria-label="good conversations lead to great things."
              >
                <TypedConnectMessage />

                <span
                  className="connect-notepad-cursor"
                  aria-hidden="true"
                >
                  |
                </span>
              </p>
            </div>
          </RetroWindow>

          {/*
            Transparent drag layer positioned over
            the window's title bar.
          */}

          <div
            className="connect-notepad-drag-handle"
            aria-hidden="true"
          />
        </DraggableDesktopItem>

      </div>
    </div>
  );
}