import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { ViewToggle } from './ViewToggle';

describe('ViewToggle', () => {
  let toggle: ViewToggle;

  beforeAll(() => {
    if (!customElements.get('view-toggle')) {
      customElements.define('view-toggle', ViewToggle);
    }
  });

  beforeEach(() => {
    toggle = new ViewToggle();
    document.body.appendChild(toggle);
  });

  it('should render two buttons', () => {
    const { shadowRoot } = toggle;
    expect(shadowRoot).not.toBeNull();

    const buttons = shadowRoot?.querySelectorAll('button');
    expect(buttons?.length).toBe(2);
  });

  it('should have grid mode active by default', () => {
    const { shadowRoot } = toggle;
    const gridButton = shadowRoot?.querySelector('[data-mode="grid"]');

    expect(gridButton?.classList.contains('active')).toBe(true);
  });

  it('should emit viewchange event when clicking list button', () => {
    const handler = vi.fn();
    toggle.addEventListener('viewchange', handler);

    const listButton = toggle.shadowRoot?.querySelector('[data-mode="list"]') as HTMLButtonElement;
    listButton.click();

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail).toEqual({ mode: 'list' });
  });

  it('should update active state when mode changes', () => {
    const { shadowRoot } = toggle;
    let listButton = shadowRoot?.querySelector('[data-mode="list"]') as HTMLButtonElement;

    listButton.click();

    // Re-buscar los elementos después del re-render
    listButton = shadowRoot?.querySelector('[data-mode="list"]') as HTMLButtonElement;
    const gridButton = shadowRoot?.querySelector('[data-mode="grid"]') as HTMLButtonElement;

    expect(listButton.classList.contains('active')).toBe(true);
    expect(gridButton?.classList.contains('active')).toBe(false);
  });
});
