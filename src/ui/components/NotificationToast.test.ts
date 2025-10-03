import { beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { NotificationToast } from './NotificationToast';

describe('NotificationToast', () => {
  let toast: NotificationToast;

  beforeAll(() => {
    if (!customElements.get('notification-toast')) {
      customElements.define('notification-toast', NotificationToast);
    }
  });

  beforeEach(() => {
    toast = new NotificationToast();
    document.body.appendChild(toast);
  });

  it('should render notification message', () => {
    toast.show({
      documentTitle: 'New Document',
      userName: 'John Doe'
    });

    const { shadowRoot } = toast;
    expect(shadowRoot?.textContent).toContain('John Doe');
    expect(shadowRoot?.textContent).toContain('New Document');
  });

  it('should hide after timeout', async () => {
    toast.show({
      documentTitle: 'Test',
      userName: 'Jane'
    });

    const { shadowRoot } = toast;
    const toastElement = shadowRoot?.querySelector('.toast');

    expect(toastElement?.classList.contains('show')).toBe(true);

    await new Promise(resolve => setTimeout(resolve, 3500));

    expect(toastElement?.classList.contains('show')).toBe(false);
  });

  it('should be initially hidden', () => {
    const { shadowRoot } = toast;
    const toastElement = shadowRoot?.querySelector('.toast');

    expect(toastElement?.classList.contains('show')).toBe(false);
  });

  it('should close when close button is clicked', () => {
    toast.show({
      documentTitle: 'Test Document',
      userName: 'Test User'
    });

    const { shadowRoot } = toast;
    const toastElement = shadowRoot?.querySelector('.toast');
    const closeButton = shadowRoot?.querySelector('.toast-close') as HTMLButtonElement;

    expect(toastElement?.classList.contains('show')).toBe(true);
    expect(closeButton).toBeTruthy();

    closeButton?.click();

    expect(toastElement?.classList.contains('show')).toBe(false);
  });
});
