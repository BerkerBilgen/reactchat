import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setUsername,
    incrementByAmount,
    setShowRegisterForm,
    memberUsername,
    showRegisterForm
} from '../features/memberProcess';
import Register from './Register';

export default function Login(props) {
    const username = useSelector(memberUsername);
    const showregister = useSelector(showRegisterForm);

    const [nickname, setNickname] = useState('');
    const [selectedcolor, setselectedcolor] = useState('');
    const dispatch = useDispatch();
    var drawLoginForm = (username == "" || username == null || username == undefined);

    if (showregister == "true") {
        return ( 
            <Register />
        )
    }  
    else {
        if (drawLoginForm) {
            return (
                <div id="LoginForm">
                    <h3>Who are you?</h3>
                    <input value={nickname} onChange={e => setNickname(e.target.value)} type="text" placeholder="Nickname" />
                    <input type="password" placeholder="Password" />
                    <button onClick={() => dispatch(incrementByAmount(nickname))}>Login</button>
                    <div class="register-message">If you are not registered yet, you can register by clicking <span class="span-link" onClick={() => dispatch(setShowRegisterForm("true"))}>here</span>!</div>
                </div>
            );
        } else {
            return (
                <div>
                </div>
            );
        }
    }
}