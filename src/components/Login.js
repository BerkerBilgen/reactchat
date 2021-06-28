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
import FacebookLogin from 'react-facebook-login';


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
        
            return (
                <div>
                </div>
            );
    }
}