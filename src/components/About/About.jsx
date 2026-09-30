import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";

import "./About.css";
import FadeInSection from "../FadeInSection.jsx";
import SectionHeading from "../SectionHeading.jsx";

const ABOUT_TABS = [
  {
    id: "about",
    label: "About",
    title: "About Me",
    paragraphs: [
      "I’m Amani, a first-generation college graduate with a bachelors in CS and masters in DS. My background taught me how to create structure where there wasn't any and showed me early on how having access to the right information and resources can transform one's future. ",
      "That perspective directly shapes how I approach building solutions as I base my every decision on how it impacts people. I am especially interested in helping others forge their own path by building tools and reliable systems that make information and resources easier to access. ",
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
  // Grab your default about section data directly from the array
  const activeTab = ABOUT_TABS[0];

  return (
    <section className="section about-section" id="about" aria-labelledby="about-title">
      <SectionHeading id="about-title">about me</SectionHeading>

      <div className="about-notebook">
        <div className="about-book">
          <div className="about-profile-page">
            <div className="about-photo-card">
              <img
                src="/images/about-monogram.png"
                alt="AC monogram"
              />
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
            motion="fade"
          >
            <h3>{activeTab.title}</h3>

            {activeTab.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}