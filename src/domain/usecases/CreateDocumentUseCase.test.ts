import { beforeEach, describe, expect, it } from 'vitest';

import { CreateDocumentUseCase } from './CreateDocumentUseCase';

describe('CreateDocumentUseCase', () => {
  let useCase: CreateDocumentUseCase;

  beforeEach(() => {
    useCase = new CreateDocumentUseCase();
  });

  it('should create a document with given data', () => {
    const input = {
      attachments: ['file1.pdf'],
      contributors: ['John Doe', 'Jane Smith'],
      name: 'Test Document'
    };

    const [error, document] = useCase.execute(input);

    expect(error).toBeNull();
    expect(document?.name).toBe('Test Document');
    expect(document?.attachments).toEqual(['file1.pdf']);
    expect(document?.contributors).toHaveLength(2);
    expect(document?.contributors[0].name).toBe('John Doe');
    expect(document?.contributors[1].name).toBe('Jane Smith');
    expect(document?.version).toBe('1.0.0');
    expect(document?.id).toBeDefined();
  });

  it('should return error when name is empty', () => {
    const input = {
      attachments: [],
      contributors: ['John Doe'],
      name: ''
    };

    const [error, document] = useCase.execute(input);

    expect(error).toBe('Document name is required');
    expect(document).toBeNull();
  });

  it('should return error when no contributors', () => {
    const input = {
      attachments: [],
      contributors: [],
      name: 'Test Document'
    };

    const [error, document] = useCase.execute(input);

    expect(error).toBe('At least one contributor is required');
    expect(document).toBeNull();
  });

  it('should generate unique ID', () => {
    const [, doc1] = useCase.execute({
      attachments: [],
      contributors: ['John'],
      name: 'Doc 1'
    });

    const [, doc2] = useCase.execute({
      attachments: [],
      contributors: ['Jane'],
      name: 'Doc 2'
    });

    expect(doc1?.id).not.toBe(doc2?.id);
    expect(doc1?.id).toBeTruthy();
    expect(doc2?.id).toBeTruthy();
  });

  it('should set createdAt to current date', () => {
    const beforeCreate = new Date();

    const [, document] = useCase.execute({
      attachments: [],
      contributors: ['John'],
      name: 'Test Document'
    });

    const afterCreate = new Date();

    expect(document?.createdAt.getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
    expect(document?.createdAt.getTime()).toBeLessThanOrEqual(afterCreate.getTime());
  });
});
