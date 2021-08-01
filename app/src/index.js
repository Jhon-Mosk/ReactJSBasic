import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store';
//TODO методичка на (Реализация добавления чатов), у меня видимость чатов, плюс почистить от мусора
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
