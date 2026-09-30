import { useEffect, useRef, useState } from "react";

const LOOP_COPIES  = 5;
const CENTER_COPY  = 2;

/**
 * Generic infinite-loop horizontal carousel.
 *
 * @param {object}  options
 * @param {Array}   options.items          – the original (non-looped) item array
 * @param {boolean} [options.enabled=true] – set false to skip scroll effects
 *                                           (e.g. when the carousel is off-screen)
 */
export function useCarousel({ items, enabled = true }) {
  const totalItems       = items.length;
  const middleStartIndex = CENTER_COPY * totalItems;

  const [carouselIndex, setCarouselIndex] = useState(middleStartIndex);
  const [isResetting, setIsResetting] = useState(false);

  const viewportRef      = useRef(null);
  const itemRefs         = useRef([]);
  const skipAnimationRef = useRef(true);

  const loopedItems = Array.from(
    { length: LOOP_COPIES },
    () => items,
  ).flat();

  function wrapIndex(index) {
    return (index % totalItems + totalItems) % totalItems;
  }

  function showPrevious() {
    skipAnimationRef.current = false;
    setCarouselIndex((i) => i - 1);
  }

  function showNext() {
    skipAnimationRef.current = false;
    setCarouselIndex((i) => i + 1);
  }

  /** Navigates to whichever copy of `realIndex` is closest to the current position. */
  function selectItem(realIndex) {
    skipAnimationRef.current = false;
    const currentCopy = Math.floor(carouselIndex / totalItems);
    const candidates  = [
      (currentCopy - 1) * totalItems + realIndex,
       currentCopy      * totalItems + realIndex,
      (currentCopy + 1) * totalItems + realIndex,
    ];
    const closest = candidates.reduce((best, candidate) =>
      Math.abs(candidate - carouselIndex) < Math.abs(best - carouselIndex)
        ? candidate
        : best,
    );
    setCarouselIndex(closest);
  }

  /** Instant (no animation) jump to a real index inside the center copy. */
  function resetToIndex(realIndex) {
    skipAnimationRef.current = true;
    setCarouselIndex(middleStartIndex + realIndex);
  }

  /* ─── scroll effect ─── */
  useEffect(() => {
    if (!enabled) return;

    const viewport     = viewportRef.current;
    const selectedItem = itemRefs.current[carouselIndex];
    if (!viewport || !selectedItem) return;

    function centerItem(item, behavior = "smooth") {
      const vRect  = viewport.getBoundingClientRect();
      const iRect  = item.getBoundingClientRect();
      const center = iRect.left - vRect.left + iRect.width / 2;
      viewport.scrollTo({
        left: viewport.scrollLeft + center - viewport.clientWidth / 2,
        behavior,
      });
    }

    const behavior = skipAnimationRef.current ? "auto" : "smooth";
    skipAnimationRef.current = false;

    const raf = window.requestAnimationFrame(() =>
      centerItem(selectedItem, behavior),
    );

    /*
      Once we drift outside the center copy, silently snap back after the
      smooth scroll finishes so the loop always has room in both directions.
    */
    const centerStart = middleStartIndex;
    const centerEnd   = middleStartIndex + totalItems;
    let normTimer;

    if (carouselIndex < centerStart || carouselIndex >= centerEnd) {
      normTimer = window.setTimeout(() => {
        setIsResetting(true);

        skipAnimationRef.current = true;
        setCarouselIndex(middleStartIndex + wrapIndex(carouselIndex));

        window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setIsResetting(false);
        });
      });
      }, 340);
    }

    return () => {
      window.cancelAnimationFrame(raf);
      if (normTimer) window.clearTimeout(normTimer);
    };
  }); // intentionally runs every render – same pattern as the original

  return {
    loopedItems,
    totalItems,
    carouselIndex,
    viewportRef,
    itemRefs,
    activeLogicalIndex: wrapIndex(carouselIndex),
    showPrevious,
    showNext,
    selectItem,
    resetToIndex,
    wrapIndex,
    isResetting,
  };
}
