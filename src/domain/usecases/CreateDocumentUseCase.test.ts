import { beforeEach, describe, expect, it } from 'vitest';
import { CreateDocumentUseCase } from './CreateDocumentUseCase';

describe('CreateDocumentUseCase', () => {
  let useCase: CreateDocumentUseCase;

  beforeEach(() => {
    useCase = new CreateDocumentUseCase();
  });

  it('should create a document with provided data', () => {
    const document = useCase.execute({
      attachments: ['Attachment 1', 'Attachment 2'],
      contributors: ['John Doe', 'Jane Smith'],
      name: 'New Document'
    });

    expect(document.name).toBe('New Document');
    expect(document.version).toBe(1);
    expect(document.contributors).toHaveLength(2);
    expect(document.contributors[0].name).toBe('John Doe');
    expect(document.contributors[1].name).toBe('Jane Smith');
    expect(document.attachments).toEqual(['Attachment 1', 'Attachment 2']);
  });

  it('should generate unique ID', () => {
    const doc1 = useCase.execute({
      attachments: [],
      contributors: [],
      name: 'Doc 1'
    });

    const doc2 = useCase.execute({
      attachments: [],
      contributors: [],
      name: 'Doc 2'
    });

    expect(doc1.id).not.toBe(doc2.id);
    expect(doc1.id).toBeTruthy();
    expect(doc2.id).toBeTruthy();
  });

  it('should set createdAt to current date', () => {
    const beforeCreate = new Date();

    const document = useCase.execute({
      attachments: [],
      contributors: [],
      name: 'Test Document'
    });

    const afterCreate = new Date();

    expect(document.createdAt.getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
    expect(document.createdAt.getTime()).toBeLessThanOrEqual(afterCreate.getTime());
  });

  it('should handle empty contributors and attachments', () => {
    const document = useCase.execute({
      attachments: [],
      contributors: [],
      name: 'Minimal Document'
    });

    expect(document.contributors).toHaveLength(0);
    expect(document.attachments).toHaveLength(0);
  });
});
