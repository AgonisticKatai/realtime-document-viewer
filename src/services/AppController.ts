import { DocumentService } from './DocumentService';
import { NotificationManager } from './NotificationManager';
import { UIRenderer } from './UIRenderer';
import { Document } from '../domain/models/Document';
import { GetDocumentsUseCase } from '../domain/usecases/GetDocumentsUseCase';
import { SortDocumentsUseCase } from '../domain/usecases/SortDocumentsUseCase';
import { CreateDocumentUseCase } from '../domain/usecases/CreateDocumentUseCase';
import { HttpDocumentRepository } from '../infrastructure/http/HttpDocumentRepository';

import type { SortBy } from '../domain/types';
import type { ViewMode, DocumentFormElement } from '../ui/types';

export class AppController {
  private documentService: DocumentService;
  private uiRenderer: UIRenderer;
  private notificationManager: NotificationManager;

  constructor() {
    const repository = new HttpDocumentRepository({ baseUrl: 'http://localhost:8080' });
    const getDocumentsUseCase = new GetDocumentsUseCase(repository);
    const sortDocumentsUseCase = new SortDocumentsUseCase();
    const createDocumentUseCase = new CreateDocumentUseCase();

    this.documentService = new DocumentService(
      getDocumentsUseCase,
      sortDocumentsUseCase,
      createDocumentUseCase
    );
    this.uiRenderer = new UIRenderer();
    this.notificationManager = new NotificationManager();
  }

  async init(): Promise<void> {
    await this.loadDocuments();
    this.setupNotifications();
    this.setupEventListeners();
  }

  private async loadDocuments(): Promise<void> {
    const [error] = await this.documentService.fetchDocuments();
    if (error) {
      console.error('Error loading documents:', error);
      return;
    }

    this.renderDocuments();
  }

  private renderDocuments(sortBy?: SortBy): void {
    let documents = this.documentService.getAllDocuments();

    if (sortBy) {
      const [error, sortedDocs] = this.documentService.sortDocuments(sortBy);
      if (error) {
        console.error('Error sorting documents:', error);
        return;
      }
      documents = sortedDocs as Document[];
    }

    const [error] = this.uiRenderer.renderDocuments(documents, () => this.showCreateDocumentForm());
    if (error) {
      console.error('Error rendering documents:', error);
    }
  }

  private showCreateDocumentForm(): void {
    const form = document.createElement('document-form') as DocumentFormElement;
    document.body.appendChild(form);

    form.addEventListener('documentsubmit', ((event: CustomEvent) => {
      const { name, contributors, attachments } = event.detail;

      const [error] = this.documentService.createDocument({
        attachments,
        contributors,
        name
      });

      if (error) {
        console.error('Error creating document:', error);
        return;
      }

      this.renderDocuments();
      form.close();
    }) as EventListener);

    form.addEventListener('close', () => {
      document.body.removeChild(form);
    });

    form.show();
  }

  private setupNotifications(): void {
    this.notificationManager.onNotification((data) => {
      const [error] = this.notificationManager.showNotification(data);
      if (error) {
        console.error('Error showing notification:', error);
      }
    });

    const [error] = this.notificationManager.connect();
    if (error) {
      console.error('Error connecting to notifications:', error);
    }
  }

  private setupEventListeners(): void {
    const sortControl = document.querySelector('sort-control');
    if (sortControl) {
      sortControl.addEventListener('sortchange', ((event: CustomEvent) => {
        const { sortBy } = event.detail;
        this.renderDocuments(sortBy);
      }) as EventListener);
    }

    const viewToggle = document.querySelector('view-toggle');
    if (viewToggle) {
      viewToggle.addEventListener('viewchange', ((event: CustomEvent) => {
        const { mode } = event.detail;
        this.uiRenderer.setViewMode(mode as ViewMode);
        this.renderDocuments();
      }) as EventListener);
    }
  }
}
