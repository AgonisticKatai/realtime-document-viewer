import { DocumentDTO } from './dtos/DocumentDTO';
import { DocumentMapper } from './mappers/DocumentMapper';
import { InlineError, error, success } from '../../domain/errors';
import { Document } from '../../domain/models/Document';
import { DocumentRepository } from '../../domain/repositories/DocumentRepository';

import type { HttpRepositoryConfig } from './types';

export class HttpDocumentRepository implements DocumentRepository {
  constructor(private readonly config: HttpRepositoryConfig) {}

  async getAll(): Promise<InlineError<Document[]>> {
    try {
      const response = await fetch(`${this.config.baseUrl}/documents`);

      if (!response.ok) {
        return error('Failed to fetch documents');
      }

      const documentsDto: DocumentDTO[] = await response.json();
      const documents = this.mapDocuments({ documentsDto });

      return success(documents);
    } catch {
      return error('Connection error');
    }
  }

  private mapDocuments({ documentsDto }: { documentsDto: DocumentDTO[] }): Document[] {
    return documentsDto.map(dto => DocumentMapper.toDomain({ dto }));
  }
}
