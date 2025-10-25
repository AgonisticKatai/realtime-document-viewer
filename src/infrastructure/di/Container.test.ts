import { describe, it, expect, beforeEach } from 'vitest';

import { Container } from './Container';

describe('Container', () => {
  let container: Container;

  beforeEach(() => {
    container = new Container();
  });

  describe('register and resolve', () => {
    it('should register and resolve a simple factory', () => {
      const factory = () => ({ value: 42 });
      container.register('test', factory);

      const instance = container.resolve('test');

      expect(instance).toEqual({ value: 42 });
    });

    it('should return the same instance on multiple resolves (singleton)', () => {
      let counter = 0;
      const factory = () => ({ id: ++counter });
      container.register('counter', factory);

      const instance1 = container.resolve<{ id: number }>('counter');
      const instance2 = container.resolve<{ id: number }>('counter');

      expect(instance1.id).toBe(1);
      expect(instance2.id).toBe(1);
      expect(instance1).toBe(instance2);
    });

    it('should throw error when resolving unregistered dependency', () => {
      expect(() => container.resolve('nonexistent')).toThrow(
        'No registration found for: nonexistent'
      );
    });

    it('should allow registering multiple dependencies', () => {
      container.register('service1', () => ({ name: 'Service 1' }));
      container.register('service2', () => ({ name: 'Service 2' }));

      const service1 = container.resolve<{ name: string }>('service1');
      const service2 = container.resolve<{ name: string }>('service2');

      expect(service1.name).toBe('Service 1');
      expect(service2.name).toBe('Service 2');
    });
  });

  describe('resolve with dependencies', () => {
    it('should resolve dependencies that depend on other dependencies', () => {
      interface Repository {
        getData: () => string;
      }

      interface Service {
        repository: Repository;
      }

      container.register<Repository>('repository', () => ({
        getData: () => 'data'
      }));

      container.register<Service>('service', () => ({
        repository: container.resolve<Repository>('repository')
      }));

      const service = container.resolve<Service>('service');

      expect(service.repository.getData()).toBe('data');
    });

    it('should maintain singleton pattern across nested dependencies', () => {
      let repositoryInstances = 0;

      container.register('repository', () => {
        repositoryInstances++;
        return { id: repositoryInstances };
      });

      container.register('service1', () => ({
        repo: container.resolve('repository')
      }));

      container.register('service2', () => ({
        repo: container.resolve('repository')
      }));

      const service1 = container.resolve<{ repo: { id: number } }>('service1');
      const service2 = container.resolve<{ repo: { id: number } }>('service2');

      expect(repositoryInstances).toBe(1);
      expect(service1.repo).toBe(service2.repo);
    });
  });

  describe('has', () => {
    it('should return true for registered dependencies', () => {
      container.register('test', () => ({}));

      expect(container.has('test')).toBe(true);
    });

    it('should return false for unregistered dependencies', () => {
      expect(container.has('nonexistent')).toBe(false);
    });
  });

  describe('clear', () => {
    it('should clear all registrations', () => {
      container.register('service1', () => ({}));
      container.register('service2', () => ({}));

      container.clear();

      expect(container.has('service1')).toBe(false);
      expect(container.has('service2')).toBe(false);
      expect(() => container.resolve('service1')).toThrow();
    });

    it('should allow re-registration after clear', () => {
      container.register('test', () => ({ value: 1 }));
      container.clear();
      container.register('test', () => ({ value: 2 }));

      const instance = container.resolve<{ value: number }>('test');

      expect(instance.value).toBe(2);
    });
  });
});
