import {
  useEffect,
  useRef,
  useState,
} from "react";

import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import { EMAIL_LINK, SITE } from "../../config/site.js";
import "./ConnectDesktop.css";
import "./Connect.css";

import ConnectForm from "./ConnectForm.jsx";
import RetroWindow from "../RetroWindow.jsx";
import SectionHeading from "../SectionHeading.jsx";


const LAPTOP_IMAGE = "/images/connect/typing-laptop1.png";

const CONNECT_MESSAGE =
  "good conversations\nlead to great things.";

const MESSAGE_START_DELAY = 450;
const MESSAGE_TYPING_INTERVAL = 60;
const TABLE_IMAGE = "/images/connect/table.png";

/* =========================================================
   DESKTOP LINKS
   ========================================================= */

const DESKTOP_LINKS = [
  {
    label: "LinkedIn",
    href: SITE.linkedin,
    Icon: LinkedInIcon,
    className: "is-linkedin",
    external: true,

    initialPosition: {
      x: 0.05,
      y: 0.08,
    },
  },

  {
    label: "GitHub",
    href: SITE.github,
    Icon: GitHubIcon,
    className: "is-github",
    external: true,

    initialPosition: {
      x: 0.22,
      y: 0.08,
    },
  },

  {
    label: "Email",
    href: EMAIL_LINK,
    Icon: EmailRoundedIcon,
    className: "is-email",
    external: false,

    initialPosition: {
      x: 0.05,
      y: 0.43,
    },
  },

  {
    label: "Resume",
    href: SITE.resume,
    Icon: DescriptionRoundedIcon,
    className: "is-resume",
    external: true,

    initialPosition: {
      x: 0.22,
      y: 0.43,
    },
  },
];


/* =========================================================
   TYPED MESSAGE
   ========================================================= */

function TypedConnectMessage() {
  const [visibleLength, setVisibleLength] =
    useState(() => {
      const prefersReducedMotion =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

      return prefersReducedMotion
        ? CONNECT_MESSAGE.length
        : 0;
    });


  useEffect(() => {
    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    if (prefersReducedMotion) {
      return;
    }

    let intervalId;

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setVisibleLength((length) => {
          const nextLength = length + 1;

          if (
            nextLength >=
            CONNECT_MESSAGE.length
          ) {
            window.clearInterval(intervalId);
          }

          return Math.min(
            nextLength,
            CONNECT_MESSAGE.length,
          );
        });
      }, MESSAGE_TYPING_INTERVAL);
    }, MESSAGE_START_DELAY);


    return () => {
      window.clearTimeout(timeoutId);

      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, []);


  return (
    <span aria-hidden="true">
      {CONNECT_MESSAGE.slice(
        0,
        visibleLength,
      )}
    </span>
  );
}


/* =========================================================
   DRAGGABLE DESKTOP ITEM
   ========================================================= */

function DraggableDesktopItem({
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


  /* POINTER DOWN

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


/* =========================================================
   LAPTOP DESKTOP
   ========================================================= */

function LaptopDesktop() {
  return (
    <div className="connect-laptop">
      <img
        className="connect-laptop-image"
        src={LAPTOP_IMAGE}
        alt="Pixel-art laptop displaying a grassy desktop background"
        draggable="false"
      />


      <div className="connect-desktop">

        {/* DESKTOP SHORTCUTS */}

        <nav
          className="connect-desktop-icons"
          aria-label="Contact shortcuts"
        >
          {DESKTOP_LINKS.map(
            ({
              label,
              href,
              Icon,
              className,
              external,
              initialPosition,
            }) => (
              <DraggableDesktopItem
                key={label}
                className="connect-desktop-shortcut"
                initialPosition={
                  initialPosition
                }
              >
                <a
                  className={
                    `connect-desktop-icon ${className}`
                  }
                  href={href}
                  aria-label={label}
                  title={label}
                  draggable="false"
                  {...(
                    external
                      ? {
                          target: "_blank",
                          rel: "noreferrer",
                        }
                      : {}
                  )}
                >
                  <span className="connect-desktop-icon-image">
                    <Icon
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </DraggableDesktopItem>
            ),
          )}
        </nav>


        {/* DRAGGABLE NOTEPAD */}

        <DraggableDesktopItem
          className="connect-notepad-drag"
          initialPosition={{
            x: 0.82,
            y: 0.14,
          }}
          handleClassName="connect-notepad-drag-handle"
        >
          <RetroWindow
            title="Untitled - Notepad"
            className="connect-notepad"
          >
            <div className="connect-notepad-body">
              <p
                className="connect-typed-message"
                aria-label="good conversations lead to great things."
              >
                <TypedConnectMessage />

                <span
                  className="connect-notepad-cursor"
                  aria-hidden="true"
                >
                  |
                </span>
              </p>
            </div>
          </RetroWindow>


          {/*
            Transparent drag layer positioned over
            the window's title bar.
          */}

          <div
            className="connect-notepad-drag-handle"
            aria-hidden="true"
          />
        </DraggableDesktopItem>

      </div>
    </div>
  );
}


/* =========================================================
   CONNECT SECTION
   ========================================================= */

export default function Connect() {
  const currentYear = new Date().getFullYear();

  return (
    <section
      id="contact"
      className="connect-section"
      aria-labelledby="connect-title"
    >
      {/* decorative table behind everything */}
      <img
        className="connect-table-image"
        src={TABLE_IMAGE}
        alt=""
        aria-hidden="true"
        draggable="false"
      />

      <div className="connect-inner">
        <SectionHeading id="connect-title">
          let&apos;s connect
        </SectionHeading>

        <div className="connect-layout">
          <LaptopDesktop />
          <ConnectForm />
        </div>

        <p className="connect-copyright">
          © {currentYear} {SITE.name}. All rights reserved.
        </p>
      </div>
    </section>
  );
}