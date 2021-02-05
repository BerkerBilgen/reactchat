import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as All from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, Link   } from 'react-router-dom'; //Deneme 8.12.20
import VideoChatContainer from './VideoChatContainer';
import VideoChat from './VideoChat';
import {
    setUsername,
    incrementByAmount,
    memberUsername,
    memberColor,
    setShowVideoCall
} from '../features/memberProcess';
import { faVideo } from '@fortawesome/free-solid-svg-icons';

const Profile = (props) => {
    const username = useSelector(memberUsername);
    const color = useSelector(memberColor);

    const dispatch = useDispatch();

    return (
        <div className={'contact-profile'}>
			<img src={'http://emilcarlsson.se/assets/harveyspecter.png'} alt="" />
			<p>{username}</p>
			<div className={'social-media'}>
                <FontAwesomeIcon icon={All.faInstagram} />
                <FontAwesomeIcon icon={All.faFacebookF} />
                <FontAwesomeIcon icon={All.faTwitter} />
                <FontAwesomeIcon onClick={() => dispatch(setShowVideoCall("true"))} icon={faVideo} />
			</div>
		</div>
     )
}

export default Profile;