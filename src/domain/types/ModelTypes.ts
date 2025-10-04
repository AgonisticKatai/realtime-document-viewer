import type { Contributor } from '../models/Contributor';

export interface ContributorProps {
  id: string;
  name: string;
}

export interface DocumentProps {
  attachments: string[];
  contributors: Contributor[];
  createdAt: Date;
  id: string;
  name: string;
  version: string;
}
