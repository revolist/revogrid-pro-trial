/**
 * Small DOM helpers used by the plain TypeScript examples.
 *
 * The project intentionally avoids a framework so first-time users can see the
 * exact DOM nodes and RevoGrid properties involved.
 */

/**
 * Build the standard example layout.
 *
 * @param parent - Element that receives the toolbar and grid host.
 * @param title - Panel heading.
 * @param description - Short explanatory copy below the heading.
 * @returns The action slot and grid host for the mounted example.
 */
export function createPanelScaffold(parent: HTMLElement, title: string, description: string) {
  const toolbar = document.createElement('div');
  toolbar.className = 'panel-toolbar';

  const copy = document.createElement('div');
  copy.className = 'panel-copy';

  const heading = document.createElement('h2');
  heading.textContent = title;

  const text = document.createElement('p');
  text.textContent = description;

  const actions = document.createElement('div');
  actions.className = 'toolbar-actions';

  copy.append(heading, text);
  toolbar.append(copy, actions);

  const host = document.createElement('div');
  host.className = 'grid-host';

  parent.append(toolbar, host);

  return { actions, host };
}

/**
 * Create a styled command button for example toolbars.
 */
export function createActionButton(label: string) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'action-button';
  button.textContent = label;
  return button;
}

/**
 * Create a labeled checkbox toggle for compact example options.
 */
export function createToggle(labelText: string) {
  const label = document.createElement('label');
  label.className = 'toggle-label';

  const input = document.createElement('input');
  input.type = 'checkbox';

  const text = document.createElement('span');
  text.textContent = labelText;

  label.append(input, text);

  return { label, input };
}
