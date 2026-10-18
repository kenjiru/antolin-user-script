import styles from './DashboardControls.css?inline';

interface DashboardControlsProps {
  onExport: () => void;
  onReset: () => void;
}

export function DashboardControls({ onExport, onReset }: DashboardControlsProps) {
  return (
    <>
      <style>{styles}</style>
      <div className="antolin-dashboard-controls">
        <button
          onClick={onExport}
          className="outline secondary antolin-dashboard-controls-btn"
        >
          📥 Export JSON
        </button>
        <button
          onClick={onReset}
          className="outline contrast antolin-dashboard-controls-btn"
        >
          🗑️ Reset Profile
        </button>
      </div>
    </>
  );
}
