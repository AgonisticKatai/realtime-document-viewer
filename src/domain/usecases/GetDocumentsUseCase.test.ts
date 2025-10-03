import { beforeEach, describe, expect, it } from 'vitest';

import { success, error } from '../errors';
import { GetDocumentsUseCase } from './GetDocumentsUseCase';
import { Contributor } from '../models/Contributor';
import { Document } from '../models/Document';
import { DocumentRepository } from '../repositories/DocumentRepository';

describe('GetDocumentsUseCase', () => {
  let useCase: GetDocumentsUseCase;
  let mockRepository: DocumentRepository;

  beforeEach(() => {
    mockRepository = {
      getAll: async () => success([
        Document.create({
          attachments: [],
          contributors: [Contributor.create({ id: 'c1', name: 'John' })],
          createdAt: new Date('2024-01-15'),
          id: '2',
          name: 'Zebra Document',
          version: 3
        }),
        Document.create({
          attachments: [],
          contributors: [Contributor.create({ id: 'c2', name: 'Jane' })],
          createdAt: new Date('2024-01-10'),
          id: '1',
          name: 'Alpha Document',
          version: 1
        })
      ])
    };

    useCase = new GetDocumentsUseCase(mockRepository);
  });

  it('should return all documents from repository', async () => {
    const [err, documents] = await useCase.execute();

    expect(err).toBeNull();
    expect(documents).toHaveLength(2);
    expect(documents?.[0].name).toBe('Zebra Document');
    expect(documents?.[1].name).toBe('Alpha Document');
  });

  it('should return error when repository fails', async () => {
    mockRepository.getAll = async () => error('Connection failed');

    const [err, documents] = await useCase.execute();

    expect(err).toBe('Connection failed');
    expect(documents).toBeNull();
  });
});
