import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import "../styles/ProjectsDetail.css";

import FadeInSection from "./FadeInSection.jsx";

export default function ProjectDetail({
  project,
  onBack,
  onPrevious,
  onNext,
}) {
  const detailImage =
    project?.detailImage || project?.cartImage || project?.image;

  const detailImageAlt =
    project?.detailImageAlt || project?.alt || project?.title || "";

  return (
    <FadeInSection
      className="project-detail project-detail--fullscreen"
      motion="fade"
    >
      <img
        className="project-detail-background"
        src={detailImage}
        alt={detailImageAlt}
      />

      <div className="project-detail-overlay" aria-hidden="true" />

      <button
        type="button"
        className="project-detail-back"
        onClick={onBack}
      >
        <ChevronLeftRoundedIcon />
        <span>Library</span>
      </button>

      <div className="project-detail-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <ul className="project-detail-stack">
          {project.stack.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </div>

      <div className="project-detail-navigation">
        <button
          type="button"
          onClick={onPrevious}
          aria-label="Previous project"
          title="Previous project"
        >
          <ChevronLeftRoundedIcon />
        </button>

        <button
          type="button"
          onClick={onNext}
          aria-label="Next project"
          title="Next project"
        >
          <ChevronRightRoundedIcon />
        </button>
      </div>
    </FadeInSection>
  );
}