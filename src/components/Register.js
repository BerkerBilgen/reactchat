import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setUsername,
    incrementByAmount,
    memberUsername,
} from '../features/memberProcess';
import Color from './Color';

export default function Register(props) {
    const username = useSelector(memberUsername);
    const [nickname, setNickname] = useState('');
    const [selectedcolor, setselectedcolor] = useState('');
    const dispatch = useDispatch();
    var drawRegisterForm = (username == "" || username == null || username == undefined);

    if (drawRegisterForm) {
        return (
            <div id="LoginForm">
                <h3>Who are you?</h3>
                <input value={nickname} onChange={e => setNickname(e.target.value)} type="text" placeholder="Nickname" />
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button onClick={() => dispatch(incrementByAmount(nickname))}>Login</button>
            </div>
        );
    } else {
        return (
            <div>
            </div>
        );
    }
}