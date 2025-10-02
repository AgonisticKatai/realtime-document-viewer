import { GetDocumentsUseCase, SortBy } from './domain/usecases/GetDocumentsUseCase';
import { HttpDocumentRepository } from './infrastructure/http/HttpDocumentRepository';
import './styles/main.css';
import { DocumentCard } from './ui/components/DocumentCard';
import './ui/components/SortControl';

async function renderDocuments({ sortBy }: { sortBy?: SortBy } = {}) {
  const repository = new HttpDocumentRepository({ baseUrl: 'http://localhost:8080' });
  const getDocumentsUseCase = new GetDocumentsUseCase(repository);

  try {
    const documents = await getDocumentsUseCase.execute({ sortBy });

    const container = document.getElementById('documentList');

    if (!container) {
      return;
    }

    documents.forEach(doc => {
      const card = new DocumentCard();
      card.document = doc;
      container.appendChild(card);
    });

  } catch (error) {
    console.error('Error loading documents:', error);
  }
}

function initApp() {
  renderDocuments();

  const sortControl = document.querySelector('sort-control');

  if (sortControl) {
    sortControl.addEventListener('sortchange', ((event: CustomEvent) => {
      const { sortBy } = event.detail;
      renderDocuments({ sortBy });
    }) as EventListener);
  }
}

initApp();
