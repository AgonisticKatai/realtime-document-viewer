import styles from './NotificationToast.css?inline';

interface ToastData {
  documentTitle: string;
  userName: string;
}

export class NotificationToast extends HTMLElement {
  private hideTimeout: number | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.render();
  }

  show({ documentTitle, userName }: ToastData): void {
    this.updateContent({ documentTitle, userName });

    const toast = this.shadowRoot?.querySelector('.toast');
    toast?.classList.add('show');

    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }

    this.hideTimeout = window.setTimeout(() => {
      this.hide();
    }, 3000);
  }

  private hide(): void {
    const toast = this.shadowRoot?.querySelector('.toast');
    toast?.classList.remove('show');
  }

  private render(): void {
    if (!this.shadowRoot) {
      return;
    }

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      
      <div class="toast">
        <div class="toast-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div class="toast-content">
          <div class="toast-title">New document added</div>
          <div class="toast-message"></div>
        </div>
      </div>
    `;
  }

  private updateContent({ documentTitle, userName }: ToastData): void {
    const message = this.shadowRoot?.querySelector('.toast-message');
    if (message) {
      message.textContent = `${userName} created "${documentTitle}"`;
    }
  }
}

customElements.define('notification-toast', NotificationToast);
