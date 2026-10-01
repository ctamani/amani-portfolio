// src/data/portfolioLinks.js

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import { EMAIL_LINK, SITE } from "../config/site.js";

export const PORTFOLIO_LINKS = [
  {
    key: "github",
    label: "GitHub",
    href: SITE.github,
    Icon: GitHubIcon,
    external: true,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: SITE.linkedin,
    Icon: LinkedInIcon,
    external: true,
  },
  {
    key: "email",
    label: "Email",
    href: EMAIL_LINK,
    Icon: EmailRoundedIcon,
    external: false,
  },
];