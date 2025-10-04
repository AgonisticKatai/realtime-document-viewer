import { describe, it, expect } from 'vitest';

import { NotificationMapper } from './NotificationMapper';
import { NotificationDTO } from '../dtos/NotificationDTO';

describe('NotificationMapper', () => {
  it('should map DTO to Domain entity', () => {
    const dto: NotificationDTO = {
      DocumentID: 'doc-123',
      DocumentTitle: 'Test Document',
      Timestamp: '2023-10-04T12:00:00Z',
      UserID: 'user-456',
      UserName: 'John Doe'
    };

    const result = NotificationMapper.toDomain({ dto });

    expect(result.documentId).toBe('doc-123');
    expect(result.documentTitle).toBe('Test Document');
    expect(result.timestamp).toEqual(new Date('2023-10-04T12:00:00Z'));
    expect(result.userId).toBe('user-456');
    expect(result.userName).toBe('John Doe');
  });

  it('should handle timestamp with milliseconds', () => {
    const dto: NotificationDTO = {
      DocumentID: 'doc-123',
      DocumentTitle: 'Test Document',
      Timestamp: '2023-10-04T12:30:45.123Z',
      UserID: 'user-456',
      UserName: 'Jane Smith'
    };

    const result = NotificationMapper.toDomain({ dto });

    expect(result.timestamp).toEqual(new Date('2023-10-04T12:30:45.123Z'));
    expect(result.timestamp.getMilliseconds()).toBe(123);
  });

  it('should throw error for invalid timestamp', () => {
    const dto: NotificationDTO = {
      DocumentID: 'doc-123',
      DocumentTitle: 'Test Document',
      Timestamp: 'invalid-date',
      UserID: 'user-456',
      UserName: 'John Doe'
    };

    expect(() => NotificationMapper.toDomain({ dto })).toThrow('Invalid timestamp: invalid-date');
  });

  it('should throw error for empty timestamp', () => {
    const dto: NotificationDTO = {
      DocumentID: 'doc-123',
      DocumentTitle: 'Test Document',
      Timestamp: '',
      UserID: 'user-456',
      UserName: 'John Doe'
    };

    expect(() => NotificationMapper.toDomain({ dto })).toThrow('Invalid timestamp: ');
  });

  it('should preserve string fields with spaces and special characters', () => {
    const dto: NotificationDTO = {
      DocumentID: '  doc-with-spaces  ',
      DocumentTitle: 'Document with Special Chars !@#$%',
      Timestamp: '2023-12-25T00:00:00Z',
      UserID: '12345',
      UserName: 'User Name With Spaces'
    };

    const result = NotificationMapper.toDomain({ dto });

    expect(result.documentId).toBe('  doc-with-spaces  ');
    expect(result.documentTitle).toBe('Document with Special Chars !@#$%');
    expect(result.userId).toBe('12345');
    expect(result.userName).toBe('User Name With Spaces');
  });
});
