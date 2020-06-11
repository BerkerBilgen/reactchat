import firebase from 'firebase';
import { library }  from '@fortawesome/fontawesome-svg-core'

var firebaseConfig = {
    apiKey: "AIzaSyC6zWRnYvgSfWF7AfsqCCaL18YKD4VIOkI",
    authDomain: "reactchat-3a4dc.firebaseapp.com",
    databaseURL: "https://reactchat-3a4dc.firebaseio.com",
    projectId: "reactchat-3a4dc",
    storageBucket: "reactchat-3a4dc.appspot.com",
    messagingSenderId: "71361254830",
    appId: "1:71361254830:web:cc7cf5c53d164db98ae43f",
    measurementId: "G-6Z255M0NRW"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase;