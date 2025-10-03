import type { ViewMode } from '../types';
import styles from './ViewToggle.css?inline';

export class ViewToggle extends HTMLElement {
  private _mode: ViewMode = 'grid';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.render();
    this.attachEventListeners();
  }

  get mode(): ViewMode {
    return this._mode;
  }

  set mode(value: ViewMode) {
    this._mode = value;
    this.render();
  }

  private render(): void {
    if (!this.shadowRoot) {
      return;
    }

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      
      <div class="view-toggle">
        <button 
          data-mode="list" 
          class="${this._mode === 'list' ? 'active' : ''}"
          aria-label="List view"
        >
          ${this.getListIcon()}
        </button>
        <button 
          data-mode="grid" 
          class="${this._mode === 'grid' ? 'active' : ''}"
          aria-label="Grid view"
        >
          ${this.getGridIcon()}
        </button>
      </div>
    `;
  }

  private attachEventListeners(): void {
    const buttons = this.shadowRoot?.querySelectorAll('button');

    buttons?.forEach(button => {
      button.addEventListener('click', () => {
        const newMode = button.getAttribute('data-mode') as ViewMode;
        if (newMode !== this._mode) {
          this._mode = newMode;
          this.render();
          this.attachEventListeners();
          this.dispatchEvent(new CustomEvent('viewchange', {
            detail: { mode: this._mode }
          }));
        }
      });
    });
  }

  private getListIcon(): string {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    `;
  }

  private getGridIcon(): string {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    `;
  }
}

customElements.define('view-toggle', ViewToggle);
