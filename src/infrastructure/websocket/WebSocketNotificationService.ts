import { NotificationDTO } from './dtos/NotificationDTO';
import { NotificationMapper } from './mappers/NotificationMapper';
import { NotificationData, NotificationService } from '../../domain/services/NotificationService';

export class WebSocketNotificationService implements NotificationService {
  private websocket: WebSocket | null = null;
  private callbacks: Array<(notification: NotificationData) => void> = [];

  constructor(private readonly config: { url: string }) {}

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
      const dto: NotificationDTO = JSON.parse(data);
      const notification = NotificationMapper.toDomain({ dto });

      this.callbacks.forEach(callback => callback(notification));
    } catch (error) {
      console.error('Error parsing notification:', error);
    }
  }
}
