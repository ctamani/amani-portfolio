import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import { EMAIL_LINK, SITE } from "../../config/site.js";
import "./NavBar.css";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
];

const ACTION_LINKS = [
  {
    label: "Resume",
    href: "/resume.pdf",
    Icon: DescriptionRoundedIcon,
    openInNewTab: true,
  },
  {
    label: "GitHub",
    href: SITE.github,
    Icon: GitHubIcon,
    openInNewTab: true,
  },
  {
    label: "LinkedIn",
    href: SITE.linkedIn,
    Icon: LinkedInIcon,
    openInNewTab: true,
  },
  {
    label: "Email",
    href: EMAIL_LINK,
    Icon: EmailRoundedIcon,
    openInNewTab: false,
  },
];

export default function NavBar() {
  return (
    <header className="site-navbar">
      <div className="navbar-inner">
        <a className="brand" href="/" aria-label="Amani C. home">
          Amani C.
        </a>

        <nav className="main-nav" aria-label="Primary navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <div className="navbar-actions" aria-label="Portfolio links">
          {ACTION_LINKS.map(({ label, href, Icon, openInNewTab }) => (
            <a
              key={label}
              className="nav-action"
              href={href}
              aria-label={label}
              title={label}
              {...(openInNewTab
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
            >
              <Icon fontSize="small" />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
