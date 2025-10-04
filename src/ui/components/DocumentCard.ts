import styles from './DocumentCard.css?inline';
import { Document } from '../../domain/models/Document';

import type { ViewMode } from '../types';

export class DocumentCard extends HTMLElement {
  private _document: Document | null = null;
  private _mode: ViewMode = 'grid';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.setAttribute('mode', this._mode);
    this.render();
  }

  get document(): Document | null {
    return this._document;
  }

  set document(doc: Document) {
    this._document = doc;
    this.render();
  }

  get mode(): ViewMode {
    return this._mode;
  }

  set mode(value: ViewMode) {
    this._mode = value;
    this.setAttribute('mode', value);
    this.render();
  }

  private render(): void {
    if (!this.shadowRoot || !this._document) {
      return;
    }

    const formattedDate = this._document.createdAt.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      
      <article 
        aria-labelledby="title-${this._document.id}"
        class="card" 
        role="article"
        tabindex="0"
      >
        <header class="card-header">
          <h3 class="card-title" id="title-${this._document.id}">${this.escapeHtml(this._document.name)}</h3>
          <div class="card-version">Version ${this._document.version}</div>
          <div class="card-meta">
            <time 
              class="card-date"
              datetime="${this._document.createdAt.toISOString()}" 
              title="Created on ${formattedDate}"
            >
              ${formattedDate}
            </time>
          </div>
        </header>
        
        <div class="card-sections">
          <section class="card-section">
            <h4 class="section-title">Contributors</h4>
            <div 
              aria-label="${this._document.contributors.length} contributors"
              class="contributor-list" 
              role="list"
            >
              ${this.renderContributors(this._document)}
            </div>
          </section>
          
          <section class="card-section">
            <h4 class="section-title">Attachments</h4>
            <div 
              aria-label="${this._document.attachments.length} attachments"
              class="attachment-list" 
              role="list"
            >
              ${this.renderAttachments(this._document)}
            </div>
          </section>
        </div>
      </article>
    `;
  }

  private renderContributors(document: Document): string {
    if (document.contributors.length === 0) {
      return '<div class="empty-state" role="listitem">No contributors</div>';
    }

    return document.contributors
      .map(contributor => `
        <div class="contributor-item" role="listitem">
          <span class="contributor-name">${this.escapeHtml(contributor.name)}</span>
        </div>
      `)
      .join('');
  }

  private renderAttachments(document: Document): string {
    if (document.attachments.length === 0) {
      return '<div class="empty-state" role="listitem">No attachments</div>';
    }

    return document.attachments
      .map(attachment => `
        <div class="attachment-item" role="listitem">
          <span class="attachment-name">${this.escapeHtml(attachment)}</span>
        </div>
      `)
      .join('');
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

customElements.define('document-card', DocumentCard);
