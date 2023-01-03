import React from 'react';
import ReactDOM from 'react-dom/client';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import filter from 'leo-profanity';

import App from './components/App.jsx';
import resources from './locales/index.js';
import store from './slices/index.js';
import socketApi from './socketApi/api.js';
import SocketProvider from './contexts/SocketProvider.jsx';

const init = async () => {
  const rollbarConfig = {
    accessToken: '52df9dfb63424dd9ba56160c44702263',
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'production',
  };

  const api = socketApi();
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  function TestError() {
    const a = null;
    return a.hello();
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));
  return root.render(
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <StoreProvider store={store}>
          <SocketProvider api={api}>
            <I18nextProvider i18n={i18n}>
              <TestError />
              <App />
            </I18nextProvider>
          </SocketProvider>
        </StoreProvider>
      </ErrorBoundary>
    </RollbarProvider>,
  );
};

export default init;
