import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import {reportError} from './lib/errors.ts';
import './index.css';

window.addEventListener('unhandledrejection', (event) => {
  reportError('unhandledrejection', event.reason);
});

window.addEventListener('error', (event) => {
  reportError('window.onerror', event.error ?? event.message);
});

const container = document.getElementById('root');
if (!container) {
  throw new Error('Unable to mount app: no element with id "root" found in the document.');
}

createRoot(container).render(
  <StrictMode>
    <ErrorBoundary name="App">
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
