import { useState } from "react";

import { EXPERIENCE_ITEMS } from "../data/experience.js";
import "../styles/Experience.css";
import SectionHeading from "./SectionHeading.jsx";
import FadeInSection from "./FadeInSection.jsx";

const BULLET_STAGGER_MS = 90;

export default function Experience() {
  const [activeExperienceId, setActiveExperienceId] = useState(
    EXPERIENCE_ITEMS[0].id,
  );

  const activeExperience =
    EXPERIENCE_ITEMS.find(({ id }) => id === activeExperienceId) ??
    EXPERIENCE_ITEMS[0];

  return (
    <section
      id="experience"
      className="section experience-section"
      aria-labelledby="experience-title"
    >
      <SectionHeading id="experience-title">experience</SectionHeading>

      <div className="experience-layout">
        <div
          className="experience-tabs"
          role="tablist"
          aria-label="Experience"
        >
          {EXPERIENCE_ITEMS.map(({ id, label }) => {
            const isActive = id === activeExperienceId;

            return (
              <button
                key={id}
                id={`experience-tab-${id}`}
                className={`experience-tab${isActive ? " is-active" : ""}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`experience-panel-${id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveExperienceId(id)}
              >
                {label}
              </button>
            );
          })}
        </div>

        <FadeInSection
          key={activeExperience.id}
          as="article"
          id={`experience-panel-${activeExperience.id}`}
          className="experience-panel"
          role="tabpanel"
          aria-labelledby={`experience-tab-${activeExperience.id}`}
          tabIndex={0}
        >
          <div className="experience-heading">
            <div>
              <h3>{activeExperience.title}</h3>
              <p className="experience-context">{activeExperience.context}</p>
            </div>

            <p className="experience-duration">
              {activeExperience.duration}
            </p>
          </div>

          <ul className="experience-description">
            {activeExperience.description.map((bullet, index) => (
              <FadeInSection
              key={`${activeExperience.id}-${index}`}
                as="li"
                delay={index * BULLET_STAGGER_MS}
              >
                {bullet}
              </FadeInSection>
            ))}
          </ul>
        </FadeInSection>
      </div>
    </section>
  );
}
