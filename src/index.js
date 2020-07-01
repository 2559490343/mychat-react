import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/style/reset.css'
import "lib-flexible"
import api from './assets/api/api'
import utils from './assets/js/utils'
import Socket from './assets/js/socket'

React.api = api;
React.utils = utils;
React.socket = Socket.getInstance();
if (React.utils.getStorage('user')) {
  React.socket.emit('open', React.utils.getStorage('user')._id)
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

