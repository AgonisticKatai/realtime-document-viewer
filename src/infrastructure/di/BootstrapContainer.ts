import { Container } from './Container';
import { HttpDocumentRepository } from '../http/HttpDocumentRepository';
import { WebSocketNotificationService } from '../websocket/WebSocketNotificationService';
import { GetDocumentsUseCase } from '../../domain/usecases/GetDocumentsUseCase';
import { SortDocumentsUseCase } from '../../domain/usecases/SortDocumentsUseCase';
import { CreateDocumentUseCase } from '../../domain/usecases/CreateDocumentUseCase';
import { DocumentService } from '../../services/DocumentService';
import { NotificationManager } from '../../services/NotificationManager';
import { UIRenderer } from '../../services/UIRenderer';
import { AppController } from '../../services/AppController';
import { WebComponentCardFactory } from '../../ui/factories/WebComponentCardFactory';

import type { DocumentRepository } from '../../domain/repositories/DocumentRepository';
import type { NotificationService } from '../../domain/services/NotificationService';

export interface ApplicationConfig {
  readonly apiBaseUrl: string;
  readonly websocketUrl: string;
}

export function createApplicationContainer(config: ApplicationConfig): Container {
  const container = new Container();

  container.register<DocumentRepository>('DocumentRepository', () =>
    new HttpDocumentRepository({ baseUrl: config.apiBaseUrl })
  );

  container.register<NotificationService>('NotificationService', () =>
    new WebSocketNotificationService({ url: config.websocketUrl })
  );

  container.register('GetDocumentsUseCase', () =>
    new GetDocumentsUseCase(container.resolve<DocumentRepository>('DocumentRepository'))
  );

  container.register('SortDocumentsUseCase', () =>
    new SortDocumentsUseCase()
  );

  container.register('CreateDocumentUseCase', () =>
    new CreateDocumentUseCase()
  );

  container.register('DocumentService', () =>
    new DocumentService(
      container.resolve('GetDocumentsUseCase'),
      container.resolve('SortDocumentsUseCase'),
      container.resolve('CreateDocumentUseCase')
    )
  );

  container.register('NotificationManager', () =>
    new NotificationManager(container.resolve<NotificationService>('NotificationService'))
  );

  container.register('DocumentCardFactory', () =>
    new WebComponentCardFactory()
  );

  container.register('UIRenderer', () =>
    new UIRenderer(container.resolve('DocumentCardFactory'))
  );

  container.register('AppController', () =>
    new AppController(
      container.resolve('DocumentService'),
      container.resolve('UIRenderer'),
      container.resolve('NotificationManager')
    )
  );

  return container;
}
