import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { DocumentForm } from './DocumentForm';

describe('DocumentForm', () => {
  let form: DocumentForm;

  beforeAll(() => {
    if (!customElements.get('document-form')) {
      customElements.define('document-form', DocumentForm);
    }
  });

  beforeEach(() => {
    form = new DocumentForm();
    document.body.appendChild(form);
  });

  it('should render form with name input', () => {
    const { shadowRoot } = form;
    expect(shadowRoot).not.toBeNull();

    const nameInput = shadowRoot?.querySelector('#documentName') as HTMLInputElement;
    expect(nameInput).not.toBeNull();
    expect(nameInput.type).toBe('text');
  });

  it('should render contributors and attachments inputs', () => {
    const { shadowRoot } = form;

    const contributorsInput = shadowRoot?.querySelector('#contributors') as HTMLTextAreaElement;
    const attachmentsInput = shadowRoot?.querySelector('#attachments') as HTMLTextAreaElement;

    expect(contributorsInput).not.toBeNull();
    expect(attachmentsInput).not.toBeNull();
  });

  it('should emit submit event when form is submitted with valid data', () => {
    const handler = vi.fn();
    form.addEventListener('documentsubmit', handler);

    const { shadowRoot } = form;
    const nameInput = shadowRoot?.querySelector('#documentName') as HTMLInputElement;
    const formElement = shadowRoot?.querySelector('form') as HTMLFormElement;

    nameInput.value = 'Test Document';
    formElement.dispatchEvent(new Event('submit'));

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail.name).toBe('Test Document');
  });

  it('should not submit if name is empty', () => {
    const handler = vi.fn();
    form.addEventListener('documentsubmit', handler);

    const { shadowRoot } = form;
    const formElement = shadowRoot?.querySelector('form') as HTMLFormElement;

    formElement.dispatchEvent(new Event('submit'));

    expect(handler).not.toHaveBeenCalled();
  });
});
