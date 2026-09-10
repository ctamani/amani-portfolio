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
   INFINITE PROJECT CAROUSEL
   ========================================================= */

const LOOP_COPIES = 5;
const CENTER_COPY = 2;


export default function Projects() {
  const totalProjects = PROJECTS.length;

  const middleStartIndex =
    CENTER_COPY * totalProjects;


  /* =========================================================
     STATE
     ========================================================= */

  const [selectedIndex, setSelectedIndex] =
    useState(0);

  const [carouselIndex, setCarouselIndex] =
    useState(middleStartIndex);

  const [screenView, setScreenView] =
    useState("library");


  /* =========================================================
     REFS
     ========================================================= */

  const carouselRef = useRef(null);

  const cartridgeRefs = useRef([]);

  const skipAnimationRef = useRef(true);


  /* =========================================================
     LOOPED PROJECTS
     ========================================================= */

  const loopedProjects = Array.from(
    { length: LOOP_COPIES },
    () => PROJECTS,
  ).flat();


  /* =========================================================
     ACTIVE PROJECT
     ========================================================= */

  const activeProject =
    PROJECTS[selectedIndex];

  const githubLink =
    activeProject.githubLink || SITE.github;

  const isArchiveView =
    screenView === "archive";

  const hasLiveDemo =
    !isArchiveView &&
    Boolean(activeProject.liveLink);

  const detailImage =
  activeProject?.detailImage ||
  activeProject?.cartImage ||
  activeProject?.image;

  const detailImageAlt =
    activeProject?.detailImageAlt ||
    activeProject?.alt ||
    activeProject?.title ||
    "";


  /* =========================================================
     INDEX WRAPPING
     ========================================================= */

  function wrapIndex(index) {
    return (
      (index % totalProjects + totalProjects) %
      totalProjects
    );
  }


  /* =========================================================
     PROJECT SELECTION
     ========================================================= */

  function changeProject(index) {
    const wrappedIndex =
      wrapIndex(index);

    setSelectedIndex(wrappedIndex);


    if (screenView === "library") {
      skipAnimationRef.current = false;

      setCarouselIndex(
        middleStartIndex + wrappedIndex,
      );

      return;
    }


    if (screenView === "detail") {
      setScreenView("detail");
    }
  }


  function showPreviousProject() {
    if (screenView === "library") {
      skipAnimationRef.current = false;

      setSelectedIndex(
        (currentIndex) =>
          wrapIndex(currentIndex - 1),
      );

      setCarouselIndex(
        (currentIndex) =>
          currentIndex - 1,
      );

      return;
    }


    changeProject(
      selectedIndex - 1,
    );
  }


  function showNextProject() {
    if (screenView === "library") {
      skipAnimationRef.current = false;

      setSelectedIndex(
        (currentIndex) =>
          wrapIndex(currentIndex + 1),
      );

      setCarouselIndex(
        (currentIndex) =>
          currentIndex + 1,
      );

      return;
    }


    changeProject(
      selectedIndex + 1,
    );
  }


  function openProject(index) {
    const wrappedIndex =
      wrapIndex(index);

    setSelectedIndex(
      wrappedIndex,
    );

    setCarouselIndex(
      middleStartIndex + wrappedIndex,
    );

    setScreenView("detail");
  }


  function openArchive() {
    setScreenView("archive");
  }


  function returnToLibrary() {
    skipAnimationRef.current = true;

    setCarouselIndex(
      middleStartIndex + selectedIndex,
    );

    setScreenView("library");
  }


  /* =========================================================
     CENTER SELECTED CARTRIDGE
     ========================================================= */

  useEffect(() => {
    if (screenView !== "library") {
      return;
    }


    const viewport =
      carouselRef.current;

    const selectedCartridge =
      cartridgeRefs.current[
        carouselIndex
      ];


    if (
      !viewport ||
      !selectedCartridge
    ) {
      return;
    }


    function centerCartridge(
      cartridge,
      behavior = "smooth",
    ) {
      const viewportRect =
        viewport.getBoundingClientRect();

      const cartridgeRect =
        cartridge.getBoundingClientRect();


      const cartridgeCenter =
        cartridgeRect.left -
        viewportRect.left +
        cartridgeRect.width / 2;


      const targetScrollLeft =
        viewport.scrollLeft +
        cartridgeCenter -
        viewport.clientWidth / 2;


      viewport.scrollTo({
        left: targetScrollLeft,
        behavior,
      });
    }


    const behavior =
      skipAnimationRef.current
        ? "auto"
        : "smooth";


    skipAnimationRef.current =
      false;


    const animationFrame =
      window.requestAnimationFrame(
        () => {
          centerCartridge(
            selectedCartridge,
            behavior,
          );
        },
      );


    /* =======================================================
       NORMALIZE INFINITE LOOP
       ======================================================= */

    const centerStart =
      middleStartIndex;

    const centerEnd =
      middleStartIndex +
      totalProjects;


    let normalizationTimer;


    if (
      carouselIndex < centerStart ||
      carouselIndex >= centerEnd
    ) {
      normalizationTimer =
        window.setTimeout(
          () => {
            const logicalIndex =
              wrapIndex(
                carouselIndex,
              );

            const normalizedIndex =
              middleStartIndex +
              logicalIndex;


            skipAnimationRef.current =
              true;


            setCarouselIndex(
              normalizedIndex,
            );
          },
          320,
        );
    }


    return () => {
      window.cancelAnimationFrame(
        animationFrame,
      );


      if (normalizationTimer) {
        window.clearTimeout(
          normalizationTimer,
        );
      }
    };
  }, [
    carouselIndex,
    screenView,
    totalProjects,
    middleStartIndex,
  ]);


  /* =========================================================
     RENDER
     ========================================================= */

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


                  {/* =========================================
                      LIBRARY HEADER
                      ========================================= */}

                  <div className="project-library-heading">
                    <h3>Pick a Project</h3>

                    <button
                      type="button"
                      className="project-library-archive"
                      onClick={openArchive}
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


                  {/* =========================================
                      PROJECT CAROUSEL
                      ========================================= */}

                  <div className="project-library-carousel">


                    {/* PREVIOUS */}

                    <button
                      type="button"
                      className="project-library-arrow"
                      onClick={showPreviousProject}
                      aria-label="Select previous project"
                    >
                      <ChevronLeftRoundedIcon />
                    </button>


                    {/* CAROUSEL VIEWPORT */}

                    <div
                      ref={carouselRef}
                      className="project-library-viewport"
                    >

                      <div className="project-library-track">


                        {loopedProjects.map(
                          (
                            project,
                            carouselItemIndex,
                          ) => {

                            const realIndex =
                              carouselItemIndex %
                              totalProjects;


                            const isSelected =
                              carouselItemIndex ===
                              carouselIndex;


                            const cartImage =
                              project.cartImage ||
                              project.image;


                            return (

                              <button
                                key={`${project.id}-${carouselItemIndex}`}

                                ref={(element) => {
                                  cartridgeRefs.current[
                                    carouselItemIndex
                                  ] = element;
                                }}

                                type="button"

                                className={`project-library-cart${
                                  isSelected
                                    ? " is-selected"
                                    : ""
                                }`}

                                aria-pressed={
                                  isSelected
                                }

                                aria-label={`Open ${project.title}`}

                                tabIndex={
                                  isSelected
                                    ? 0
                                    : -1
                                }

                                onClick={() =>
                                  openProject(
                                    realIndex,
                                  )
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
                          },
                        )}


                      </div>

                    </div>


                    {/* NEXT */}

                    <button
                      type="button"
                      className="project-library-arrow"
                      onClick={showNextProject}
                      aria-label="Select next project"
                    >
                      <ChevronRightRoundedIcon />
                    </button>


                  </div>

                </div>


              ) : screenView === "archive" ? (


                /* ===========================================
                   PROJECT ARCHIVE SCREEN
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
                   PROJECT DETAIL
                   =========================================== */

                <FadeInSection
                  key={activeProject.id}
                  className="project-detail project-detail--fullscreen"
                  motion="fade"
                >

                  {/* FULL-SCREEN PROJECT IMAGE */}

                  <img
                    className="project-detail-background"
                    src={detailImage}
                    alt={detailImageAlt}
                  />


                  {/* DARK OVERLAY */}

                  <div
                    className="project-detail-overlay"
                    aria-hidden="true"
                  />


                  {/* LIBRARY BUTTON */}

                  <button
                    type="button"
                    className="project-detail-back"
                    onClick={returnToLibrary}
                  >
                    <ChevronLeftRoundedIcon />
                    <span>Library</span>
                  </button>


                  {/* PROJECT INFORMATION */}

                  <div className="project-detail-content">
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


                  {/* PREVIOUS / NEXT */}

                  <div className="project-detail-navigation">

                    <button
                      type="button"
                      onClick={showPreviousProject}
                      aria-label="Previous project"
                      title="Previous project"
                    >
                      <ChevronLeftRoundedIcon />
                    </button>


                    <button
                      type="button"
                      onClick={showNextProject}
                      aria-label="Next project"
                      title="Next project"
                    >
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
                href={
                  activeProject.liveLink
                }
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

            {!isArchiveView ? (

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