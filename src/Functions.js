import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setUsername,
    incrementByAmount,
    memberUsername,
} from './features/memberProcess';

const GetUsername = (props) => {
    const username = useSelector(memberUsername);

    return (
        username
    );
}

export default GetUsername;