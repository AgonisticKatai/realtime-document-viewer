import { Document } from '../models/Document';
import { DocumentRepository } from '../repositories/DocumentRepository';

export class GetDocumentsUseCase {
  constructor(private readonly repository: DocumentRepository) {}

  async execute(): Promise<Document[]> {
    return await this.repository.getAll();
  }
}
