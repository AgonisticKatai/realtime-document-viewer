import { describe, it, expect, beforeEach } from 'vitest';

import { DocumentService } from './DocumentService';

import type { DocumentServiceConfig } from './types';
import type { CreateDocumentInput } from '../domain/usecases/CreateDocumentUseCase';

describe('DocumentService', () => {
  let service: DocumentService;

  beforeEach(() => {
    service = new DocumentService();
  });

  it('should initialize with default config', () => {
    const serviceWithDefaults = new DocumentService();

    expect(serviceWithDefaults.getAllDocuments()).toEqual([]);
  });

  it('should initialize with custom config', () => {
    const config: DocumentServiceConfig = { apiBaseUrl: 'http://example.com' };
    const serviceWithConfig = new DocumentService(config);

    expect(serviceWithConfig.getAllDocuments()).toEqual([]);
  });

  it('should create document and add to collection', () => {
    const input: CreateDocumentInput = {
      name: 'Test Document',
      contributors: ['John Doe'],
      attachments: ['file.pdf']
    };

    const [error, document] = service.createDocument(input);

    expect(error).toBeNull();
    expect(document?.name).toBe('Test Document');
    expect(document?.contributors).toHaveLength(1);
    expect(document?.contributors[0].name).toBe('John Doe');
    expect(document?.attachments).toEqual(['file.pdf']);
    expect(service.getAllDocuments()).toHaveLength(1);
    expect(service.getAllDocuments()[0]).toEqual(document);
  });

  it('should handle create document validation errors', () => {
    const invalidInput: CreateDocumentInput = {
      name: '',
      contributors: [],
      attachments: []
    };

    const [error, document] = service.createDocument(invalidInput);

    expect(error).toBeTruthy();
    expect(document).toBeNull();
    expect(service.getAllDocuments()).toHaveLength(0);
  });

  it('should add new documents at the beginning of the collection', () => {
    const input1: CreateDocumentInput = {
      name: 'First Document',
      contributors: ['John'],
      attachments: []
    };
    const input2: CreateDocumentInput = {
      name: 'Second Document',
      contributors: ['Jane'],
      attachments: []
    };

    service.createDocument(input1);
    service.createDocument(input2);

    const allDocs = service.getAllDocuments();
    expect(allDocs).toHaveLength(2);
    expect(allDocs[0].name).toBe('Second Document');
    expect(allDocs[1].name).toBe('First Document');
  });

  it('should sort documents when they exist', () => {
    service.createDocument({
      name: 'Z Document',
      contributors: ['John'],
      attachments: []
    });
    service.createDocument({
      name: 'A Document',
      contributors: ['Jane'],
      attachments: []
    });

    const [error, sortedDocs] = service.sortDocuments('name');

    expect(error).toBeNull();
    expect(sortedDocs).toHaveLength(2);
    expect(sortedDocs?.[0].name).toBe('A Document');
    expect(sortedDocs?.[1].name).toBe('Z Document');
  });

  it('should return empty array when sorting with no documents', () => {
    const [error, sortedDocs] = service.sortDocuments('name');

    expect(error).toBeNull();
    expect(sortedDocs).toEqual([]);
  });
});
