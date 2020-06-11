import React from 'react';
import Profile from './Profile';
import MessageInput from './MessageInput';
import Login  from './Login';
import Register from './Register';
import { Counter } from '../features/counter/Counter';
import Messages from './Messages';
import { useSelector, useDispatch } from 'react-redux';
import {
    setUsername,
    incrementByAmount,
    memberUsername,
    memberColor
} from '../features/memberProcess';

const Frame = () => {
    const username = useSelector(memberUsername);
    const color = useSelector(memberColor);

    return (
        <div id="frame">
            <div className={'content'}>
                <Profile />
                <Messages Username={username} />
                <MessageInput Username={username} Color={color} />
                <Login />
                <Register />
            </div>
        </div>
    )
}

export default Frame;