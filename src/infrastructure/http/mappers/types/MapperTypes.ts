export interface MapDocumentParams {
  dto: import('../../dtos/DocumentDTO').DocumentDTO;
}

export interface MapContributorsParams {
  contributors: import('../../dtos/DocumentDTO').ContributorDTO[];
}

export interface ExtractVersionParams {
  versionString: string;
}
