import { InlineError } from '../domain/errors';
import { Document } from '../domain/models/Document';
import { CreateDocumentUseCase } from '../domain/usecases/CreateDocumentUseCase';
import { GetDocumentsUseCase } from '../domain/usecases/GetDocumentsUseCase';
import { SortDocumentsUseCase } from '../domain/usecases/SortDocumentsUseCase';

import type { SortBy, CreateDocumentProps } from '../domain/types';

export class DocumentService {
  private allDocuments: Document[] = [];

  constructor(
    private readonly getDocumentsUseCase: GetDocumentsUseCase,
    private readonly sortDocumentsUseCase: SortDocumentsUseCase,
    private readonly createDocumentUseCase: CreateDocumentUseCase
  ) {}

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

  createDocument(input: CreateDocumentProps): InlineError<Document> {
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
