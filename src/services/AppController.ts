import { DocumentService } from './DocumentService';
import { NotificationManager } from './NotificationManager';
import { UIRenderer } from './UIRenderer';
import { Document } from '../domain/models/Document';

import type { SortBy } from '../domain/types';
import type { ViewMode, DocumentFormElement } from '../ui/types';

export class AppController {
  private documentService: DocumentService;
  private uiRenderer: UIRenderer;
  private notificationManager: NotificationManager;

  constructor() {
    this.documentService = new DocumentService();
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

    this.uiRenderer.renderDocuments(documents, () => this.showCreateDocumentForm());
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
      this.notificationManager.showNotification(data);
    });

    this.notificationManager.connect();
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
