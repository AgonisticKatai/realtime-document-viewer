import styles from './ViewToggle.css?inline';

import type { ViewMode } from '../types';

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
      
      <div 
        aria-label="View mode selector"
        class="view-toggle" 
        role="group" 
      >
        <button 
          aria-label="Switch to list view"
          aria-pressed="${this._mode === 'list'}"
          class="${this._mode === 'list' ? 'active' : ''}"
          data-mode="list" 
          title="List view - display documents as a vertical list"
          type="button"
        >
          <span aria-hidden="true">${this.getListIcon()}</span>
          <span class="sr-only">List view</span>
        </button>
        <button 
          aria-label="Switch to grid view"
          aria-pressed="${this._mode === 'grid'}"
          class="${this._mode === 'grid' ? 'active' : ''}"
          data-mode="grid" 
          title="Grid view - display documents as cards in a grid"
          type="button"
        >
          <span aria-hidden="true">${this.getGridIcon()}</span>
          <span class="sr-only">Grid view</span>
        </button>
      </div>
    `;
  }

  private attachEventListeners(): void {
    const buttons = this.shadowRoot?.querySelectorAll('button');

    buttons?.forEach((button, index) => {
      button.addEventListener('click', () => {
        this.handleModeChange(button);
      });

      button.addEventListener('keydown', (event) => {
        this.handleKeydown(event, buttons, index);
      });
    });
  }

  private handleModeChange(button: HTMLButtonElement): void {
    const newMode = button.getAttribute('data-mode') as ViewMode;
    if (newMode !== this._mode) {
      this._mode = newMode;
      this.render();
      this.attachEventListeners();
      this.dispatchEvent(new CustomEvent('viewchange', {
        detail: { mode: this._mode }
      }));

      // Announce the change to screen readers
      this.announceChange(newMode);
    }
  }

  private handleKeydown(event: KeyboardEvent, buttons: NodeListOf<Element>, currentIndex: number): void {
    let targetIndex = currentIndex;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        targetIndex = currentIndex === 0 ? buttons.length - 1 : currentIndex - 1;
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        targetIndex = currentIndex === buttons.length - 1 ? 0 : currentIndex + 1;
        break;
      case 'Home':
        event.preventDefault();
        targetIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        targetIndex = buttons.length - 1;
        break;
      default:
        return;
    }

    (buttons[targetIndex] as HTMLButtonElement).focus();
  }

  private announceChange(mode: ViewMode): void {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `View changed to ${mode} mode`;

    document.body.appendChild(announcement);

    // Remove the announcement after screen readers have processed it
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
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
