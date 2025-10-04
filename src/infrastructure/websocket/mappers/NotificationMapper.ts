import { NotificationData } from '../../../domain/services/NotificationService';

import type { MapNotificationParams } from './types';

export class NotificationMapper {
  static toDomain({ dto }: MapNotificationParams): NotificationData {
    const timestamp = new Date(dto.Timestamp);

    if (isNaN(timestamp.getTime())) {
      throw new Error(`Invalid timestamp: ${dto.Timestamp}`);
    }

    return {
      documentId: dto.DocumentID,
      documentTitle: dto.DocumentTitle,
      timestamp,
      userId: dto.UserID,
      userName: dto.UserName
    };
  }
}
