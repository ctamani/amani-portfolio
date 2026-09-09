import { useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";

import { PROJECTS } from "../data/projects.js";
import "../styles/Projects.css";
import FadeInSection from "./FadeInSection.jsx";
import SectionHeading from "./SectionHeading.jsx";

export default function Projects() {
  const [activeProjectId, setActiveProjectId] = useState(PROJECTS[0].id);

  const activeProject =
    PROJECTS.find(({ id }) => id === activeProjectId) ?? PROJECTS[0];

  return (
    <section
      id="projects"
      className="section projects-section"
      aria-labelledby="projects-title"
    >
      <SectionHeading id="projects-title">projects</SectionHeading>

      <div className="project-picker">
        <p className="project-picker-label">pick a project</p>

        <div className="project-selector">
          {PROJECTS.map((project) => {
            const isActive = project.id === activeProjectId;

            return (
              <button
                key={project.id}
                type="button"
                className={`project-selector-button${
                  isActive ? " is-active" : ""
                }`}
                aria-pressed={isActive}
                onClick={() => setActiveProjectId(project.id)}
              >
                <div className="project-cart-shell">
                  <div className="project-cart-title">
                    <h3>{project.title}</h3>
                  </div>

                  <div className="project-cart-preview">
                    <img src={project.image} alt="" />
                  </div>

                  <span className="project-cart-arrow" aria-hidden="true" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <FadeInSection
        key={activeProject.id}
        className="project-details"
        motion="fade"
      >
        <div>
          <h3>{activeProject.title}</h3>
          <p>{activeProject.description}</p>
        </div>

        <ul className="project-stack-list">
          {activeProject.stack.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>

        <div className="project-links">
          {activeProject.liveLink && activeProject.liveLink !== "#" && (
            <a
              href={activeProject.liveLink}
              target="_blank"
              rel="noreferrer"
            >
              <LaunchRoundedIcon fontSize="small" />
              Live
            </a>
          )}

          {activeProject.githubLink &&
            activeProject.githubLink !== "#" && (
              <a
                href={activeProject.githubLink}
                target="_blank"
                rel="noreferrer"
              >
                <GitHubIcon fontSize="small" />
                Code
              </a>
            )}
        </div>
      </FadeInSection>
    </section>
  );
}