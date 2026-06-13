import { render } from 'preact';
import { App } from './App';

// Ensure the script executes and mounts when the body is ready
function init() {
  // Inject Pico CSS from CDN
  if (typeof GM_getResourceText === 'function' && typeof GM_addStyle === 'function') {
    const picoCss = GM_getResourceText('pico-css');
    GM_addStyle(picoCss);
  } else {
    // Development fallback: load Pico CSS dynamically via link element in page context
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/@picocss/pico@2.0.6/css/pico.min.css';
    document.head.appendChild(link);
  }

  const container = document.createElement('div');
  container.id = 'antolin-userscript-root';
  document.body.appendChild(container);

  render(<App />, container);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
