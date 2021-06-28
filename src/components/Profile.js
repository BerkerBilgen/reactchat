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
    memberAvatar,
    memberColor,
    setShowVideoCall
} from '../features/memberProcess';
import { faVideo } from '@fortawesome/free-solid-svg-icons';

const Profile = (props) => {
    const username = useSelector(memberUsername);
    const avatar = useSelector(memberAvatar);
    const color = useSelector(memberColor);

    const dispatch = useDispatch();

    return (
        <div className={'contact-profile'}>
			<img src={avatar} alt="" />
			<p>{username}</p>
			<div className={'social-media'}> 
            <a target="_blank" href="https://www.instagram.com/reactjsofficial/"><FontAwesomeIcon icon={All.faInstagram} /></a>
            <a target="_blank" href="https://www.facebook.com/groups/reacttr/"><FontAwesomeIcon icon={All.faFacebookF} /></a>
            <a target="_blank" href="https://twitter.com/reactjs"><FontAwesomeIcon icon={All.faTwitter} /></a>   
                <FontAwesomeIcon onClick={() => dispatch(setShowVideoCall("true"))} icon={faVideo} />
			</div>
		</div>
     )
}

export default Profile;