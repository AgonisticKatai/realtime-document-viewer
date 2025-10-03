import { NotificationData } from '../../../domain/services/NotificationService';
import { NotificationDTO } from '../dtos/NotificationDTO';

export class NotificationMapper {
  static toDomain({ dto }: { dto: NotificationDTO }): NotificationData {
    return {
      documentId: dto.DocumentID,
      documentTitle: dto.DocumentTitle,
      timestamp: new Date(dto.Timestamp),
      userId: dto.UserID,
      userName: dto.UserName
    };
  }
}
