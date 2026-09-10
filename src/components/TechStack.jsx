import { useState } from "react";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import { Icon as IconifyIcon } from "@iconify/react";

import { TECH_STACK } from "../data/techStack.js";
import "../styles/TechStack.css";
import FadeInSection from "./FadeInSection.jsx";
import RetroWindow from "./RetroWindow.jsx";
import SectionHeading from "./SectionHeading.jsx";

export default function TechStack() {
  const [activeCategoryId, setActiveCategoryId] = useState(
    TECH_STACK[0].id,
  );

  const activeCategory =
    TECH_STACK.find(({ id }) => id === activeCategoryId) ??
    TECH_STACK[0];

  return (
    <section
      id="stack"
      className="section stack-section"
      aria-labelledby="stack-title"
    >
      <SectionHeading id="stack-title">
        tech stack
      </SectionHeading>

      <RetroWindow
        title="tech_stack.exe"
        menu={activeCategory.label}
        className="stack-browser"
      >
        <div className="stack-browser-body">
          <div
            className="stack-category-list"
            role="tablist"
            aria-label="Technology categories"
          >
            {TECH_STACK.map(({ id, label }) => {
              const isActive = id === activeCategoryId;

              return (
                <button
                  key={id}
                  id={`stack-tab-${id}`}
                  className={`stack-category${
                    isActive ? " is-active" : ""
                  }`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`stack-panel-${id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveCategoryId(id)}
                >
                  <FolderRoundedIcon aria-hidden="true" />

                  <span>{label}</span>

                  {isActive && (
                    <ChevronRightRoundedIcon aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>

          <FadeInSection
            key={activeCategory.id}
            id={`stack-panel-${activeCategory.id}`}
            className="stack-items-panel"
            role="tabpanel"
            aria-labelledby={`stack-tab-${activeCategory.id}`}
            tabIndex={0}
            motion="fade"
          >
            <ul className="stack-items-grid">
              {activeCategory.items.map(({ name, icon, Icon }) => (
                <li key={name}>
                  <span
                    className="tech-icon-box"
                    aria-hidden="true"
                  >
                    {icon ? (
                      <IconifyIcon
                        icon={icon}
                        className="tech-icon"
                      />
                    ) : (
                      <Icon className="tech-icon tech-icon--concept" />
                    )}
                  </span>

                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </FadeInSection>
        </div>
      </RetroWindow>
    </section>
  );
}