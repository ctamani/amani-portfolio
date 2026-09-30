
/* This allows dragging items inside our desktop screen*/
import {
  useEffect,
  useRef,
  useState,
} from "react";

export default function DraggableDesktopItem({
  children,
  className = "",
  initialPosition = {
    x: 0,
    y: 0,
  },
  handleClassName,
}) {
  const itemRef = useRef(null);
  const dragRef = useRef(null);
  const initializedRef = useRef(false);
  const suppressClickRef = useRef(false);

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const [isDragging, setIsDragging] =
    useState(false);


  function clampPosition(x, y) {
    const item = itemRef.current;
    const desktop = item?.parentElement;

    if (!item || !desktop) {
      return { x, y };
    }

    const maxX = Math.max(
      0,
      desktop.clientWidth - item.offsetWidth,
    );

    const maxY = Math.max(
      0,
      desktop.clientHeight - item.offsetHeight,
    );

    return {
      x: Math.min(
        Math.max(0, x),
        maxX,
      ),

      y: Math.min(
        Math.max(0, y),
        maxY,
      ),
    };
  }


  /* INITIAL POSITION */

  useEffect(() => {
    const item = itemRef.current;
    const desktop = item?.parentElement;

    if (
      !item ||
      !desktop ||
      initializedRef.current
    ) {
      return;
    }

    requestAnimationFrame(() => {
      const availableX = Math.max(
        0,
        desktop.clientWidth - item.offsetWidth,
      );

      const availableY = Math.max(
        0,
        desktop.clientHeight - item.offsetHeight,
      );

      setPosition({
        x: availableX * initialPosition.x,
        y: availableY * initialPosition.y,
      });

      initializedRef.current = true;
    });
  }, [
    initialPosition.x,
    initialPosition.y,
  ]);


  /* KEEP INSIDE DESKTOP AFTER RESIZE */

  useEffect(() => {
    const item = itemRef.current;
    const desktop = item?.parentElement;

    if (!item || !desktop) {
      return;
    }

    const observer = new ResizeObserver(() => {
      setPosition((current) =>
        clampPosition(
          current.x,
          current.y,
        ),
      );
    });

    observer.observe(desktop);
    observer.observe(item);

    return () => {
      observer.disconnect();
    };
  }, []);


  /*
    POINTER DOWN

    IMPORTANT:
    This does NOT activate drag mode yet.
    It only remembers where the click started.
  */

  function handlePointerDown(event) {
    if (event.button !== 0) {
      return;
    }

    if (
      handleClassName &&
      !event.target.closest(
        `.${handleClassName}`,
      )
    ) {
      return;
    }

    dragRef.current = {
      pointerId: event.pointerId,

      pointerX: event.clientX,
      pointerY: event.clientY,

      startX: position.x,
      startY: position.y,

      dragging: false,
    };
  }


  /* POINTER MOVE */

  function handlePointerMove(event) {
    const drag = dragRef.current;

    if (!drag) {
      return;
    }

    const deltaX =
      event.clientX - drag.pointerX;

    const deltaY =
      event.clientY - drag.pointerY;


    /*
      Don't enter drag mode until the user
      has ACTUALLY moved the pointer.

      Normal clicking stays normal.
    */

    if (!drag.dragging) {
      const distance =
        Math.hypot(deltaX, deltaY);

      if (distance < 6) {
        return;
      }

      drag.dragging = true;

      suppressClickRef.current = true;

      setIsDragging(true);


      /*
        Only capture the pointer AFTER
        dragging has genuinely started.
      */

      event.currentTarget.setPointerCapture(
        event.pointerId,
      );
    }


    const nextPosition =
      clampPosition(
        drag.startX + deltaX,
        drag.startY + deltaY,
      );

    setPosition(nextPosition);
  }


  /* POINTER UP */

  function handlePointerUp(event) {
    const drag = dragRef.current;

    if (!drag) {
      return;
    }

    if (
      drag.dragging &&
      event.currentTarget.hasPointerCapture(
        event.pointerId,
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId,
      );
    }

    dragRef.current = null;

    setIsDragging(false);


    /*
      Let the click handler see that a drag
      happened before resetting this flag.
    */

    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);
  }


  function handlePointerCancel(event) {
    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId,
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId,
      );
    }

    dragRef.current = null;
    suppressClickRef.current = false;

    setIsDragging(false);
  }


  /* PREVENT LINK OPENING AFTER DRAG */

  function handleClickCapture(event) {
    if (!suppressClickRef.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
  }


  return (
    <div
      ref={itemRef}
      className={
        `connect-draggable ${className} ${
          isDragging
            ? "is-dragging"
            : ""
        }`
      }
      style={{
        transform:
          `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
      onPointerDown={
        handlePointerDown
      }
      onPointerMove={
        handlePointerMove
      }
      onPointerUp={
        handlePointerUp
      }
      onPointerCancel={
        handlePointerCancel
      }
      onClickCapture={
        handleClickCapture
      }
    >
      {children}
    </div>
  );
}
