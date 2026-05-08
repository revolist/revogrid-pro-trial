/**
 * Application entry point for the RevoGrid Pro Trial examples.
 *
 * Responsibilities:
 * - Register the RevoGrid custom element once.
 * - Render the shared examples shell.
 * - Keep the top switch and URL hash in sync.
 * - Mount exactly one example at a time and clean it up before switching.
 */
import { defineCustomElements } from '@revolist/revogrid/loader';
import '@revolist/rv-pro-trial/dist/rv-pro-trial.css';
import '@revolist/rv-enterprise-trial/dist/rv-enterprise-trial.css';
import './styles.css';

import { examples } from './examples';
import type { ExampleId, MountCleanup } from './shared/types';

defineCustomElements();

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('Missing #app mount element');
}

app.innerHTML = `
  <div class="app-shell">
    <section class="app-frame">
      <header class="app-header">
        <div class="title-block">
          <p class="eyebrow">RevoGrid Pro Trial</p>
          <h1>Examples</h1>
        </div>
        <nav class="example-switch" aria-label="Example switch"></nav>
      </header>
      <main class="app-main">
        <section class="example-panel" id="example-panel"></section>
      </main>
    </section>
  </div>
`;

const switcher = app.querySelector<HTMLElement>('.example-switch');
const panel = app.querySelector<HTMLElement>('#example-panel');

if (!switcher || !panel) {
  throw new Error('Example shell failed to initialize');
}

const switcherEl = switcher;
const panelEl = panel;
let cleanup: MountCleanup | undefined;

examples.forEach((example) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'switch-button';
  button.textContent = example.label;
  button.dataset.example = example.id;
  button.setAttribute('role', 'tab');
  button.addEventListener('click', () => setActiveExample(example.id));
  switcherEl.appendChild(button);
});

window.addEventListener('hashchange', () => {
  setActiveExample(readExampleFromHash());
});

setActiveExample(readExampleFromHash());

/**
 * Mount an example by id and update the selected tab state.
 *
 * @param id - Stable example id from `src/examples/index.ts`.
 */
function setActiveExample(id: ExampleId) {
  const example = examples.find((item) => item.id === id) ?? examples[0];

  if (window.location.hash !== `#${example.id}`) {
    history.replaceState(null, '', `#${example.id}`);
  }

  switcherEl.querySelectorAll<HTMLButtonElement>('.switch-button').forEach((button) => {
    button.setAttribute('aria-selected', String(button.dataset.example === example.id));
  });

  cleanup?.();
  panelEl.replaceChildren();
  cleanup = example.mount(panelEl, example.title, example.description);
}

/**
 * Read the current example from the URL hash.
 *
 * Unknown hashes intentionally fall back to `tree`, the simplest example.
 */
function readExampleFromHash(): ExampleId {
  const id = window.location.hash.replace('#', '');
  return examples.some((example) => example.id === id) ? (id as ExampleId) : 'tree';
}
