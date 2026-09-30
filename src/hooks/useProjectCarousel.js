import { useState } from "react";
import { useCarousel } from "./useCarousel.js";

export function useProjectCarousel({ projects, screenView }) {
  const inLibrary = screenView === "library";

  const [selectedIndex, setSelectedIndex] = useState(0);

  const {
    loopedItems : loopedProjects,
    totalItems  : totalProjects,
    carouselIndex,
    viewportRef : carouselRef,
    itemRefs    : cartridgeRefs,
    showPrevious: carouselPrev,
    showNext    : carouselNext,
    resetToIndex,
    wrapIndex,
    isResetting,
  } = useCarousel({ items: projects, enabled: inLibrary });

  const activeProject = projects[selectedIndex];

  function showPreviousProject() {
    const next = wrapIndex(selectedIndex - 1);
    setSelectedIndex(next);
    if (inLibrary) carouselPrev();
  }

  function showNextProject() {
    const next = wrapIndex(selectedIndex + 1);
    setSelectedIndex(next);
    if (inLibrary) carouselNext();
  }

  function openProject(index) {
    const wrapped = wrapIndex(index);
    setSelectedIndex(wrapped);
    resetToIndex(wrapped);
  }

  function resetToSelectedProject() {
    resetToIndex(selectedIndex);
  }

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
    isResetting,
  };
}
