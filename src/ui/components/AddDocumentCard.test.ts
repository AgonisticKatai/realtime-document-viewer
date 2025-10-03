import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { AddDocumentCard } from './AddDocumentCard';

describe('AddDocumentCard', () => {
  let card: AddDocumentCard;

  beforeAll(() => {
    if (!customElements.get('add-document-card')) {
      customElements.define('add-document-card', AddDocumentCard);
    }
  });

  beforeEach(() => {
    card = new AddDocumentCard();
    document.body.appendChild(card);
  });

  it('should render button with text', () => {
    const { shadowRoot } = card;
    expect(shadowRoot).not.toBeNull();

    const button = shadowRoot?.querySelector('button');
    expect(button).not.toBeNull();
    expect(button?.textContent).toContain('Add document');
  });

  it('should render icon', () => {
    const { shadowRoot } = card;
    const svg = shadowRoot?.querySelector('svg');

    expect(svg).not.toBeNull();
  });

  it('should emit add event when clicked', () => {
    const handler = vi.fn();
    card.addEventListener('add', handler);

    const button = card.shadowRoot?.querySelector('button') as HTMLButtonElement;
    button.click();

    expect(handler).toHaveBeenCalled();
  });
});
