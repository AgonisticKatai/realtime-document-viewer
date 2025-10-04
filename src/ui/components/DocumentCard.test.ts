import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { DocumentCard } from './DocumentCard';
import { Contributor } from '../../domain/models/Contributor';
import { Document } from '../../domain/models/Document';

describe('DocumentCard', () => {
  let card: DocumentCard;
  let testDocument: Document;

  beforeAll(() => {
    // Registrar el componente antes de todos los tests
    if (!customElements.get('document-card')) {
      customElements.define('document-card', DocumentCard);
    }
  });

  beforeEach(() => {
    testDocument = Document.create({
      attachments: ['Attachment 1', 'Attachment 2'],
      contributors: [
        Contributor.create({ id: 'c1', name: 'John Doe' }),
        Contributor.create({ id: 'c2', name: 'Jane Smith' })
      ],
      createdAt: new Date('2024-01-15'),
      id: 'd1',
      name: 'Test Document',
      version: '1.0.0'
    });

    card = new DocumentCard();
    document.body.appendChild(card);
    card.document = testDocument;
  });

  afterEach(() => {
    if (card.parentNode) {
      document.body.removeChild(card);
    }
  });

  it('should have shadow root', () => {
    expect(card.shadowRoot).not.toBeNull();
  });

  it('should render document name', () => {
    const { shadowRoot } = card;
    expect(shadowRoot).not.toBeNull();

    const cardTitle = shadowRoot?.querySelector('.card-title');
    expect(cardTitle?.textContent).toBe('Test Document');
  });

  it('should render version', () => {
    const { shadowRoot } = card;
    expect(shadowRoot).not.toBeNull();

    const cardVersion = shadowRoot?.querySelector('.card-version');
    expect(cardVersion?.textContent).toBe('Version 1.0.0');
  });

  it('should render contributors', () => {
    const { shadowRoot } = card;
    expect(shadowRoot).not.toBeNull();

    const contributorList = shadowRoot?.querySelector('.contributor-list');
    expect(contributorList?.textContent).toContain('John Doe');
    expect(contributorList?.textContent).toContain('Jane Smith');
  });

  it('should display relative time format', () => {
    const recentDocument = Document.create({
      attachments: [],
      contributors: [Contributor.create({ id: 'c1', name: 'Test User' })],
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      id: 'd2',
      name: 'Recent Document',
      version: '1.0.0'
    });

    card.document = recentDocument;

    const { shadowRoot } = card;
    expect(shadowRoot).not.toBeNull();

    const cardDate = shadowRoot?.querySelector('.card-date');
    expect(cardDate?.textContent).toMatch(/ago|yesterday|days? ago/);
  });
});
