import ChevronLeftRoundedIcon  from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import "./ProjectCarouselShell.css";

/**
 * Shared arrow → viewport → arrow wrapper.
 * The caller renders its own cards inside `children`
 * and controls track padding / gap via CSS custom properties
 * set on its own wrapper element.
 */
export default function ProjectCarouselShell({
  viewportRef,
  onPrevious,
  onNext,
  prevAriaLabel = "Previous item",
  nextAriaLabel = "Next item",
  children,
}) {
  return (
    <div className="project-carousel-shell">
      <button
        type="button"
        className="project-carousel-arrow"
        onClick={onPrevious}
        aria-label={prevAriaLabel}
      >
        <ChevronLeftRoundedIcon />
      </button>

      <div ref={viewportRef} className="project-carousel-viewport">
        <div className="project-carousel-track">{children}</div>
      </div>

      <button
        type="button"
        className="project-carousel-arrow"
        onClick={onNext}
        aria-label={nextAriaLabel}
      >
        <ChevronRightRoundedIcon />
      </button>
    </div>
  );
}
