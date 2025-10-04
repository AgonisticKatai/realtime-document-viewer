export interface DocumentServiceConfig {
  readonly apiBaseUrl: string;
}

export interface NotificationManagerConfig {
  readonly websocketUrl: string;
}

export interface UIRendererConfig {
  readonly defaultViewMode?: 'list' | 'grid';
}

export type { NotificationDisplayData } from './DomainTypes';
