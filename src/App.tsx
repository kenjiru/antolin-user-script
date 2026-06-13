import { useState } from 'preact/hooks';

export function App() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 99999,
      maxWidth: '350px'
    }}>
      <article style={{ margin: 0 }}>
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
        }}>
          <strong>Antolin User Script</strong>
          <button
            onClick={() => setVisible(false)}
            className="outline contrast"
          >
            Close
          </button>
        </header>
        <p style={{ fontSize: '14px', margin: 0 }}>
          Preact, TypeScript, and Pico CSS are successfully initialized and running on this page!
        </p>
      </article>
    </div>
  );
}

