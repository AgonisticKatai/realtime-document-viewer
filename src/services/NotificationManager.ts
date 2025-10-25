import { InlineError, error, success } from '../domain/errors';
import { NotificationToast } from '../ui/components/NotificationToast';

import type { NotificationDisplayData } from './types';
import type { NotificationService } from '../domain/services/NotificationService';

export class NotificationManager {
  constructor(private readonly notificationService: NotificationService) {}

  connect(): InlineError<boolean> {
    try {
      this.notificationService.connect();
      return success(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect to notification service';
      return error(errorMessage);
    }
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

  showNotification({ documentTitle, userName }: NotificationDisplayData): InlineError<boolean> {
    const container = document.getElementById('notifications');
    if (!container) {
      return error('Notifications container not found in DOM');
    }

    try {
      const toast = new NotificationToast();
      container.appendChild(toast);

      toast.show({ documentTitle, userName });

      setTimeout(() => {
        if (container.contains(toast)) {
          container.removeChild(toast);
        }
      }, 3500);

      return success(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to show notification';
      return error(errorMessage);
    }
  }
}
