import { useEffect, useRef, useState } from "react";
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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [screenView, setScreenView] = useState("library");

  const cartridgeRefs = useRef([]);

  const activeProject = PROJECTS[selectedIndex];

  const githubLink =
    activeProject.githubLink || SITE.github;

  const hasLiveDemo = Boolean(activeProject.liveLink);

  function changeProject(index) {
    const totalProjects = PROJECTS.length;

    const wrappedIndex =
      (index + totalProjects) % totalProjects;

    setSelectedIndex(wrappedIndex);
  }

  function showPreviousProject() {
    changeProject(selectedIndex - 1);
  }

  function showNextProject() {
    changeProject(selectedIndex + 1);
  }

  function openProject(index) {
    setSelectedIndex(index);
    setScreenView("detail");
  }

  function returnToLibrary() {
    setScreenView("library");
  }

  useEffect(() => {
  if (screenView !== "library") {
    return;
  }

  const selectedCartridge =
    cartridgeRefs.current[selectedIndex];

  if (!selectedCartridge) {
    return;
  }

  selectedCartridge.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "center",
  });
}, [selectedIndex, screenView]);

  return (
    <section
      id="projects"
      className="section projects-section"
      aria-labelledby="projects-title"
    >
      <SectionHeading id="projects-title">
        projects
      </SectionHeading>

      <div className="project-console">
        {/* LEFT CONTROLLER */}

        <div className="project-console-control project-console-control--left">
          <div
            className="project-console-dpad"
            aria-hidden="true"
          />
        </div>

        {/* CENTER SCREEN */}

        <div className="project-console-center">
          <div className="project-console-bezel">
            <div className="project-console-screen">
              {screenView === "library" ? (
                <div className="project-library">
                  <div className="project-library-heading">
                    <h3>Pick a Project</h3>
                  </div>

                  <div className="project-library-carousel">
                    <button
                      type="button"
                      className="project-library-arrow"
                      onClick={showPreviousProject}
                      aria-label="Select previous project"
                    >
                      <ChevronLeftRoundedIcon />
                    </button>

                    <div
                      className="project-library-viewport"
                    >
                      <div className="project-library-track">
                        {PROJECTS.map((project, index) => {
                          const isSelected =
                            index === selectedIndex;

                          const cartImage =
                            project.cartImage ||
                            project.image;

                          return (
                            <button
                              key={project.id}
                              ref={(element) => {
                                cartridgeRefs.current[index] =
                                  element;
                              }}
                              type="button"
                              className={`project-library-cart${
                                isSelected
                                  ? " is-selected"
                                  : ""
                              }`}
                              aria-pressed={isSelected}
                              onClick={() =>
                                openProject(index)
                              }
                            >
                              <div className="project-cart-shell">
                                <div className="project-cart-title">
                                  <span>
                                    {project.cartTitle ||
                                      project.title}
                                  </span>
                                </div>

                                <div className="project-cart-preview">
                                  {cartImage ? (
                                    <img
                                      src={cartImage}
                                      alt=""
                                    />
                                  ) : (
                                    <span className="project-cart-placeholder">
                                      PROJECT
                                    </span>
                                  )}
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
                    </div>

                    <button
                      type="button"
                      className="project-library-arrow"
                      onClick={showNextProject}
                      aria-label="Select next project"
                    >
                      <ChevronRightRoundedIcon />
                    </button>
                  </div>

                  <div className="project-library-pagination">
                    {PROJECTS.map((project, index) => (
                      <button
                        key={project.id}
                        type="button"
                        className={
                          index === selectedIndex
                            ? "is-active"
                            : ""
                        }
                        aria-label={`Select ${project.title}`}
                        onClick={() =>
                          changeProject(index)
                        }
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <FadeInSection
                  key={activeProject.id}
                  className="project-detail"
                  motion="fade"
                >
                  <div className="project-detail-header">
                    <button
                      type="button"
                      className="project-library-back"
                      onClick={returnToLibrary}
                    >
                      <ChevronLeftRoundedIcon />
                      Library
                    </button>
                  </div>

                  <div className="project-detail-body">
                    <div className="project-detail-window">
                      <div
                        className="project-detail-window-bar"
                        aria-hidden="true"
                      >
                        <span />
                        <span />
                        <span />
                      </div>

                      <div className="project-detail-preview">
                        {activeProject.image ? (
                          <img
                            src={activeProject.image}
                            alt={activeProject.alt}
                          />
                        ) : (
                          <div className="project-detail-no-preview">
                            Project Preview
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="project-detail-info">
                      <h3>{activeProject.title}</h3>

                      <p>
                        {activeProject.description}
                      </p>

                      <ul className="project-detail-stack">
                        {activeProject.stack.map(
                          (technology) => (
                            <li key={technology}>
                              {technology}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="project-detail-navigation">
                    <button
                      type="button"
                      onClick={showPreviousProject}
                    >
                      <ChevronLeftRoundedIcon />
                      Prev
                    </button>

                    <button
                      type="button"
                      onClick={showNextProject}
                    >
                      Next
                      <ChevronRightRoundedIcon />
                    </button>
                  </div>
                </FadeInSection>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT CONTROLLER */}

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
              className="project-console-action"
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
    </section>
  );
}