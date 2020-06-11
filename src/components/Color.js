import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import firebase from '../config/Config';
import {
    setColor,
    incrementColor,
    memberUsername,
} from '../features/memberProcess';

export default function Color(props) {
    const [selectedcolor, setselectedcolor] = useState('');
    const dispatch = useDispatch();

    var buttonClass = 'message-color ' + props.Code;
    return (
        <button className={buttonClass} value={props.Code} onClick={() => dispatch(incrementColor(props.Code))}></button>
    );
}