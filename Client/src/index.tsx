import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { ViewPage } from './scenes/ViewPage';
// import App from './App';
import { store } from './store/store';

import './styles/_global.scss';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      {/* <App /> */}
      <ViewPage />
    </React.StrictMode>
  </Provider>,

  document.getElementById('root'),
);
