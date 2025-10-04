import { describe, it, expect } from 'vitest';

import { DocumentMapper } from './DocumentMapper';

import type { DocumentDTO } from '../dtos/DocumentDTO';

describe('DocumentMapper', () => {
  it('should map DTO to Domain entity', () => {
    const dto: DocumentDTO = {
      Attachments: ['attachment1', 'attachment2'],
      Contributors: [
        { ID: 'c1', Name: 'John Doe' },
        { ID: 'c2', Name: 'Jane Smith' }
      ],
      CreatedAt: '2024-01-15T10:30:00Z',
      ID: 'd1',
      Title: 'Test Document',
      UpdatedAt: '2024-01-16T10:30:00Z',
      Version: '2.1.0'
    };

    const document = DocumentMapper.toDomain({ dto });

    expect(document.id).toBe('d1');
    expect(document.name).toBe('Test Document');
    expect(document.version).toBe('2.1.0');
    expect(document.attachments).toEqual(['attachment1', 'attachment2']);
    expect(document.contributors).toHaveLength(2);
    expect(document.contributors[0].id).toBe('c1');
    expect(document.contributors[0].name).toBe('John Doe');
    expect(document.createdAt).toBeInstanceOf(Date);
  });
});
