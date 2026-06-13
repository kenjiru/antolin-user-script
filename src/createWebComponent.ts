import picoStyles from '@picocss/pico/css/pico.min.css?inline';

const CUSTOM_ELEMENT_TAG = 'antolin-user-script';

/**
 * Create a WebComponent just to isolate the styles of the app from any interference from the host page.
 */
class AntolinUserScriptComponent extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // 1. Create the style element
        const style = document.createElement('style');
        style.appendChild(document.createTextNode(picoStyles));

        // 2. Append it directly to this component's shadow root
        this.shadowRoot?.appendChild(style);
    }
}

export function createCustomComponent() {
    if (customElements.get(CUSTOM_ELEMENT_TAG)) {
        return;
    }

    customElements.define(CUSTOM_ELEMENT_TAG, AntolinUserScriptComponent);
    document.body.appendChild(new AntolinUserScriptComponent());
}
