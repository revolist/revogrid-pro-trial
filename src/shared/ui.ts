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

export function createActionButton(label: string) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'action-button';
  button.textContent = label;
  return button;
}

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
