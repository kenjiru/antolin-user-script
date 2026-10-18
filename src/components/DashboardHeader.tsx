import styles from './DashboardHeader.css?inline';

interface DashboardHeaderProps {
  minimized: boolean;
  onToggleMinimize: () => void;
  onClose: () => void;
}

export function DashboardHeader({ minimized, onToggleMinimize, onClose }: DashboardHeaderProps) {
  return (
    <>
      <style>{styles}</style>
      <header className="antolin-dashboard-header">
        <div className="antolin-dashboard-title-wrapper">
          <span className="antolin-dashboard-title-icon">📊</span>
          <strong className="antolin-dashboard-title-text">Antolin Stats Companion</strong>
        </div>
        <div className="antolin-dashboard-header-buttons">
          <button
            onClick={onToggleMinimize}
            className="outline secondary antolin-dashboard-header-btn"
            title={minimized ? "Expand dashboard" : "Minimize dashboard"}
          >
            {minimized ? '＋' : '－'}
          </button>
          <button
            onClick={onClose}
            className="outline contrast antolin-dashboard-header-btn"
          >
            Close
          </button>
        </div>
      </header>
    </>
  );
}
