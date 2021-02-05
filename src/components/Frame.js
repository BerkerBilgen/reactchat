import React, { useState } from 'react';
import Profile from './Profile';
import MessageInput from './MessageInput';
import Login  from './Login';
import Register from './Register';
import { Counter } from '../features/counter/Counter';
import Messages from './Messages';
import VideoChatContainer from './VideoChatContainer';
import VideoChat from './VideoChat';
import { useSelector, useDispatch } from 'react-redux';
import {
    setUsername,
    incrementByAmount,
    memberUsername,
    memberColor,
    showVideoCall
} from '../features/memberProcess';
const Frame = () => {
    const username = useSelector(memberUsername);
    const color = useSelector(memberColor);

    const videoCall = useSelector(showVideoCall);

    var videoCallContent = "";

    if(videoCall == "true") {
        videoCallContent = <VideoChat user={username} />
    }

    return (
        <div id="frame">
            <div className={'content'}>
                <Profile />
                <Messages Username={username} />
                <MessageInput Username={username} Color={color} />
                <Login />
                <Register /> 
                {videoCallContent}
            </div>
        </div>

    )
}

export default Frame;