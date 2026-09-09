import { useRef, useState } from "react";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";

import { PROJECTS } from "../data/projects.js";
import { SITE } from "../config/site.js";
import "../styles/Projects.css";
import FadeInSection from "./FadeInSection.jsx";
import SectionHeading from "./SectionHeading.jsx";

export default function Projects() {
  const [activeProjectId, setActiveProjectId] = useState(PROJECTS[0].id);
  const projectSelectorRef = useRef(null);

  const activeProject =
    PROJECTS.find(({ id }) => id === activeProjectId) ?? PROJECTS[0];

  const githubLink = activeProject.githubLink || SITE.github;
  const hasLiveDemo = Boolean(activeProject.liveLink);

  function scrollProjects(direction) {
    projectSelectorRef.current?.scrollBy({
      left: direction * 220,
      behavior: "smooth",
    });
  }

  return (
    <section
      id="projects"
      className="section projects-section"
      aria-labelledby="projects-title"
    >
      <SectionHeading id="projects-title">projects</SectionHeading>

      {/* PROJECT CONSOLE */}

      <div className="project-console">
        <div className="project-console-control project-console-control--left">
          <div className="project-console-dpad" aria-hidden="true" />
        </div>

        <div className="project-console-center">
          <div className="project-console-bezel">
            <div className="project-console-screen">
              <FadeInSection
                key={activeProject.id}
                className="project-screen-content"
                motion="fade"
              >
                <div className="project-screen-window">
                  <div
                    className="project-screen-window-bar"
                    aria-hidden="true"
                  >
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="project-screen-preview">
                    <img
                      src={activeProject.image}
                      alt={activeProject.alt}
                    />
                  </div>
                </div>

                <div className="project-screen-info">
                  <h3>{activeProject.title}</h3>

                  <p>{activeProject.description}</p>

                  <ul className="project-screen-stack">
                    {activeProject.stack.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>

        <div className="project-console-control project-console-control--right">
          <div className="project-console-actions">
            {hasLiveDemo ? (
              <a
                className="project-console-action project-console-action--live"
                href={activeProject.liveLink}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${activeProject.title} live demo`}
                title="Live demo"
              >
                <LaunchRoundedIcon />
              </a>
            ) : (
              <span
                className="project-console-action project-console-action--live is-disabled"
                aria-label="Live demo not available"
                title="Live demo not available"
              >
                <LaunchRoundedIcon />
              </span>
            )}

            <a
              className="project-console-action project-console-action--github"
              href={githubLink}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${activeProject.title} on GitHub`}
              title="GitHub"
            >
              <GitHubIcon />
            </a>
          </div>
        </div>
      </div>

      {/* CARTRIDGE SELECTOR */}

      <div className="project-picker">
        <p className="project-picker-label">pick a project</p>

        <div className="project-picker-row">
          <button
            type="button"
            className="project-picker-scroll-button"
            onClick={() => scrollProjects(-1)}
            aria-label="Scroll projects left"
          >
            <ChevronLeftRoundedIcon />
          </button>

          <div
            ref={projectSelectorRef}
            className="project-selector"
          >
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

                    <span
                      className="project-cart-arrow"
                      aria-hidden="true"
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="project-picker-scroll-button"
            onClick={() => scrollProjects(1)}
            aria-label="Scroll projects right"
          >
            <ChevronRightRoundedIcon />
          </button>
        </div>
      </div>
    </section>
  );
}