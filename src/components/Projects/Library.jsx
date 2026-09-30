import ProjectCarouselShell from "./ProjectCarouselShell.jsx";
import "./Library.css";

export default function ProjectLibrary({
  loopedProjects,
  totalProjects,
  carouselIndex,
  carouselRef,
  cartridgeRefs,
  onPrevious,
  onNext,
  onOpenProject,
  onOpenArchive,
}) {
  return (
    <div className="project-library">

      <div className="project-library-heading">
        <h3>Pick a Project</h3>

        <button
          type="button"
          className="project-library-archive"
          onClick={onOpenArchive}
          aria-label="Open project archive"
          title="Project Archive"
        >
          <img
            src="/images/projects/project-cart-archive.png"
            alt=""
            className="project-library-archive-image"
          />
        </button>
      </div>

      <ProjectCarouselShell
        viewportRef={carouselRef}
        onPrevious={onPrevious}
        onNext={onNext}
        prevAriaLabel="Select previous project"
        nextAriaLabel="Select next project"
      >
        {loopedProjects.map((project, carouselItemIndex) => {
          const realIndex  = carouselItemIndex % totalProjects;
          const isSelected = carouselItemIndex === carouselIndex;
          const cartImage  = project.cartImage || project.image;

          return (
            <button
              key={`${project.id}-${carouselItemIndex}`}
              ref={(el) => { cartridgeRefs.current[carouselItemIndex] = el; }}
              type="button"
              className={`project-library-cart${isSelected ? " is-selected" : ""}`}
              aria-pressed={isSelected}
              aria-label={`Open ${project.title}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onOpenProject(realIndex)}
            >
              <div className="project-cart-shell">
                <div className="project-cart-title">
                  <span>{project.cartTitle || project.title}</span>
                </div>

                <div className="project-cart-preview">
                  {cartImage ? (
                    <img src={cartImage} alt="" />
                  ) : (
                    <span className="project-cart-placeholder">PROJECT</span>
                  )}
                </div>

                <span className="project-cart-arrow" aria-hidden="true" />
              </div>
            </button>
          );
        })}
      </ProjectCarouselShell>

    </div>
  );
}
