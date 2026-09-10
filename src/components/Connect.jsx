import { useEffect, useState } from "react";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import { EMAIL_LINK, SITE } from "../config/site.js";
import "../styles/Connect.css";

import RetroWindow from "./RetroWindow.jsx";
import SectionHeading from "./SectionHeading.jsx";


const LAPTOP_IMAGE = "/images/connect/typing-laptop.png";

const FORM_ENDPOINT = "https://formspree.io/f/my-form-id";

const CONNECT_MESSAGE =
  "good conversations\nlead to great things.";

const MESSAGE_START_DELAY = 450;
const MESSAGE_TYPING_INTERVAL = 60;


const DESKTOP_LINKS = [
  {
    label: "LinkedIn",
    href: SITE.linkedin,
    Icon: LinkedInIcon,
    className: "is-linkedin",
    external: true,
  },
  {
    label: "GitHub",
    href: SITE.github,
    Icon: GitHubIcon,
    className: "is-github",
    external: true,
  },
  {
    label: "Email",
    href: EMAIL_LINK,
    Icon: EmailRoundedIcon,
    className: "is-email",
    external: false,
  },
  {
    label: "Resume",
    href: SITE.resume,
    Icon: DescriptionRoundedIcon,
    className: "is-resume",
    external: true,
  },
];


function TypedConnectMessage() {
  const [visibleLength, setVisibleLength] = useState(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    return prefersReducedMotion
      ? CONNECT_MESSAGE.length
      : 0;
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
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

          if (nextLength >= CONNECT_MESSAGE.length) {
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
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <span aria-hidden="true">
      {CONNECT_MESSAGE.slice(0, visibleLength)}
    </span>
  );
}


function LaptopDesktop() {
  return (
    <div className="connect-laptop">
      <img
        className="connect-laptop-image"
        src={LAPTOP_IMAGE}
        alt="Pixel-art laptop displaying a grassy desktop background"
      />

      <div className="connect-desktop">
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
            }) => (
              <a
                key={label}
                className={`connect-desktop-icon ${className}`}
                href={href}
                aria-label={label}
                title={label}
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
                  <Icon aria-hidden="true" />
                </span>
              </a>
            ),
          )}
        </nav>

        <RetroWindow
          title="Untitled - Notepad"
          menu={
            <>
              <span>File</span>
              <span>Edit</span>
              <span>Search</span>
              <span>Help</span>
            </>
          }
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
      </div>
    </div>
  );
}


function ContactForm() {
  return (
    <form
      className="connect-form"
      action={FORM_ENDPOINT}
      method="POST"
    >
      <div className="connect-form-copy">
        <p className="connect-form-kicker">
          contact me
        </p>
      </div>

      <input
        type="hidden"
        name="_subject"
        value="New portfolio contact form submission"
      />

      <label className="connect-field">
        <span>Name</span>

        <input
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Your name"
          required
        />
      </label>

      <label className="connect-field">
        <span>Email</span>

        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
        />
      </label>

      <label className="connect-field">
        <span>Message</span>

        <textarea
          name="message"
          placeholder="Your message"
          required
        />
      </label>

      <button
        type="submit"
        className="connect-submit"
      >
        <span>Send message</span>

        <ArrowForwardRoundedIcon
          aria-hidden="true"
        />
      </button>
    </form>
  );
}


export default function Connect() {
  const currentYear = new Date().getFullYear();

  return (
    <section
      id="contact"
      className="connect-section"
      aria-labelledby="connect-title"
    >
      <div className="connect-inner">
        <SectionHeading id="connect-title">
          let&apos;s connect
        </SectionHeading>

        <div className="connect-layout">
          <LaptopDesktop />
          <ContactForm />
        </div>

        <p className="connect-copyright">
          © {currentYear} {SITE.name}. All rights reserved.
        </p>
      </div>
    </section>
  );
}