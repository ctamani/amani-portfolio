import { useState } from "react";

import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";

import { PROJECTS } from "../../data/projects.js";
//import { SITE } from "../../config/site.js";
import { useProjectCarousel } from "../../hooks/useProjectCarousel.js";

import "./Console.css";
import ProjectArchive from "./Archive.jsx";

import ProjectDetail from "./Detail.jsx";
import ProjectLibrary from "./Library.jsx";
import SectionHeading from "../SectionHeading.jsx";

export default function ProjectsConsole() {
  const [screenView, setScreenView] = useState("library");

  const {
    activeProject,
    carouselIndex,
    carouselRef,
    cartridgeRefs,
    loopedProjects,
    totalProjects,
    openProject,
    resetToSelectedProject,
    showNextProject,
    showPreviousProject,
  } = useProjectCarousel({ projects: PROJECTS, screenView });

  //const githubLink = activeProject.githubLink || SITE.github;
  const isArchiveView = screenView === "archive";
  const hasLiveDemo = !isArchiveView && Boolean(activeProject.liveLink);

  function handleOpenProject(index) {
    openProject(index);
    setScreenView("detail");
  }

  function openArchive() {
    setScreenView("archive");
  }

  function returnToLibrary() {
    resetToSelectedProject();
    setScreenView("library");
  }

  return (
    <section
      id="projects"
      className="section projects-section"
      aria-labelledby="projects-title"
    >
      <SectionHeading id="projects-title">projects</SectionHeading>

      <div className="project-console">
        <div className="project-console-control project-console-control--left">
          <div className="project-console-dpad" aria-hidden="true" />
        </div>

        <div className="project-console-center">
          <div className="project-console-bezel">
            <div className="project-console-screen">
              {screenView === "library" ? (
                <ProjectLibrary
                  loopedProjects={loopedProjects}
                  totalProjects={totalProjects}
                  carouselIndex={carouselIndex}
                  carouselRef={carouselRef}
                  cartridgeRefs={cartridgeRefs}
                  onPrevious={showPreviousProject}
                  onNext={showNextProject}
                  onOpenProject={handleOpenProject}
                  onOpenArchive={openArchive}
                />
              ) : screenView === "archive" ? (
                  <ProjectArchive
                    key="project-archive"
                    onBack={returnToLibrary}
                  />
                ) : (
                <ProjectDetail
                  key={activeProject.id}
                  project={activeProject}
                  onBack={returnToLibrary}
                  onPrevious={showPreviousProject}
                  onNext={showNextProject}
                />
              )}
            </div>
          </div>
        </div>

        <div className="project-console-control project-console-control--right">
          <div className="project-console-actions">
            {hasLiveDemo ? (
              <a
                className="project-console-action project-console-action--live"
                //href={activeProject.liveLink}
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

            {!isArchiveView ? (
              <a
                className="project-console-action"
                //href={githubLink}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${activeProject.title} on GitHub`}
                title="GitHub"
              >
                <GitHubIcon />
              </a>
            ) : (
              <span
                className="project-console-action is-disabled"
                aria-label="GitHub not available"
                title="GitHub not available"
              >
                <GitHubIcon />
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}