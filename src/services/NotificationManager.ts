import { WebSocketNotificationService } from '../infrastructure/websocket/WebSocketNotificationService';
import { NotificationToast } from '../ui/components/NotificationToast';

export interface NotificationData {
  documentTitle: string;
  userName: string;
}

export class NotificationManager {
  private notificationService: WebSocketNotificationService;

  constructor() {
    this.notificationService = new WebSocketNotificationService({
      url: 'ws://localhost:8080/notifications'
    });
  }

  connect(): void {
    this.notificationService.connect();
  }

  onNotification(callback: (data: NotificationData) => void): void {
    this.notificationService.onNotification((notification) => {
      callback({
        documentTitle: notification.documentTitle,
        userName: notification.userName
      });
    });
  }

  showNotification({ documentTitle, userName }: NotificationData): void {
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
