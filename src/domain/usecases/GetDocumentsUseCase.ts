import { InlineError, error, success } from '../errors';
import { Document } from '../models/Document';
import { DocumentRepository } from '../repositories/DocumentRepository';

export class GetDocumentsUseCase {
  constructor(private readonly repository: DocumentRepository) {}

  async execute(): Promise<InlineError<Document[]>> {
    const [err, documents] = await this.repository.getAll();
    if (err) {
      return error(err);
    }
    return success(documents as Document[]);
  }
}
