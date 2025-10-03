import { AppController } from './services/AppController';

import './styles/main.css';

import './ui/components/AddDocumentCard';
import './ui/components/DocumentForm';
import './ui/components/SortControl';
import './ui/components/ViewToggle';

const appController = new AppController();

appController.init();
