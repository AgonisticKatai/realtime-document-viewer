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
        <label for="sortBy">Sort by:</label>
        <select id="sortBy">
          <option value="">Select one...</option>
          <option value="name">Name</option>
          <option value="version">Version</option>
          <option value="createdAt">Created Date</option>
        </select>
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
