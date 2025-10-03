import styles from './AddDocumentCard.css?inline';

export class AddDocumentCard extends HTMLElement {
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
      
      <button class="add-card">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span>Add document</span>
      </button>
    `;
  }

  private attachEventListeners(): void {
    const button = this.shadowRoot?.querySelector('button');
    button?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('add'));
    });
  }
}

customElements.define('add-document-card', AddDocumentCard);
