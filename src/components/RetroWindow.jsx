import "../styles/RetroWindow.css";

export default function RetroWindow({
  title,
  menu,
  children,
  className = "",
}) {
  return (
    <div className={`retro-window ${className}`}>
      <div className="retro-window-titlebar">
        <div className="retro-window-title">
          <span
            className="retro-window-app-icon"
            aria-hidden="true"
          />

          <span>{title}</span>
        </div>

        <div
          className="retro-window-controls"
          aria-hidden="true"
        >
          <span className="retro-window-minimize" />
          <span className="retro-window-maximize" />
          <span className="retro-window-close" />
        </div>
      </div>

      {menu && (
        <div className="retro-window-menu">
          {menu}
        </div>
      )}

      <div className="retro-window-content">
        {children}
      </div>
    </div>
  );
}