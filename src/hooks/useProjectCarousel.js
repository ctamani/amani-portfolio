import { useEffect, useRef, useState } from "react";

const LOOP_COPIES = 5;
const CENTER_COPY = 2;

export function useProjectCarousel({ projects, screenView }) {
  const totalProjects = projects.length;
  const middleStartIndex = CENTER_COPY * totalProjects;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(middleStartIndex);

  const carouselRef = useRef(null);
  const cartridgeRefs = useRef([]);
  const skipAnimationRef = useRef(true);

  const loopedProjects = Array.from(
    { length: LOOP_COPIES },
    () => projects,
  ).flat();

  const activeProject = projects[selectedIndex];

  function wrapIndex(index) {
    return (index % totalProjects + totalProjects) % totalProjects;
  }

  function showPreviousProject() {
    if (screenView === "library") {
      skipAnimationRef.current = false;

      setSelectedIndex((currentIndex) =>
        wrapIndex(currentIndex - 1),
      );

      setCarouselIndex((currentIndex) => currentIndex - 1);

      return;
    }

    setSelectedIndex((currentIndex) =>
      wrapIndex(currentIndex - 1),
    );
  }

  function showNextProject() {
    if (screenView === "library") {
      skipAnimationRef.current = false;

      setSelectedIndex((currentIndex) =>
        wrapIndex(currentIndex + 1),
      );

      setCarouselIndex((currentIndex) => currentIndex + 1);

      return;
    }

    setSelectedIndex((currentIndex) =>
      wrapIndex(currentIndex + 1),
    );
  }

  function openProject(index) {
    const wrappedIndex = wrapIndex(index);

    setSelectedIndex(wrappedIndex);
    setCarouselIndex(middleStartIndex + wrappedIndex);
  }

  function resetToSelectedProject() {
    skipAnimationRef.current = true;

    setCarouselIndex(
      middleStartIndex + selectedIndex,
    );
  }

  useEffect(() => {
    if (screenView !== "library") return;

    const viewport = carouselRef.current;

    const selectedCartridge =
      cartridgeRefs.current[carouselIndex];

    if (!viewport || !selectedCartridge) return;

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

    skipAnimationRef.current = false;

    const animationFrame =
      window.requestAnimationFrame(() => {
        centerCartridge(
          selectedCartridge,
          behavior,
        );
      });

    const centerStart = middleStartIndex;

    const centerEnd =
      middleStartIndex + totalProjects;

    let normalizationTimer;

    if (
      carouselIndex < centerStart ||
      carouselIndex >= centerEnd
    ) {
      normalizationTimer =
        window.setTimeout(() => {
          const logicalIndex =
            wrapIndex(carouselIndex);

          const normalizedIndex =
            middleStartIndex + logicalIndex;

          skipAnimationRef.current = true;

          setCarouselIndex(
            normalizedIndex,
          );
        }, 320);
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
  });

  return {
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
  };
}