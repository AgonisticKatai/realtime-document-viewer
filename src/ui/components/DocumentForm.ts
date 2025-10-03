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
      
      <div class="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h2 class="modal-title">Create New Document</h2>
            <button type="button" class="close-button" aria-label="Close">&times;</button>
          </div>
          
          <form>
            <div class="form-group">
              <label for="documentName" class="form-label">Document Name *</label>
              <input 
                type="text" 
                id="documentName" 
                class="form-input" 
                required 
                placeholder="Enter document name"
              />
            </div>
            
            <div class="form-group">
              <label for="contributors" class="form-label">Contributors</label>
              <textarea 
                id="contributors" 
                class="form-textarea" 
                placeholder="Enter contributor names (one per line)"
              ></textarea>
              <p class="form-hint">Optional: Enter one name per line</p>
            </div>
            
            <div class="form-group">
              <label for="attachments" class="form-label">Attachments</label>
              <textarea 
                id="attachments" 
                class="form-textarea" 
                placeholder="Enter attachment names (one per line)"
              ></textarea>
              <p class="form-hint">Optional: Enter one attachment per line</p>
            </div>
            
            <div class="form-actions">
              <button type="button" class="button button-secondary close-btn">Cancel</button>
              <button type="submit" class="button button-primary">Create Document</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  private attachEventListeners(): void {
    const formElement = this.shadowRoot?.querySelector('form');
    const closeButtons = this.shadowRoot?.querySelectorAll('.close-button, .close-btn');

    formElement?.addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleSubmit();
    });

    closeButtons?.forEach(button => {
      button.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('close'));
      });
    });
  }

  private handleSubmit(): void {
    const nameInput = this.shadowRoot?.querySelector('#documentName') as HTMLInputElement;
    const contributorsInput = this.shadowRoot?.querySelector('#contributors') as HTMLTextAreaElement;
    const attachmentsInput = this.shadowRoot?.querySelector('#attachments') as HTMLTextAreaElement;

    const name = nameInput.value.trim();

    if (!name) {
      return;
    }

    const formData: DocumentFormData = {
      attachments: this.parseTextarea({ value: attachmentsInput.value }),
      contributors: this.parseTextarea({ value: contributorsInput.value }),
      name
    };

    this.dispatchEvent(new CustomEvent('documentsubmit', {
      detail: formData
    }));
  }

  private parseTextarea({ value }: { value: string }): string[] {
    return value
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
  }
}

customElements.define('document-form', DocumentForm);
