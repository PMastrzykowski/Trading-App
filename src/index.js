import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './Routers/AppRouter';
import configureStore from './Store/configureStore';
import './Styles/styles.css';

const store = configureStore();
const jsx = (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
ReactDOM.render(jsx, document.getElementById('app'));