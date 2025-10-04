import { beforeEach, describe, expect, it } from 'vitest';

import { SortDocumentsUseCase } from './SortDocumentsUseCase';
import { Contributor } from '../models/Contributor';
import { Document } from '../models/Document';

describe('SortDocumentsUseCase', () => {
  let useCase: SortDocumentsUseCase;
  let documents: Document[];

  beforeEach(() => {
    useCase = new SortDocumentsUseCase();

    documents = [
      Document.create({
        attachments: [],
        contributors: [Contributor.create({ id: 'c1', name: 'John' })],
        createdAt: new Date('2024-01-15'),
        id: '2',
        name: 'Zebra Document',
        version: '3.0.1'
      }),
      Document.create({
        attachments: [],
        contributors: [Contributor.create({ id: 'c2', name: 'Jane' })],
        createdAt: new Date('2024-01-10'),
        id: '1',
        name: 'Alpha Document',
        version: '1.0.0'
      }),
      Document.create({
        attachments: [],
        contributors: [Contributor.create({ id: 'c3', name: 'Bob' })],
        createdAt: new Date('2024-01-20'),
        id: '3',
        name: 'Beta Document',
        version: '2.1.0'
      })
    ];
  });

  it('should sort documents by name', () => {
    const [error, sorted] = useCase.execute({ documents, sortBy: 'name' });

    expect(error).toBeNull();
    expect(sorted?.[0].name).toBe('Alpha Document');
    expect(sorted?.[1].name).toBe('Beta Document');
    expect(sorted?.[2].name).toBe('Zebra Document');
  });

  it('should sort documents by version', () => {
    const [error, sorted] = useCase.execute({ documents, sortBy: 'version' });

    expect(error).toBeNull();
    expect(sorted?.[0].version).toBe('1.0.0');
    expect(sorted?.[1].version).toBe('2.1.0');
    expect(sorted?.[2].version).toBe('3.0.1');
  });

  it('should sort documents by createdAt (most recent first)', () => {
    const [error, sorted] = useCase.execute({ documents, sortBy: 'createdAt' });

    expect(error).toBeNull();
    expect(sorted?.[0].createdAt.getTime()).toBe(new Date('2024-01-20').getTime());
    expect(sorted?.[1].createdAt.getTime()).toBe(new Date('2024-01-15').getTime());
    expect(sorted?.[2].createdAt.getTime()).toBe(new Date('2024-01-10').getTime());
  });

  it('should not mutate original array', () => {
    const originalOrder = documents.map(doc => doc.id);

    useCase.execute({ documents, sortBy: 'name' });

    expect(documents.map(doc => doc.id)).toEqual(originalOrder);
  });

  it('should handle empty array', () => {
    const [error, sorted] = useCase.execute({ documents: [], sortBy: 'name' });

    expect(error).toBeNull();
    expect(sorted).toEqual([]);
  });
});
