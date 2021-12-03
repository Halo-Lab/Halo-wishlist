import React from 'react';
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
      <Router>
        <App />
        <ToastContainer />
      </Router>
    </React.StrictMode>
  </Provider>,

  document.getElementById('root'),
);
