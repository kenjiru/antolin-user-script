import styles from './FloatingBadge.css?inline';

interface FloatingBadgeProps {
  onShow: () => void;
}

export function FloatingBadge({ onShow }: FloatingBadgeProps) {
  return (
    <>
      <style>{styles}</style>
      <div className="antolin-floating-badge-container">
        <button
          onClick={onShow}
          className="secondary antolin-floating-badge-button"
        >
          📊 Show Antolin Stats
        </button>
      </div>
    </>
  );
}
