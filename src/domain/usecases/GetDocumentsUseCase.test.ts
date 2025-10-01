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
          createdAt: new Date('2024-01-15'),
          id: '2',
          name: 'Zebra Document',
          version: 3
        }),
        Document.create({
          attachments: [],
          contributors: [],
          createdAt: new Date('2024-01-10'),
          id: '1',
          name: 'Alpha Document',
          version: 1
        }),
        Document.create({
          attachments: [],
          contributors: [],
          createdAt: new Date('2024-01-20'),
          id: '3',
          name: 'Beta Document',
          version: 2
        })
      ]
    };

    useCase = new GetDocumentsUseCase(mockRepository);
  });

  it('should return all documents from repository', async () => {
    const documents = await useCase.execute();

    expect(documents).toHaveLength(3);
  });

  it('should sort documents by name when specified', async () => {
    const documents = await useCase.execute({ sortBy: 'name' });

    expect(documents[0].name).toBe('Alpha Document');
    expect(documents[1].name).toBe('Beta Document');
    expect(documents[2].name).toBe('Zebra Document');
  });

  it('should sort documents by version when specified', async () => {
    const documents = await useCase.execute({ sortBy: 'version' });

    expect(documents[0].version).toBe(1);
    expect(documents[1].version).toBe(2);
    expect(documents[2].version).toBe(3);
  });

  it('should sort documents by createdAt when specified', async () => {
    const documents = await useCase.execute({ sortBy: 'createdAt' });

    expect(documents[0].createdAt.getTime()).toBe(new Date('2024-01-10').getTime());
    expect(documents[1].createdAt.getTime()).toBe(new Date('2024-01-15').getTime());
    expect(documents[2].createdAt.getTime()).toBe(new Date('2024-01-20').getTime());
  });
});