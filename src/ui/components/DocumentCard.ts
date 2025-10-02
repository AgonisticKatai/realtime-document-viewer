import { Document } from '../../domain/models/Document';
import styles from './DocumentCard.css?inline';

export class DocumentCard extends HTMLElement {
  private _document: Document | null = null;
  private _mode: 'list' | 'grid' = 'grid';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.render();
  }

  get document(): Document | null {
    return this._document;
  }

  set document(doc: Document) {
    this._document = doc;
    this.render();
  }

  get mode(): 'list' | 'grid' {
    return this._mode;
  }

  set mode(value: 'list' | 'grid') {
    this._mode = value;
    this.render();
  }

  private render(): void {
    if (!this.shadowRoot || !this._document) {
      return;
    }

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      
      <div class="card">
        <div class="card-title">${this.escapeHtml(this._document.name)}</div>
        <div class="card-version">Version ${this._document.version}</div>
        
        <div class="card-section">
          <div class="section-title">Contributors</div>
          <div class="contributor-list">
            ${this.renderContributors(this._document)}
          </div>
        </div>
        
        <div class="card-section">
          <div class="section-title">Attachments</div>
          <div class="attachment-list">
            ${this.renderAttachments(this._document)}
          </div>
        </div>
      </div>
    `;
  }

  private renderContributors(document: Document): string {
    return document.contributors
      .map(contributor => `<div>${this.escapeHtml(contributor.name)}</div>`)
      .join('');
  }

  private renderAttachments(document: Document): string {
    return document.attachments
      .map(attachment => `<div>${this.escapeHtml(attachment)}</div>`)
      .join('');
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

customElements.define('document-card', DocumentCard);
