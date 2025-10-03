import { Document } from '../domain/models/Document';
import { DocumentCard } from '../ui/components/DocumentCard';

import type { ViewMode } from '../ui/types';

export class UIRenderer {
  private currentViewMode: ViewMode = 'grid';

  setViewMode(mode: ViewMode): void {
    this.currentViewMode = mode;
  }

  renderDocuments(documents: Document[], onAddDocument: () => void): void {
    const container = document.getElementById('documentList');
    if (!container) {
      return;
    }

    container.innerHTML = '';
    container.className = this.currentViewMode === 'list'
      ? 'document-list list-view'
      : 'document-list';

    documents.forEach(doc => {
      const card = new DocumentCard();
      card.document = doc;
      card.mode = this.currentViewMode;
      container.appendChild(card);
    });

    const addCard = document.createElement('add-document-card');
    addCard.addEventListener('add', onAddDocument);
    container.appendChild(addCard);
  }
}
