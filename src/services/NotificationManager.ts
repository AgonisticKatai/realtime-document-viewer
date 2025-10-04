import { WebSocketNotificationService } from '../infrastructure/websocket/WebSocketNotificationService';
import { NotificationToast } from '../ui/components/NotificationToast';

import type { NotificationManagerConfig, NotificationDisplayData } from './types';
import type { WebSocketConfig } from '../infrastructure/websocket/types';

export class NotificationManager {
  private readonly notificationService: WebSocketNotificationService;

  constructor(config: NotificationManagerConfig = { websocketUrl: 'ws://localhost:8080/notifications' }) {
    const wsConfig: WebSocketConfig = {
      url: config.websocketUrl
    };
    this.notificationService = new WebSocketNotificationService(wsConfig);
  }

  connect(): void {
    this.notificationService.connect();
  }

  onNotification(callback: (data: NotificationDisplayData) => void): void {
    this.notificationService.onNotification((notification) => {
      const displayData: NotificationDisplayData = {
        documentTitle: notification.documentTitle,
        userName: notification.userName
      };
      callback(displayData);
    });
  }

  showNotification({ documentTitle, userName }: NotificationDisplayData): void {
    const container = document.getElementById('notifications');
    if (!container) {
      return;
    }

    const toast = new NotificationToast();
    container.appendChild(toast);

    toast.show({ documentTitle, userName });

    setTimeout(() => {
      if (container.contains(toast)) {
        container.removeChild(toast);
      }
    }, 3500);
  }
}
