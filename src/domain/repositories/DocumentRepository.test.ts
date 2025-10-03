import { describe, it, expect } from 'vitest';

import { success } from '../errors';
import { DocumentRepository } from './DocumentRepository';

describe('DocumentRepository', () => {
  it('should be an interface', () => {
    const repository: DocumentRepository = {
      getAll: async () => success([])
    };

    expect(repository.getAll).toBeDefined();
  });
});
