import { InlineError } from '../domain/errors';
import { Document } from '../domain/models/Document';
import { CreateDocumentUseCase } from '../domain/usecases/CreateDocumentUseCase';
import { GetDocumentsUseCase } from '../domain/usecases/GetDocumentsUseCase';
import { SortDocumentsUseCase } from '../domain/usecases/SortDocumentsUseCase';
import { HttpDocumentRepository } from '../infrastructure/http/HttpDocumentRepository';

import type { DocumentServiceConfig } from './types';
import type { SortBy } from '../domain/types';
import type { CreateDocumentInput } from '../domain/usecases/CreateDocumentUseCase';
import type { HttpRepositoryConfig } from '../infrastructure/http/types';

export class DocumentService {
  private allDocuments: Document[] = [];
  private readonly repository: HttpDocumentRepository;
  private readonly getDocumentsUseCase: GetDocumentsUseCase;
  private readonly sortDocumentsUseCase: SortDocumentsUseCase;
  private readonly createDocumentUseCase: CreateDocumentUseCase;

  constructor(config: DocumentServiceConfig = { apiBaseUrl: 'http://localhost:8080' }) {
    const repositoryConfig: HttpRepositoryConfig = { baseUrl: config.apiBaseUrl };
    this.repository = new HttpDocumentRepository(repositoryConfig);
    this.getDocumentsUseCase = new GetDocumentsUseCase(this.repository);
    this.sortDocumentsUseCase = new SortDocumentsUseCase();
    this.createDocumentUseCase = new CreateDocumentUseCase();
  }

  async fetchDocuments(): Promise<InlineError<Document[]>> {
    const [error, documents] = await this.getDocumentsUseCase.execute();
    if (error) {
      return [error, null];
    }

    this.allDocuments = documents as Document[];
    return [null, this.allDocuments];
  }

  sortDocuments(sortBy: SortBy): InlineError<Document[]> {
    return this.sortDocumentsUseCase.execute({ documents: this.allDocuments, sortBy });
  }

  createDocument(input: CreateDocumentInput): InlineError<Document> {
    const [error, newDocument] = this.createDocumentUseCase.execute(input);
    if (error) {
      return [error, null];
    }

    this.allDocuments = [newDocument as Document, ...this.allDocuments];
    return [null, newDocument as Document];
  }

  getAllDocuments(): Document[] {
    return this.allDocuments;
  }
}
