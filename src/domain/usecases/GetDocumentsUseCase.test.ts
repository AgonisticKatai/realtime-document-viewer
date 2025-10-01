import { describe, it, expect, beforeEach } from 'vitest';
import { GetDocumentsUseCase } from './GetDocumentsUseCase';
import { DocumentRepository } from '../repositories/DocumentRepository';
import { Document } from '../models/Document';

describe('GetDocumentsUseCase', () => {
  let useCase: GetDocumentsUseCase;
  let mockRepository: DocumentRepository;

  beforeEach(() => {
    mockRepository = {
      getAll: async () => [
        Document.create({
          attachments: [],
          contributors: [],
          createdAt: new Date('2024-01-01'),
          id: '1',
          name: 'Document A',
          version: 1
        }),
        Document.create({
          attachments: [],
          contributors: [],
          createdAt: new Date('2024-01-02'),
          id: '2',
          name: 'Document B',
          version: 2
        })
      ]
    };

    useCase = new GetDocumentsUseCase(mockRepository);
  });

  it('should return all documents from repository', async () => {
    const documents = await useCase.execute();

    expect(documents).toHaveLength(2);
    expect(documents[0].name).toBe('Document A');
    expect(documents[1].name).toBe('Document B');
  });
});