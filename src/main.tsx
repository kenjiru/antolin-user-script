import { createCustomComponent } from './createWebComponent';
import { renderComponent } from './createApp.ts';
import { App } from './App';

// Ensure the script executes and mounts when the body is ready
function init() {
    createCustomComponent();
    setTimeout(() => renderComponent(App), 1);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
