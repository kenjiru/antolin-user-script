import { h, render } from 'preact';
import { FunctionComponent } from 'preact/compat';

const HOST_NODE_ID = 'app-root';
const CUSTOM_COMPONENT_TAG = 'antolin-user-script';

export function renderComponent(component: FunctionComponent) {
    const div = document.createElement('div');
    div.id = HOST_NODE_ID;

    const AntolinUserScriptComponent = window.document.querySelector(CUSTOM_COMPONENT_TAG);

    if (AntolinUserScriptComponent?.shadowRoot?.querySelector(`#${HOST_NODE_ID}`)) {
        return;
    }

    AntolinUserScriptComponent?.shadowRoot?.appendChild(div);

    render(h(component, {}), div);
}
