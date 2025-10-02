import { Document } from '../models/Document';

export interface DocumentRepository {
  getAll(): Promise<Document[]>;
}
