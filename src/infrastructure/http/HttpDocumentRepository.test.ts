import { describe, it, expect, beforeEach, vi } from 'vitest';

import { HttpDocumentRepository } from './HttpDocumentRepository';

describe('HttpDocumentRepository', () => {
  let repository: HttpDocumentRepository;

  beforeEach(() => {
    repository = new HttpDocumentRepository({ baseUrl: 'http://localhost:8080' });
  });

  it('should fetch and return documents from API', async () => {
    const mockResponse = [
      {
        Attachments: ['attachment1'],
        Contributors: [
          { ID: 'c1', Name: 'John Doe' }
        ],
        CreatedAt: '2024-01-15T10:30:00Z',
        ID: 'd1',
        Title: 'Test Document',
        UpdatedAt: '2024-01-16T10:30:00Z',
        Version: '1.0.0'
      }
    ];

    globalThis.fetch = vi.fn().mockResolvedValue({
      json: async () => mockResponse,
      ok: true
    });

    const documents = await repository.getAll();

    expect(documents).toHaveLength(1);
    expect(documents[0].id).toBe('d1');
    expect(documents[0].name).toBe('Test Document');
    expect(documents[0].version).toBe(1);
    expect(fetch).toHaveBeenCalledWith('http://localhost:8080/documents');
  });

  it('should throw error when fetch fails', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500
    });

    await expect(repository.getAll()).rejects.toThrow('Failed to fetch documents');
  });
});
