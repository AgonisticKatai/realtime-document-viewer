import { GetDocumentsUseCase } from './domain/usecases/GetDocumentsUseCase';
import { HttpDocumentRepository } from './infrastructure/http/HttpDocumentRepository';
import './styles/main.css';
import { DocumentCard } from './ui/components/DocumentCard';

async function initApp() {
  const repository = new HttpDocumentRepository({ baseUrl: 'http://localhost:8080' });
  const getDocumentsUseCase = new GetDocumentsUseCase(repository);

  try {
    const documents = await getDocumentsUseCase.execute();

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

initApp();
