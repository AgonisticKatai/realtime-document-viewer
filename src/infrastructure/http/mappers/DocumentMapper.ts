import { Contributor } from '../../../domain/models/Contributor';
import { Document } from '../../../domain/models/Document';
import { DocumentDTO, ContributorDTO } from '../dtos/DocumentDTO';

interface MapDocumentParams {
  dto: DocumentDTO;
}

interface MapContributorsParams {
  contributors: ContributorDTO[];
}

interface ExtractVersionParams {
  versionString: string;
}

export class DocumentMapper {
  static toDomain({ dto }: MapDocumentParams): Document {
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

  private static mapContributors({ contributors }: MapContributorsParams): Contributor[] {
    return contributors.map(contributorDto =>
      Contributor.create({
        id: contributorDto.ID,
        name: contributorDto.Name
      })
    );
  }

  private static extractMajorVersion({ versionString }: ExtractVersionParams): number {
    const versionParts = versionString.split('.');
    const [majorVersionString] = versionParts;
    const majorVersion = Number(majorVersionString);

    if (isNaN(majorVersion) || majorVersion < 0) {
      throw new Error(`Invalid version string: ${versionString}`);
    }

    return majorVersion;
  }
}
