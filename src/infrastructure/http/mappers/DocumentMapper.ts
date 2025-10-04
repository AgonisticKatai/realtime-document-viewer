import { Contributor } from '../../../domain/models/Contributor';
import { Document } from '../../../domain/models/Document';

import type {
  MapDocumentParams,
  MapContributorsParams
} from './types';

export class DocumentMapper {
  static toDomain({ dto }: MapDocumentParams): Document {
    const contributors = this.mapContributors({ contributors: dto.Contributors });

    return Document.create({
      attachments: dto.Attachments,
      contributors,
      createdAt: new Date(dto.CreatedAt),
      id: dto.ID,
      name: dto.Title,
      version: dto.Version
    });
  }

  private static mapContributors({ contributors }: MapContributorsParams): Contributor[] {
    return contributors.map(contributorDto =>
      Contributor.create({
        id: contributorDto.ID,
        name: contributorDto.Name
      })
    );
  }
}
