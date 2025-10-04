import { NotificationDTO } from './dtos/NotificationDTO';
import { NotificationMapper } from './mappers/NotificationMapper';
import { NotificationData, NotificationService } from '../../domain/services/NotificationService';

import type { WebSocketConfig } from './types';

export class WebSocketNotificationService implements NotificationService {
  private websocket: WebSocket | null = null;
  private callbacks: Array<(notification: NotificationData) => void> = [];

  constructor(private readonly config: WebSocketConfig) {}

  connect(): void {
    this.websocket = new WebSocket(this.config.url);

    this.websocket.addEventListener('message', (event) => {
      this.handleMessage({ data: event.data });
    });

    this.websocket.addEventListener('error', (error) => {
      console.error('WebSocket error:', error);
    });

    this.websocket.addEventListener('close', () => {
      console.warn('WebSocket connection closed');
    });
  }

  disconnect(): void {
    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;
    }
  }

  onNotification(callback: (notification: NotificationData) => void): void {
    this.callbacks.push(callback);
  }

  private handleMessage({ data }: { data: string }): void {
    try {
      const parsed: unknown = JSON.parse(data);

      if (!this.isValidNotificationDTO(parsed)) {
        throw new Error('Invalid notification format');
      }

      const dto = parsed as NotificationDTO;
      const notification = NotificationMapper.toDomain({ dto });

      this.callbacks.forEach(callback => callback(notification));
    } catch (error) {
      console.error('Error parsing notification:', error);
    }
  }

  private isValidNotificationDTO(data: unknown): data is NotificationDTO {
    if (typeof data !== 'object' || data === null) {
      return false;
    }

    const obj = data as Record<string, unknown>;

    return (
      typeof obj.DocumentID === 'string' &&
      typeof obj.DocumentTitle === 'string' &&
      typeof obj.Timestamp === 'string' &&
      typeof obj.UserID === 'string' &&
      typeof obj.UserName === 'string'
    );
  }
}
