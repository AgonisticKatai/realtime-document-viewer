import { describe, it, expect } from 'vitest';

import { Contributor } from './Contributor';
import { Document } from './Document';

describe('Document', () => {
  it('should create a document with all required properties', () => {
    const now = new Date();
    const contributor = Contributor.create({
      id: 'c1',
      name: 'John Doe'
    });

    const document = Document.create({
      attachments: [],
      contributors: [contributor],
      createdAt: now,
      id: '123',
      name: 'Project Proposal',
      version: 1
    });

    expect(document.attachments).toEqual([]);
    expect(document.contributors).toHaveLength(1);
    expect(document.contributors[0].id).toBe('c1');
    expect(document.contributors[0].name).toBe('John Doe');
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
