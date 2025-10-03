import styles from './DocumentForm.css?inline';

import type { DocumentFormData } from '../types';

export class DocumentForm extends HTMLElement {
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
      
      <div 
        aria-describedby="modal-description"
        aria-labelledby="modal-title"
        aria-modal="true"
        class="modal-overlay" 
        role="dialog" 
      >
        <div class="modal">
          <div class="modal-header">
            <h2 class="modal-title" id="modal-title">Create New Document</h2>
            <button 
              aria-label="Close dialog"
              class="close-button" 
              title="Cancel and close form"
              type="button" 
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          
          <div class="sr-only" id="modal-description">
            Form to create a new document with name, contributors, and attachments
          </div>
          
          <form aria-label="New document form" novalidate>
            <div class="form-group">
              <label class="form-label" for="documentName">
                Document Name 
                <span aria-label="required" class="required-indicator">*</span>
              </label>
              <input 
                aria-describedby="name-error"
                aria-invalid="false"
                aria-required="true"
                autocomplete="off"
                class="form-input" 
                id="documentName" 
                placeholder="Enter document name"
                required 
                type="text" 
              />
              <div aria-live="polite" class="error-message" id="name-error" role="alert"></div>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="contributors">Contributors</label>
              <textarea 
                aria-describedby="contributors-hint"
                class="form-textarea" 
                id="contributors" 
                placeholder="Enter contributor names (one per line)"
                rows="3"
              ></textarea>
              <p class="form-hint" id="contributors-hint">
                Optional: Enter one name per line
              </p>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="attachments">Attachments</label>
              <textarea 
                aria-describedby="attachments-hint"
                class="form-textarea" 
                id="attachments" 
                placeholder="Enter attachment names (one per line)"
                rows="3"
              ></textarea>
              <p class="form-hint" id="attachments-hint">
                Optional: Enter one attachment per line
              </p>
            </div>
            
            <div class="form-actions">
              <button 
                aria-describedby="cancel-description"
                class="button button-secondary close-btn"
                type="button" 
              >
                Cancel
              </button>
              <div class="sr-only" id="cancel-description">
                Cancel form submission and close dialog
              </div>
              <button 
                aria-describedby="submit-description"
                class="button button-primary"
                type="submit" 
              >
                Create Document
              </button>
              <div class="sr-only" id="submit-description">
                Submit form to create new document
              </div>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  private attachEventListeners(): void {
    const formElement = this.shadowRoot?.querySelector('form');
    const closeButtons = this.shadowRoot?.querySelectorAll('.close-button, .close-btn');
    const nameInput = this.shadowRoot?.querySelector('#documentName') as HTMLInputElement;
    const modalOverlay = this.shadowRoot?.querySelector('.modal-overlay');

    formElement?.addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleSubmit();
    });

    closeButtons?.forEach(button => {
      button.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('close'));
      });
    });

    // Real-time validation
    nameInput?.addEventListener('blur', () => {
      this.validateName();
    });

    nameInput?.addEventListener('input', () => {
      this.clearValidationError();
    });

    // Keyboard navigation
    modalOverlay?.addEventListener('keydown', (event) => {
      this.handleKeydown(event as KeyboardEvent);
    });

    // Focus management
    this.focusFirstInput();
  }

  private handleKeydown(event: KeyboardEvent): void {
    // Escape key closes modal
    if (event.key === 'Escape') {
      event.preventDefault();
      this.dispatchEvent(new CustomEvent('close'));
      return;
    }

    // Tab key management for focus trapping
    if (event.key === 'Tab') {
      this.handleTabKey(event);
    }
  }

  private handleTabKey(event: KeyboardEvent): void {
    const focusableElements = this.shadowRoot?.querySelectorAll(
      'input, textarea, button, [tabindex]:not([tabindex="-1"])'
    );

    if (!focusableElements || focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (event.shiftKey) {
      // Shift + Tab: backward navigation
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab: forward navigation
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  private focusFirstInput(): void {
    // Focus the first input after a short delay to ensure the modal is rendered
    setTimeout(() => {
      const nameInput = this.shadowRoot?.querySelector('#documentName') as HTMLInputElement;
      nameInput?.focus();
    }, 100);
  }

  private validateName(): boolean {
    const nameInput = this.shadowRoot?.querySelector('#documentName') as HTMLInputElement;
    const errorElement = this.shadowRoot?.querySelector('#name-error');

    if (!nameInput || !errorElement) return false;

    const name = nameInput.value.trim();

    if (!name) {
      nameInput.setAttribute('aria-invalid', 'true');
      errorElement.textContent = 'Document name is required';
      return false;
    }

    if (name.length < 3) {
      nameInput.setAttribute('aria-invalid', 'true');
      errorElement.textContent = 'Document name must be at least 3 characters long';
      return false;
    }

    nameInput.setAttribute('aria-invalid', 'false');
    errorElement.textContent = '';
    return true;
  }

  private clearValidationError(): void {
    const nameInput = this.shadowRoot?.querySelector('#documentName') as HTMLInputElement;
    const errorElement = this.shadowRoot?.querySelector('#name-error');

    if (nameInput && errorElement) {
      nameInput.setAttribute('aria-invalid', 'false');
      errorElement.textContent = '';
    }
  }

  private handleSubmit(): void {
    // Validate form before submission
    if (!this.validateName()) {
      // Focus on the invalid field
      const nameInput = this.shadowRoot?.querySelector('#documentName') as HTMLInputElement;
      nameInput?.focus();
      return;
    }

    const nameInput = this.shadowRoot?.querySelector('#documentName') as HTMLInputElement;
    const contributorsInput = this.shadowRoot?.querySelector('#contributors') as HTMLTextAreaElement;
    const attachmentsInput = this.shadowRoot?.querySelector('#attachments') as HTMLTextAreaElement;

    const name = nameInput.value.trim();

    const formData: DocumentFormData = {
      attachments: this.parseTextarea({ value: attachmentsInput.value }),
      contributors: this.parseTextarea({ value: contributorsInput.value }),
      name
    };

    // Announce successful submission to screen readers
    this.announceSubmission();

    this.dispatchEvent(new CustomEvent('documentsubmit', {
      detail: formData
    }));
  }

  private announceSubmission(): void {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = 'Document created successfully';

    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  private parseTextarea({ value }: { value: string }): string[] {
    return value
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
  }
}

customElements.define('document-form', DocumentForm);
