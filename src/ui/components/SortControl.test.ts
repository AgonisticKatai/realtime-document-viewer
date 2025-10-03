import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { SortControl } from './SortControl';

describe('SortControl', () => {
  let control: SortControl;

  beforeAll(() => {
    if (!customElements.get('sort-control')) {
      customElements.define('sort-control', SortControl);
    }
  });

  beforeEach(() => {
    control = new SortControl();
    document.body.appendChild(control);
  });

  it('should render select with options', () => {
    const { shadowRoot } = control;
    expect(shadowRoot).not.toBeNull();

    const select = shadowRoot?.querySelector('select');
    expect(select).not.toBeNull();

    const options = shadowRoot?.querySelectorAll('option');
    expect(options?.length).toBe(4);
  });

  it('should emit sortchange event when selection changes', () => {
    const handler = vi.fn();
    control.addEventListener('sortchange', handler);

    const select = control.shadowRoot?.querySelector('select') as HTMLSelectElement;
    select.value = 'name';
    select.dispatchEvent(new Event('change'));

    expect(handler).toHaveBeenCalled();
  });
});
