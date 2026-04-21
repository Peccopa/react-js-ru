import './index.less';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);
rootElement.id = 'root';

const root = createRoot(rootElement);

root.render(<App />);

