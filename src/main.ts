import { createApplicationContainer } from './infrastructure/di/BootstrapContainer';
import type { AppController } from './services/AppController';

import './styles/main.css';

import './ui/components/AddDocumentCard';
import './ui/components/DocumentForm';
import './ui/components/SortControl';
import './ui/components/ViewToggle';

const config = {
  apiBaseUrl: 'http://localhost:8080',
  websocketUrl: 'ws://localhost:8080/notifications'
};

const container = createApplicationContainer(config);
const appController = container.resolve<AppController>('AppController');

appController.init();
