// src/data/portfolioLinks.js

import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import { EMAIL_LINK, SITE } from "../config/site.js";

export const PORTFOLIO_LINKS = [
  {
    key: "resume",
    label: "Resume",
    href: SITE.resume,
    Icon: DescriptionRoundedIcon,
    external: true,
  },
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