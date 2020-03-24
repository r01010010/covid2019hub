import React from 'react';
import { hydrate, render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './state/reducers';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(rootReducer, {}, applyMiddleware(thunkMiddleware));

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  hydrate(<Provider store={store}><App /></Provider>, rootElement);
} else {
  render(<Provider store={store}><App /></Provider>, rootElement);
}

registerServiceWorker();
