import React, { useState } from 'react';
import firebase from '../config/Config';


export default function emailLinkAuth(){

    var actionCodeSettings = {
        url: "http://localhost:3000/reactchat", //Projenin çalıştığı localhost url'ini ver.
        handleCodeInApp: true,
        iOS:{
            bundleId: '' //url iOS
        },
        android: {
            packageName: '',
            installApp: true,
            minimumVersion: '12'
        },
        dynamicLinkDomain: 'example.page.link'
    };

    firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings).then(() => {
        window.localStorage.setItem('emailForSignIn', email);
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
    })

    if(firebase.auth().isSignInWithEmailLink(window.location.href)){
        var email = window.localStorage.getItem('emailForSignIn');
        if(!email){
            email = window.prompt('Please provide an email addres for confirmation.');
        }

        firebase.auth().signInWithEmailLink(email, window.location.href)
        .then((result) => {
            window.localStorage.removeItem('emailForSignIn');
        })
        .catch((error) => {
            var errorCodeTwo = error.code;
        })
    }
}