import { describe, it, expect } from 'vitest';
import { Document } from './Document';

describe('Document', () => {
  it('should create a document with all required properties', () => {
    const now = new Date();
    
    const document = Document.create({
      attachments: [],
      contributors: [],
      createdAt: now,
      id: '123',
      name: 'Project Proposal',
      version: 1
    });

    expect(document.attachments).toEqual([]);
    expect(document.contributors).toEqual([]);
    expect(document.createdAt).toBe(now);
    expect(document.id).toBe('123');
    expect(document.name).toBe('Project Proposal');
    expect(document.version).toBe(1);
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      Document.create({
        attachments: [],
        contributors: [],
        createdAt: new Date(),
        id: '123',
        name: '',
        version: 1
      });
    }).toThrow('Document name cannot be empty');
  });

  it('should throw error when version is less than 1', () => {
    expect(() => {
      Document.create({
        attachments: [],
        contributors: [],
        createdAt: new Date(),
        id: '123',
        name: 'Test',
        version: 0
      });
    }).toThrow('Document version must be at least 1');
  });
});