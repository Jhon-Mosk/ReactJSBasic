import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app'
import './index.css';

const myName = 'Alexander';

ReactDOM.render(
  <React.StrictMode>
    <App name={myName} />
  </React.StrictMode>,
  document.getElementById("root")
);
