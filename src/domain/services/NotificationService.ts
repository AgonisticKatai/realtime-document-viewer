export interface NotificationData {
  documentId: string;
  documentTitle: string;
  timestamp: Date;
  userId: string;
  userName: string;
}

export interface NotificationService {
  connect(): void;
  disconnect(): void;
  onNotification(callback: (notification: NotificationData) => void): void;
}
