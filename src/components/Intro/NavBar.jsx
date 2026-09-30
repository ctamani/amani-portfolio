import { PORTFOLIO_LINKS } from "../../config/portfolioLinks.js";

import "./NavBar.css";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
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
          {PORTFOLIO_LINKS.map(({ label, href, Icon, external}) => (
            <a
              key={label}
              className="nav-action"
              href={href}
              aria-label={label}
              title={label}
              {...(external
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
