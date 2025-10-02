import { Document } from '../models/Document';

export type SortBy = 'name' | 'version' | 'createdAt';

export class SortDocumentsUseCase {
  execute({ documents, sortBy }: { documents: Document[]; sortBy: SortBy }): Document[] {
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
