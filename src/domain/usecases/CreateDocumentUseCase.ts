import { Contributor } from '../models/Contributor';
import { Document } from '../models/Document';

interface CreateDocumentInput {
  attachments: string[];
  contributors: string[];
  name: string;
}

export class CreateDocumentUseCase {
  execute({ attachments, contributors, name }: CreateDocumentInput): Document {
    const documentContributors = this.createContributors({ contributorNames: contributors });

    return Document.create({
      attachments,
      contributors: documentContributors,
      createdAt: new Date(),
      id: this.generateId(),
      name,
      version: 1
    });
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
