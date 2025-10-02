export interface ContributorDTO {
  ID: string;
  Name: string;
}

export interface DocumentDTO {
  Attachments: string[];
  Contributors: ContributorDTO[];
  CreatedAt: string;
  ID: string;
  Title: string;
  UpdatedAt: string;
  Version: string;
}
