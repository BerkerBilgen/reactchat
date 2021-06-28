import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import Frame from './components/Frame';
import store from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import firebase from './config/Config';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Frame />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

firebase.auth().signOut().then(() => {

}).catch((error) => {

});