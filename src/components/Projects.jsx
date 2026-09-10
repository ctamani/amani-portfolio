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


/* =========================================================
   PROJECT ARCHIVE
   ========================================================= */

const PROJECT_ARCHIVE = {
  id: "project-archive",
  itemType: "archive",
  title: "Project Archive",
  cartImage: "/images/project-cart-archive.png",
};


/*
  Normal projects + archive cartridge.

  The archive is deliberately kept separate from projects.js
  because it is not a real project/detail page yet.
*/

const LIBRARY_ITEMS = [
  ...PROJECTS.map((project) => ({
    ...project,
    itemType: "project",
  })),

  PROJECT_ARCHIVE,
];


export default function Projects() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [screenView, setScreenView] = useState("library");

  const cartridgeRefs = useRef([]);

  const activeItem = LIBRARY_ITEMS[selectedIndex];

  const isArchiveSelected =
    activeItem.itemType === "archive";

  const activeProject = isArchiveSelected
    ? null
    : activeItem;

  const githubLink =
    activeProject?.githubLink || SITE.github;

  const hasLiveDemo =
    Boolean(activeProject?.liveLink);


  /* =========================================================
     PROJECT SELECTION
     ========================================================= */

  function changeProject(index) {
    const totalItems = LIBRARY_ITEMS.length;

    const wrappedIndex =
      (index + totalItems) % totalItems;

    setSelectedIndex(wrappedIndex);


    /*
      If we are already inside an opened project,
      Prev / Next should move to the correct screen type.
    */

    if (screenView !== "library") {
      const nextItem = LIBRARY_ITEMS[wrappedIndex];

      setScreenView(
        nextItem.itemType === "archive"
          ? "archive"
          : "detail",
      );
    }
  }


  function showPreviousProject() {
    changeProject(selectedIndex - 1);
  }


  function showNextProject() {
    changeProject(selectedIndex + 1);
  }


  function openProject(index) {
    const item = LIBRARY_ITEMS[index];

    setSelectedIndex(index);

    setScreenView(
      item.itemType === "archive"
        ? "archive"
        : "detail",
    );
  }


  function returnToLibrary() {
    setScreenView("library");
  }


  /* =========================================================
     CENTER SELECTED CARTRIDGE
     ========================================================= */

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

        {/* ===================================================
            LEFT CONTROLLER
            =================================================== */}

        <div className="project-console-control project-console-control--left">
          <div
            className="project-console-dpad"
            aria-hidden="true"
          />
        </div>


        {/* ===================================================
            CENTER SCREEN
            =================================================== */}

        <div className="project-console-center">
          <div className="project-console-bezel">
            <div className="project-console-screen">

              {/* =============================================
                  PROJECT LIBRARY
                  ============================================= */}

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


                    <div className="project-library-viewport">
                      <div className="project-library-track">

                        {LIBRARY_ITEMS.map(
                          (item, index) => {
                            const isSelected =
                              index === selectedIndex;

                            const isArchive =
                              item.itemType === "archive";

                            const cartImage =
                              item.cartImage ||
                              item.image;


                            return (
                              <button
                                key={item.id}
                                ref={(element) => {
                                  cartridgeRefs.current[
                                    index
                                  ] = element;
                                }}
                                type="button"
                                className={`project-library-cart${
                                  isSelected
                                    ? " is-selected"
                                    : ""
                                }${
                                  isArchive
                                    ? " is-archive"
                                    : ""
                                }`}
                                aria-pressed={isSelected}
                                aria-label={
                                  isArchive
                                    ? "Open project archive"
                                    : `Open ${item.title}`
                                }
                                onClick={() =>
                                  openProject(index)
                                }
                              >

                                {isArchive ? (
                                  /* ARCHIVE FLOPPY */

                                  <div className="project-archive-cart-shell">
                                    <img
                                      className="project-archive-cart-image"
                                      src={item.cartImage}
                                      alt=""
                                    />
                                  </div>
                                ) : (
                                  /* NORMAL PROJECT CARTRIDGE */

                                  <div className="project-cart-shell">

                                    <div className="project-cart-title">
                                      <span>
                                        {item.cartTitle ||
                                          item.title}
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
                                )}
                              </button>
                            );
                          },
                        )}

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


                  {/* PAGINATION */}

                  <div className="project-library-pagination">
                    {LIBRARY_ITEMS.map(
                      (item, index) => (
                        <button
                          key={item.id}
                          type="button"
                          className={
                            index === selectedIndex
                              ? "is-active"
                              : ""
                          }
                          aria-label={`Select ${item.title}`}
                          onClick={() =>
                            changeProject(index)
                          }
                        />
                      ),
                    )}
                  </div>

                </div>
              ) : screenView === "archive" ? (

                /* ===========================================
                   EMPTY PROJECT ARCHIVE SCREEN
                   =========================================== */

                <FadeInSection
                  key="project-archive"
                  className="project-archive-view"
                  motion="fade"
                >
                  <button
                    type="button"
                    className="project-library-back"
                    onClick={returnToLibrary}
                  >
                    <ChevronLeftRoundedIcon />
                    Library
                  </button>
                </FadeInSection>

              ) : (

                /* ===========================================
                   NORMAL PROJECT DETAIL
                   =========================================== */

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

                      <h3>
                        {activeProject.title}
                      </h3>

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
                      aria-label="Previous project"
                    >
                      <ChevronLeftRoundedIcon />
                      <span>Prev</span>
                    </button>


                    <button
                      type="button"
                      onClick={showNextProject}
                      aria-label="Next project"
                    >
                      <span>Next</span>
                      <ChevronRightRoundedIcon />
                    </button>

                  </div>

                </FadeInSection>
              )}

            </div>
          </div>
        </div>


        {/* ===================================================
            RIGHT CONTROLLER
            =================================================== */}

        <div className="project-console-control project-console-control--right">
          <div className="project-console-actions">

            {/* LIVE DEMO */}

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


            {/* GITHUB */}

            {activeProject ? (
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