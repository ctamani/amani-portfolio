import { useState } from "react";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";

import "../styles/About.css";
import FadeInSection from "./FadeInSection.jsx";
import SectionHeading from "./SectionHeading.jsx";

const ABOUT_TABS = [
  {
    id: "about",
    label: "About",
    Icon: HomeRoundedIcon,
    title: "About Me",
    paragraphs: [
      "I’m Amani, a first-generation college graduate with a bachelors in CS and masters in DS. Growing up in a low-income immigrant family along with being the eldest daughter forced me to navigate crucial parts of my life without a traditional support system. Finding opportunities without proper guidance showed me first hand how having the right access to information and resources can transform someone’s future.",
      "This experience is what drives my decisions today. I am passionate about turning complex ideas into practical, thoughtful solutions that serve and empower diverse communities. I enjoy building systems that make information and resources easily accessible to people and bring forth meaningful change.",
    ],
  },
  {
    id: "education",
    label: "Education",
    Icon: SchoolRoundedIcon,
    title: "Education",
    paragraphs: [
      "I completed my B.S. in Computer Science and M.A.S. in Data Science through Illinois Tech’s coterminal program.",
      "The combination gave me a foundation across software development, machine learning, analytics, and data engineering.",
    ],
  },
  {
    id: "extras",
    label: "Extras",
    Icon: AutoAwesomeRoundedIcon,
    title: "Outside the Code",
    paragraphs: [
      "Outside of projects, I enjoy exploring new skills that keep my curiuosity alive such as learning Spanish, taking muay thai classes, drawing, reading, and more.",
    ],
  },
];

const EDUCATION = [
  {
    degree: "M.A.S. Data Science",
    dates: "Jan 2025 — May 2026",
  },
  {
    degree: "B.S. Computer Science",
    dates: "Aug 2021 — May 2026",
  },
];

export default function About() {
  const [activeTabId, setActiveTabId] = useState(ABOUT_TABS[0].id);

  const activeTab =
    ABOUT_TABS.find(({ id }) => id === activeTabId) ?? ABOUT_TABS[0];

  return (
    <section className="section about-section" id="about" aria-labelledby="about-title">
      <SectionHeading id="about-title">about me</SectionHeading>

      <div className="about-notebook">
        <div className="about-book">
          <div className="about-profile-page">
            <div className="about-photo-card">
              <img
                src="/images/about-avatar1.jpg"
                alt="Pixel-art portrait of Amani"
              />
              <strong>Hi!</strong>
            </div>

            <div className="about-education">
              <div className="about-school">
                <BusinessRoundedIcon aria-hidden="true" />
                <strong>
                  Illinois Institute
                  <br />
                  of Technology
                </strong>
              </div>

              {EDUCATION.map(({ degree, dates }) => (
                <div className="about-degree" key={degree}>
                  <SchoolRoundedIcon aria-hidden="true" />
                  <div>
                    <strong>{degree}</strong>
                    <span>{dates}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="about-signature">Amani C.</div>
          </div>

          <div className="about-binding" aria-hidden="true">
            {Array.from({ length: 6 }, (_, index) => (
              <span key={index} />
            ))}
          </div>

          <FadeInSection
            key={activeTab.id}
            className="about-content-page"
            id={`about-panel-${activeTab.id}`}
            role="tabpanel"
            aria-labelledby={`about-tab-${activeTab.id}`}
            motion="fade"
          >
            <h3>{activeTab.title}</h3>

            {activeTab.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </FadeInSection>
        </div>

        <div
          className="about-tabs"
          role="tablist"
          aria-label="About Amani"
        >
          {ABOUT_TABS.map(({ id, label, Icon }) => {
            const isActive = id === activeTabId;

            return (
              <button
                key={id}
                id={`about-tab-${id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`about-panel-${id}`}
                className={isActive ? "is-active" : ""}
                onClick={() => setActiveTabId(id)}
              >
                <Icon fontSize="small" aria-hidden="true" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
