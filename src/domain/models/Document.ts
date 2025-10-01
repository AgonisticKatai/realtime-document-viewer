import { Contributor } from './Contributor';

export interface DocumentProps {
  attachments: string[];
  contributors: Contributor[];
  createdAt: Date;
  id: string;
  name: string;
  version: number;
}

export class Document {
  readonly attachments: string[];
  readonly contributors: Contributor[];
  readonly createdAt: Date;
  readonly id: string;
  readonly name: string;
  readonly version: number;

  private constructor(props: DocumentProps) {
    this.attachments = props.attachments;
    this.contributors = props.contributors;
    this.createdAt = props.createdAt;
    this.id = props.id;
    this.name = props.name;
    this.version = props.version;
  }

  static create(props: DocumentProps): Document {
    this.validate(props);
    return new Document(props);
  }

  private static validate(props: DocumentProps): void {
    if (!props.name || props.name.trim() === '') {
      throw new Error('Document name cannot be empty');
    }

    if (props.version < 1) {
      throw new Error('Document version must be at least 1');
    }
  }
}