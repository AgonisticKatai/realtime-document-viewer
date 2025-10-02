import { Document } from '../../domain/models/Document';
import { DocumentRepository } from '../../domain/repositories/DocumentRepository';
import { DocumentDTO } from './dtos/DocumentDTO';
import { DocumentMapper } from './mappers/DocumentMapper';

export class HttpDocumentRepository implements DocumentRepository {
  constructor(private readonly config: { baseUrl: string }) {}

  async getAll(): Promise<Document[]> {
    const response = await fetch(`${this.config.baseUrl}/documents`);

    if (!response.ok) {
      throw new Error('Failed to fetch documents');
    }

    const documentsDto: DocumentDTO[] = await response.json();

    return this.mapDocuments({ documentsDto });
  }

  private mapDocuments({ documentsDto }: { documentsDto: DocumentDTO[] }): Document[] {
    return documentsDto.map(dto => DocumentMapper.toDomain({ dto }));
  }
}
