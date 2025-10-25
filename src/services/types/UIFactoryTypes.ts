import type { Document } from '../../domain/models/Document';
import type { ViewMode } from '../../ui/types';

export interface DocumentCardElement extends HTMLElement {
  document: Document | null;
  mode: ViewMode;
}

export interface DocumentCardFactory {
  createCard(): DocumentCardElement;
}
