import { describe, it, expect } from 'vitest';
import { Contributor } from './Contributor';

describe('Contributor', () => {
  it('should create a contributor with id and name', () => {
    const contributor = Contributor.create({
      id: '123',
      name: 'John Doe'
    });

    expect(contributor.id).toBe('123');
    expect(contributor.name).toBe('John Doe');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      Contributor.create({
        id: '123',
        name: ''
      });
    }).toThrow('Contributor name cannot be empty');
  });

  it('should throw error when id is empty', () => {
    expect(() => {
      Contributor.create({
        id: '',
        name: 'John Doe'
      });
    }).toThrow('Contributor id cannot be empty');
  });
});
