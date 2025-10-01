export interface DocumentProps {
  attachments: string[];
  contributors: string[];
  createdAt: Date;
  id: string;
  name: string;
  version: number;
}

export class Document {
  readonly attachments: string[];
  readonly contributors: string[];
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
    return new Document(props);
  }
}