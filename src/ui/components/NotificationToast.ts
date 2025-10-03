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
      
      <div 
        aria-atomic="true"
        aria-live="assertive"
        class="toast" 
        role="alert" 
      >
        <div aria-hidden="true" class="toast-icon">
          <svg class="icon-success" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <svg class="icon-error" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="toast-content">
          <div class="toast-title" role="status"></div>
          <div class="toast-message"></div>
        </div>
        <button 
          aria-label="Close notification"
          class="toast-close" 
          title="Dismiss this notification"
          type="button"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    `;

    this.setupCloseButton();
  }

  private setupCloseButton(): void {
    const closeButton = this.shadowRoot?.querySelector('.toast-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        if (this.hideTimeout) {
          clearTimeout(this.hideTimeout);
          this.hideTimeout = null;
        }
        this.hide();
      });
    }
  }

  private updateContent({ documentTitle, userName }: ToastData): void {
    const message = this.shadowRoot?.querySelector('.toast-message');
    if (message) {
      message.textContent = `${userName} created "${documentTitle}"`;
    }
  }
}

customElements.define('notification-toast', NotificationToast);
