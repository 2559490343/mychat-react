import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/style/reset.css'
import "lib-flexible"
import api from './assets/api/api'
React.api = api;
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

