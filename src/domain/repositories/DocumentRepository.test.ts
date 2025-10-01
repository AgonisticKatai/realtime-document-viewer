import { describe, it, expect } from 'vitest';
import { DocumentRepository } from './DocumentRepository';

describe('DocumentRepository', () => {
  it('should be an interface', () => {
    const repository: DocumentRepository = {
      getAll: async () => []
    };

    expect(repository.getAll).toBeDefined();
  });
});