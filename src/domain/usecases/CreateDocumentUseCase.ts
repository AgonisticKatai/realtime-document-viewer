import { INITIAL_DOCUMENT_VERSION } from '../constants';
import { InlineError, error, success } from '../errors';
import { Contributor } from '../models/Contributor';
import { Document } from '../models/Document';

export interface CreateDocumentInput {
  attachments: string[];
  contributors: string[];
  name: string;
}

export class CreateDocumentUseCase {
  execute({ attachments, contributors, name }: CreateDocumentInput): InlineError<Document> {
    if (!name || name.trim().length === 0) {
      return error('Document name is required');
    }

    if (contributors.length === 0) {
      return error('At least one contributor is required');
    }

    const documentContributors = this.createContributors({ contributorNames: contributors });

    const document = Document.create({
      attachments,
      contributors: documentContributors,
      createdAt: new Date(),
      id: this.generateId(),
      name,
      version: INITIAL_DOCUMENT_VERSION
    });

    return success(document);
  }

  private createContributors({ contributorNames }: { contributorNames: string[] }): Contributor[] {
    return contributorNames.map(name =>
      Contributor.create({
        id: this.generateId(),
        name
      })
    );
  }

  private generateId(): string {
    return crypto.randomUUID();
  }
}
