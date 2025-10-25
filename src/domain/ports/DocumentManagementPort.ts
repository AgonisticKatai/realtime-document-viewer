import type { InlineError } from '../errors';
import type { Document } from '../models/Document';
import type { SortBy, CreateDocumentProps } from '../types';

export interface DocumentManagementPort {
  fetchDocuments(): Promise<InlineError<Document[]>>;
  getAllDocuments(): Document[];
  sortDocuments(sortBy: SortBy): InlineError<Document[]>;
  createDocument(input: CreateDocumentProps): InlineError<Document>;
}
