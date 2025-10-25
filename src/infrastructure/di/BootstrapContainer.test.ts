import { describe, it, expect, beforeEach } from 'vitest';

import { createApplicationContainer, ApplicationConfig } from './BootstrapContainer';
import { Container } from './Container';
import { HttpDocumentRepository } from '../http/HttpDocumentRepository';
import { WebSocketNotificationService } from '../websocket/WebSocketNotificationService';
import { AppController } from '../../services/AppController';
import { DocumentService } from '../../services/DocumentService';
import { NotificationManager } from '../../services/NotificationManager';
import { UIRenderer } from '../../services/UIRenderer';

describe('BootstrapContainer', () => {
  let config: ApplicationConfig;

  beforeEach(() => {
    config = {
      apiBaseUrl: 'http://localhost:8080',
      websocketUrl: 'ws://localhost:8080/notifications'
    };
  });

  describe('createApplicationContainer', () => {
    it('should create a Container instance', () => {
      const container = createApplicationContainer(config);

      expect(container).toBeInstanceOf(Container);
    });

    it('should register DocumentRepository', () => {
      const container = createApplicationContainer(config);

      expect(container.has('DocumentRepository')).toBe(true);
      const repository = container.resolve('DocumentRepository');
      expect(repository).toBeInstanceOf(HttpDocumentRepository);
    });

    it('should register NotificationService', () => {
      const container = createApplicationContainer(config);

      expect(container.has('NotificationService')).toBe(true);
      const service = container.resolve('NotificationService');
      expect(service).toBeInstanceOf(WebSocketNotificationService);
    });

    it('should register use cases', () => {
      const container = createApplicationContainer(config);

      expect(container.has('GetDocumentsUseCase')).toBe(true);
      expect(container.has('SortDocumentsUseCase')).toBe(true);
      expect(container.has('CreateDocumentUseCase')).toBe(true);
    });

    it('should register service layer components', () => {
      const container = createApplicationContainer(config);

      expect(container.has('DocumentService')).toBe(true);
      expect(container.has('NotificationManager')).toBe(true);
      expect(container.has('UIRenderer')).toBe(true);
    });

    it('should register AppController', () => {
      const container = createApplicationContainer(config);

      expect(container.has('AppController')).toBe(true);
      const controller = container.resolve('AppController');
      expect(controller).toBeInstanceOf(AppController);
    });

    it('should resolve DocumentService', () => {
      const container = createApplicationContainer(config);

      const service = container.resolve('DocumentService');
      expect(service).toBeInstanceOf(DocumentService);
    });

    it('should resolve NotificationManager', () => {
      const container = createApplicationContainer(config);

      const manager = container.resolve('NotificationManager');
      expect(manager).toBeInstanceOf(NotificationManager);
    });

    it('should resolve UIRenderer', () => {
      const container = createApplicationContainer(config);

      const renderer = container.resolve('UIRenderer');
      expect(renderer).toBeInstanceOf(UIRenderer);
    });

    it('should use provided configuration', () => {
      const customConfig: ApplicationConfig = {
        apiBaseUrl: 'http://api.example.com',
        websocketUrl: 'ws://ws.example.com/notifications'
      };

      const container = createApplicationContainer(customConfig);
      const repository = container.resolve('DocumentRepository') as HttpDocumentRepository;

      expect(repository).toBeInstanceOf(HttpDocumentRepository);
    });
  });
});
