import styles from './SortControl.css?inline';

import type { SortBy } from '../../domain/types';

export class SortControl extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.render();
    this.attachEventListeners();
  }

  private render(): void {

    if (!this.shadowRoot) {
      return;
    }

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      
      <div class="sort-control">
        <label for="sortBy">Sort documents by:</label>
        <select 
          aria-describedby="sort-description"
          id="sortBy" 
          title="Choose how to sort the document list"
        >
          <option value="">Choose sorting option...</option>
          <option value="name">Name (A-Z)</option>
          <option value="version">Version number</option>
          <option value="createdAt">Creation date (newest first)</option>
        </select>
        <div class="sr-only" id="sort-description">
          Select how you want to sort the documents in the list
        </div>
      </div>
    `;
  }

  private attachEventListeners(): void {
    const select = this.shadowRoot?.querySelector('select');

    if (select) {
      select.addEventListener('change', () => {
        const sortBy = select.value as SortBy | '';
        this.dispatchEvent(new CustomEvent('sortchange', {
          detail: { sortBy: sortBy === '' ? undefined : sortBy }
        }));
      });
    }
  }
}

customElements.define('sort-control', SortControl);
