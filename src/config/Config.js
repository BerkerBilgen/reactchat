import firebase from 'firebase';
import { library }  from '@fortawesome/fontawesome-svg-core'
import "firebase/storage";

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
  var storage = null;
  // Initialize Firebase
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
    storage = firebase.storage()
  } else {
    firebase.app(); //If already initialized, use that one
    storage = firebase.storage()
  }
  
  export{ storage,firebase as default}
  // export default firebase;