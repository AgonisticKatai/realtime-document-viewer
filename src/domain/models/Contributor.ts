export interface ContributorProps {
  id: string;
  name: string;
}

export class Contributor {
  readonly id: string;
  readonly name: string;

  private constructor(props: ContributorProps) {
    this.id = props.id;
    this.name = props.name;
  }

  static create(props: ContributorProps): Contributor {
    this.validate(props);
    return new Contributor(props);
  }

  private static validate(props: ContributorProps): void {
    if (!props.id || props.id.trim() === '') {
      throw new Error('Contributor id cannot be empty');
    }

    if (!props.name || props.name.trim() === '') {
      throw new Error('Contributor name cannot be empty');
    }
  }
}