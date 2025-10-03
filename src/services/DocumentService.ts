import { InlineError } from '../domain/errors';
import { Document } from '../domain/models/Document';
import { CreateDocumentUseCase, CreateDocumentInput } from '../domain/usecases/CreateDocumentUseCase';
import { GetDocumentsUseCase } from '../domain/usecases/GetDocumentsUseCase';
import { SortDocumentsUseCase } from '../domain/usecases/SortDocumentsUseCase';
import { HttpDocumentRepository } from '../infrastructure/http/HttpDocumentRepository';

import type { SortBy } from '../domain/types';

export class DocumentService {
  private allDocuments: Document[] = [];
  private repository: HttpDocumentRepository;
  private getDocumentsUseCase: GetDocumentsUseCase;
  private sortDocumentsUseCase: SortDocumentsUseCase;
  private createDocumentUseCase: CreateDocumentUseCase;

  constructor() {
    this.repository = new HttpDocumentRepository({ baseUrl: 'http://localhost:8080' });
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
