import { Contributor } from '../../../domain/models/Contributor';
import { Document } from '../../../domain/models/Document';
import { DocumentDTO } from '../dtos/DocumentDTO';

export class DocumentMapper {
  static toDomain({ dto }: { dto: DocumentDTO }): Document {
    const contributors = this.mapContributors({ contributors: dto.Contributors });
    const version = this.extractMajorVersion({ versionString: dto.Version });

    return Document.create({
      attachments: dto.Attachments,
      contributors,
      createdAt: new Date(dto.CreatedAt),
      id: dto.ID,
      name: dto.Title,
      version
    });
  }

  private static mapContributors({ contributors }: { contributors: Array<{ ID: string; Name: string }> }): Contributor[] {
    return contributors.map(contributorDto =>
      Contributor.create({
        id: contributorDto.ID,
        name: contributorDto.Name
      })
    );
  }

  private static extractMajorVersion({ versionString }: { versionString: string }): number {
    const versionParts = versionString.split('.');
    const [majorVersionString] = versionParts;
    return Number(majorVersionString);
  }
}
