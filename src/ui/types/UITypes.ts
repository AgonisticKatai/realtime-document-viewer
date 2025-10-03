export type ViewMode = 'list' | 'grid';

export interface DocumentFormData {
  attachments: string[];
  contributors: string[];
  name: string;
}

export interface DocumentFormElement extends HTMLElement {
  show(): void;
  close(): void;
}
