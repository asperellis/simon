import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import appReducer from './reducers/App';

import loadFonts from './loadFonts';
import '!style-loader!css-loader!bootstrap/dist/css/bootstrap-reboot.min.css';
import '!style-loader!css-loader!bootstrap/dist/css/bootstrap-grid.min.css';
import './index.css';

const store = createStore(appReducer, applyMiddleware(thunk));

loadFonts();
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
