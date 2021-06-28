import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setUsername,
    setAvatar,
    incrementByAmount,
    incrementByAvatar,
    incrementEmailByAmount,
    memberUsername,
    memberEmailAddress
} from '../features/memberProcess';
import Color from './Color';
import '../components/emailLinkAuth'; // Berker Deneme
import { event } from 'jquery';
import firebase from '../config/Config';
import {validate,res} from 'react-email-validator';
import FacebookLogin from 'react-facebook-login';
import { Card, Image } from 'react-bootstrap';

var actionCodeSettings = {
    url: "http://localhost:3000/reactchat", //Projenin çalıştığı localhost url'ini ver.
    handleCodeInApp: true
};

export default function Register(props) {
    const username = useSelector(memberUsername);
    const emailAddress = useSelector(memberEmailAddress);
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [selectedcolor, setselectedcolor] = useState('');
    const dispatch = useDispatch();
    var drawRegisterForm = (username == "" || username == null || username == undefined);


    const [login, setLogin] = useState(false);
    const [data, setData] = useState({});
    const [picture, setPicture] = useState('');


    const responseFacebook = (response) => {
        console.log(response);
        setData(response);
        if(response.accessToken){
            setNickname(response.name);
            setEmail("berkerbilgen@yandex.com");
            setAvatar(response.picture.data.url);
            callEmailFunc(response.email, response.name, picture);
        }

        if (response.accessToken) {
          setLogin(true);
        } else {
          setLogin(false);
        }
      }


    function callEmailFunc(email, nickname, picture){
        firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings).then(() => {
            validate(email);
            if(res){
                window.localStorage.setItem('emailForSignIn', email);
                alert("Set edildi");
            }
            else{
                alert("Email Hatalı");
            }
        {/*window.localStorage.setItem('emailForSignIn', email);*/}
            /*alert("Set edildi");*/
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });

        dispatch(incrementByAvatar(avatar));
        dispatch(incrementByAmount(nickname));
        
    }
    if (drawRegisterForm) {
        return (
            <div id="LoginForm">
                <div class="containerFacebook">
                  <Card style={{ width: '250px', height: '20px'}}>
                    <Card.Header>
                      {!login &&
                        <FacebookLogin
                          appId="971141813672064"
                          autoLoad={true}
                          fields="name,email,picture"
                          scope="public_profile,user_friends"
                          callback={responseFacebook}
                          icon="fa-facebook" />
                      }
                      {login &&
                        <Image src={picture} roundedCircle />
                      }
                    </Card.Header>
                    {login &&
                      <Card.Body>
                        <Card.Title>{data.name}</Card.Title>
                        <Card.Text>
                          {data.email}
                        </Card.Text>
                      </Card.Body>
                    }
                  </Card>
                </div>
                <div class="login-form">
                <h3>Who are you?</h3>
                
                <input value={nickname} onChange={e => setNickname(e.target.value)} type="text" placeholder="Nickname" />
               {/* <input type="text" placeholder="Email" /> */}
               <input value={email} onChange={e => setEmail(e.target.value)} type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
                {/*<button onClick={() => dispatch(incrementByAmount(nickname))}>Login</button>*/}
                {/*<button onClick={() => callEmailFunc(email, nickname)}>Login</button>*/}
                <button onClick={() => callEmailFunc(email,nickname)}>Login</button>
                </div>
                
            </div>
        );
    } else {
        return (
            <div>
            </div>
        );
    }
}