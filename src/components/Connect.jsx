import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import { EMAIL_LINK, SITE } from "../config/site.js";
import "../styles/Connect.css";
import SectionHeading from "./SectionHeading.jsx";

const LAPTOP_IMAGE = "/images/connect/typing-laptop2.png";

const FORM_ENDPOINT = "https://formspree.io/f/my-form-id";

const LAPTOP_LINKS = [
  {
    label: "Email",
    href: EMAIL_LINK,
    Icon: EmailRoundedIcon,
    className: "connect-screen-link--email",
    external: false,
  },
  {
    label: "LinkedIn",
    href: SITE.linkedin,
    Icon: LinkedInIcon,
    className: "connect-screen-link--linkedin",
    external: true,
  },
  {
    label: "GitHub",
    href: SITE.github,
    Icon: GitHubIcon,
    className: "connect-screen-link--github",
    external: true,
  },
  {
    label: "Resume",
    href: SITE.resume,
    Icon: DescriptionRoundedIcon,
    className: "connect-screen-link--resume",
    external: true,
  },
];

function ConnectLaptop() {
  return (
    <div className="connect-laptop">
      <img
        className="connect-laptop-image"
        src={LAPTOP_IMAGE}
        alt="Pixel-art laptop with hands typing"
      />

      <div className="connect-screen-copy">
        <p className="connect-screen-kicker">let&apos;s connect</p>

        <h3>
          good conversations
          <span> lead to great things.</span>
        </h3>

        <div
          className="connect-screen-links"
          aria-label="Quick contact links"
        >
          {LAPTOP_LINKS.map(
            ({ label, href, Icon, className, external }) => (
              <a
                key={label}
                className={`connect-screen-link ${className}`}
                href={href}
                aria-label={label}
                title={label}
                {...(external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                <Icon aria-hidden="true" />
              </a>
            )
          )}
        </div>
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
        <p className="connect-form-kicker">contact me</p>
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
          placeholder="Your message here..."
          required
        />
      </label>

      <button type="submit" className="connect-submit">
        <span>Send message</span>
        <ArrowForwardRoundedIcon aria-hidden="true" />
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
        <SectionHeading id="connect-title">let&apos;s connect</SectionHeading>

        <div className="connect-layout">
          <ConnectLaptop />
          <ContactForm />
        </div>

        <p className="connect-copyright">
          © {currentYear} {SITE.name}. All rights reserved.
        </p>
      </div>
    </section>
  );
}