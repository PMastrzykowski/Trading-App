import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import AppRouter from './Routers/AppRouter';
import configureStore from './Store/configureStore';
import { openPosition, closePosition } from './Actions/positions';
import './Styles/styles.css';

const store = configureStore();
const state = store.getState();
const jsx = (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
ReactDOM.render(jsx, document.getElementById('app'));