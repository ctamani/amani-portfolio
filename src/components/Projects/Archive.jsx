import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";

import { ARCHIVE_PROJECTS } from "../../data/archiveProjects.js";
import { useCarousel } from "../../hooks/useCarousel.js";
import ProjectCarouselShell from "./ProjectCarouselShell.jsx";

import "./Archive.css";

export default function ProjectArchive({ onBack }) {
  const {
    loopedItems        : loopedProjects,
    totalItems         : totalProjects,
    carouselIndex,
    viewportRef,
    itemRefs,
    activeLogicalIndex,
    showPrevious,
    showNext,
    selectItem,
    isResetting,
  } = useCarousel({ items: ARCHIVE_PROJECTS });

  return (
    <div className="project-archive">

      {/* ── Header ── */}
      <div className="project-archive-header">
        <button
          type="button"
          className="project-archive-back"
          onClick={onBack}
        >
          <ChevronLeftRoundedIcon />
          <span>Library</span>
        </button>

        <div className="project-archive-heading">
          <span>Archive</span>
          <strong>Older Projects</strong>
        </div>
      </div>

      {/* ── Carousel ── */}
      <ProjectCarouselShell
        viewportRef={viewportRef}
        onPrevious={showPrevious}
        onNext={showNext}
        prevAriaLabel="Previous archived project"
        nextAriaLabel="Next archived project"
      >
        {loopedProjects.map((project, carouselItemIndex) => {
          const realIndex  = carouselItemIndex % totalProjects;
          const isSelected = carouselItemIndex === carouselIndex;

          return (
            <button
              key={`${project.id}-${carouselItemIndex}`}
              ref={(el) => { itemRefs.current[carouselItemIndex] = el; }}
              type="button"
              className={`archive-card${isSelected ? " is-selected" : ""} ${isResetting ? " no-transition" : ""}`}
              aria-pressed={isSelected}
              aria-label={`Select ${project.title}`}
              //tabIndex={isSelected ? 0 : -1}
              onClick={() => selectItem(realIndex)}
            >
              <div className="archive-card-top">
                <FolderOpenRoundedIcon
                  className="archive-card-folder"
                  aria-hidden="true"
                />
              </div>

              <h3>{project.title}</h3>
              {project.image && (
                <img
                  className="archive-card-image"
                  src={project.image}
                  alt=""
                />
              )}
              <p>{project.description}</p>

              <ul className="archive-card-stack">
                {project.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </button>
          );
        })}
      </ProjectCarouselShell>

      {/* ── Pagination dots ── */}
      <div className="project-archive-pagination">
        {ARCHIVE_PROJECTS.map((project, index) => (
          <button
            key={project.id}
            type="button"
            className={index === activeLogicalIndex ? "is-active" : ""}
            onClick={() => selectItem(index)}
            aria-label={`Show ${project.title}`}
          />
        ))}
      </div>

    </div>
  );
}
