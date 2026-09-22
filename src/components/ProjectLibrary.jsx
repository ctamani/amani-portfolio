import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import "../styles/ProjectLibrary.css";

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
            src="/images/project-cart-archive.png"
            alt=""
            className="project-library-archive-image"
          />
        </button>
      </div>

      <div className="project-library-carousel">
        <button
          type="button"
          className="project-library-arrow"
          onClick={onPrevious}
          aria-label="Select previous project"
        >
          <ChevronLeftRoundedIcon />
        </button>

        <div ref={carouselRef} className="project-library-viewport">
          <div className="project-library-track">
            {loopedProjects.map((project, carouselItemIndex) => {
              const realIndex = carouselItemIndex % totalProjects;
              const isSelected = carouselItemIndex === carouselIndex;
              const cartImage = project.cartImage || project.image;

              return (
                <button
                  key={`${project.id}-${carouselItemIndex}`}
                  ref={(element) => {
                    cartridgeRefs.current[carouselItemIndex] = element;
                  }}
                  type="button"
                  className={`project-library-cart${
                    isSelected ? " is-selected" : ""
                  }`}
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
          </div>
        </div>

        <button
          type="button"
          className="project-library-arrow"
          onClick={onNext}
          aria-label="Select next project"
        >
          <ChevronRightRoundedIcon />
        </button>
      </div>
    </div>
  );
}
