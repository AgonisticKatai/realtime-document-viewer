import { Document } from './domain/models/Document';
import { CreateDocumentUseCase } from './domain/usecases/CreateDocumentUseCase';
import { GetDocumentsUseCase } from './domain/usecases/GetDocumentsUseCase';
import { SortDocumentsUseCase } from './domain/usecases/SortDocumentsUseCase';
import { HttpDocumentRepository } from './infrastructure/http/HttpDocumentRepository';
import { WebSocketNotificationService } from './infrastructure/websocket/WebSocketNotificationService';
import { DocumentCard } from './ui/components/DocumentCard';
import { NotificationToast } from './ui/components/NotificationToast';

import type { SortBy } from './domain/types';
import type { ViewMode } from './ui/types';

import './styles/main.css';

import './ui/components/AddDocumentCard';
import './ui/components/DocumentForm';
import './ui/components/SortControl';
import './ui/components/ViewToggle';

let allDocuments: Document[] = [];
let currentViewMode: ViewMode = 'grid';

const sortDocumentsUseCase = new SortDocumentsUseCase();
const createDocumentUseCase = new CreateDocumentUseCase();
const notificationService = new WebSocketNotificationService({
  url: 'ws://localhost:8080/notifications'
});

async function fetchDocuments() {
  const repository = new HttpDocumentRepository({ baseUrl: 'http://localhost:8080' });
  const getDocumentsUseCase = new GetDocumentsUseCase(repository);

  const [error, documents] = await getDocumentsUseCase.execute();
  if (error) {
    console.error('Error loading documents:', error);
    return;
  }

  allDocuments = documents as Document[];
  renderDocuments();
}

function renderDocuments({ sortBy }: { sortBy?: SortBy } = {}) {
  let documents = allDocuments;

  if (sortBy) {
    const [error, sortedDocs] = sortDocumentsUseCase.execute({ documents: allDocuments, sortBy });

    if (error) {
      console.error('Error sorting documents:', error);
      return;
    }

    documents = sortedDocs as Document[];
  }

  const container = document.getElementById('documentList');

  if (!container) {
    return;
  }

  container.innerHTML = '';
  container.className = currentViewMode === 'list' ? 'document-list list-view' : 'document-list';

  documents.forEach(doc => {
    const card = new DocumentCard();
    card.document = doc;
    card.mode = currentViewMode;
    container.appendChild(card);
  });

  const addCard = document.createElement('add-document-card');
  addCard.addEventListener('add', showCreateDocumentForm);
  container.appendChild(addCard);
}

function showCreateDocumentForm() {
  const form = document.createElement('document-form');
  document.body.appendChild(form);

  form.addEventListener('documentsubmit', ((event: CustomEvent) => {
    const { name, contributors, attachments } = event.detail;

    const [error, newDocument] = createDocumentUseCase.execute({
      attachments,
      contributors,
      name
    });

    if (error) {
      console.error('Error creating document:', error);
      return;
    }

    allDocuments = [newDocument as Document, ...allDocuments];
    renderDocuments();

    document.body.removeChild(form);
  }) as EventListener);

  form.addEventListener('close', () => {
    document.body.removeChild(form);
  });
}

function showNotification({ documentTitle, userName }: { documentTitle: string; userName: string }) {
  const container = document.getElementById('notifications');
  if (!container) {
    return;
  }

  const toast = new NotificationToast();
  container.appendChild(toast);

  toast.show({ documentTitle, userName });

  setTimeout(() => {
    if (container.contains(toast)) {
      container.removeChild(toast);
    }
  }, 3500);
}

function initApp() {
  fetchDocuments();

  notificationService.onNotification((notification) => {
    showNotification({
      documentTitle: notification.documentTitle,
      userName: notification.userName
    });
  });

  notificationService.connect();

  const sortControl = document.querySelector('sort-control');

  if (sortControl) {
    sortControl.addEventListener('sortchange', ((event: CustomEvent) => {
      const { sortBy } = event.detail;
      renderDocuments({ sortBy });
    }) as EventListener);
  }

  const viewToggle = document.querySelector('view-toggle');

  if (viewToggle) {
    viewToggle.addEventListener('viewchange', ((event: CustomEvent) => {
      const { mode } = event.detail;
      currentViewMode = mode;
      renderDocuments();
    }) as EventListener);
  }
}

initApp();
