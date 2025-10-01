import { Document } from '../models/Document';
import { DocumentRepository } from '../repositories/DocumentRepository';

export type SortBy = 'name' | 'version' | 'createdAt';

export class GetDocumentsUseCase {
  constructor(private readonly repository: DocumentRepository) {}

  async execute({ sortBy }: { sortBy?: SortBy } = {}): Promise<Document[]> {
    const documents = await this.repository.getAll();

    if (!sortBy) {
      return documents;
    }

    return this.sortDocuments({ documents, sortBy });
  }

  private sortDocuments({ documents, sortBy }: { documents: Document[]; sortBy: SortBy }): Document[] {
    const sorted = [...documents];

    const sortStrategies = {
      createdAt: (a: Document, b: Document) => a.createdAt.getTime() - b.createdAt.getTime(),
      name: (a: Document, b: Document) => a.name.localeCompare(b.name),
      version: (a: Document, b: Document) => a.version - b.version
    };

    sorted.sort(sortStrategies[sortBy]);
    return sorted;
  }
}