import { DocumentCard } from '../components/DocumentCard';
import type { DocumentCardFactory, DocumentCardElement } from '../../services/types';

export class WebComponentCardFactory implements DocumentCardFactory {
  createCard(): DocumentCardElement {
    return new DocumentCard();
  }
}
