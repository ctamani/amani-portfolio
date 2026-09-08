import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import "../styles/NavBar.css";

const CONTACT = {
  github: "https://github.com/ctamani",
  linkedin: "https://www.linkedin.com/in/amani-chikh-touhami-b93628293/",
  email: "ctamani96@gmail.com",
};

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
    href: CONTACT.github,
    Icon: GitHubIcon,
    openInNewTab: true,
  },
  {
    label: "LinkedIn",
    href: CONTACT.linkedin,
    Icon: LinkedInIcon,
    openInNewTab: true,
  },
  {
    label: "Email",
    href: `mailto:${CONTACT.email}?subject=${encodeURIComponent("Portfolio inquiry")}`,
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
