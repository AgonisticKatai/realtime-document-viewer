import { Document } from './domain/models/Document';
import { GetDocumentsUseCase } from './domain/usecases/GetDocumentsUseCase';
import { SortBy, SortDocumentsUseCase } from './domain/usecases/SortDocumentsUseCase';
import { HttpDocumentRepository } from './infrastructure/http/HttpDocumentRepository';
import './styles/main.css';
import { DocumentCard } from './ui/components/DocumentCard';
import './ui/components/SortControl';
import { type ViewMode } from './ui/components/ViewToggle';
import './ui/components/ViewToggle';

let allDocuments: Document[] = [];
let currentViewMode: ViewMode = 'grid';

const sortDocumentsUseCase = new SortDocumentsUseCase();

async function fetchDocuments() {
  const repository = new HttpDocumentRepository({ baseUrl: 'http://localhost:8080' });
  const getDocumentsUseCase = new GetDocumentsUseCase(repository);

  try {
    allDocuments = await getDocumentsUseCase.execute();
    renderDocuments();
  } catch (error) {
    console.error('Error loading documents:', error);
  }
}

function renderDocuments({ sortBy }: { sortBy?: SortBy } = {}) {
  const documents = sortBy
    ? sortDocumentsUseCase.execute({ documents: allDocuments, sortBy })
    : allDocuments;

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
}

function initApp() {
  fetchDocuments();

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
