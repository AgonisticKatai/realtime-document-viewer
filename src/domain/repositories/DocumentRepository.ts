import { InlineError } from '../errors';
import { Document } from '../models/Document';

export interface DocumentRepository {
  getAll(): Promise<InlineError<Document[]>>;
}
