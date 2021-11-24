import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import App from './App';
import { store } from './store/store';

import './styles/_global.scss';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Suspense fallback="Loading...">
        <Router>
          <App />
          <ToastContainer />
        </Router>
      </Suspense>
    </React.StrictMode>
  </Provider>,

  document.getElementById('root'),
);
