import { InlineError, success } from '../errors';
import { Document } from '../models/Document';

import type { SortBy } from '../types';

export class SortDocumentsUseCase {
  execute({ documents, sortBy }: { documents: Document[]; sortBy: SortBy }): InlineError<Document[]> {
    if (!documents || documents.length === 0) {
      return success([]);
    }
    const sorted = [...documents];

    const sortStrategies = {
      createdAt: (a: Document, b: Document) => a.createdAt.getTime() - b.createdAt.getTime(),
      name: (a: Document, b: Document) => a.name.localeCompare(b.name),
      version: (a: Document, b: Document) => a.version - b.version
    };

    sorted.sort(sortStrategies[sortBy]);
    return success(sorted);
  }
}
