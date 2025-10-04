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
      createdAt: (a: Document, b: Document) => b.createdAt.getTime() - a.createdAt.getTime(),
      name: (a: Document, b: Document) => a.name.localeCompare(b.name),
      version: (a: Document, b: Document) => this.compareVersions(a.version, b.version)
    };

    sorted.sort(sortStrategies[sortBy]);
    return success(sorted);
  }

  private compareVersions(versionA: string, versionB: string): number {
    const [major1, minor1, patch1] = versionA.split('.').map(Number);
    const [major2, minor2, patch2] = versionB.split('.').map(Number);

    return (major1 - major2) || (minor1 - minor2) || (patch1 - patch2);
  }
}
