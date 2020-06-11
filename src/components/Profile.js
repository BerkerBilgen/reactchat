import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as All from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { useSelector, useDispatch } from 'react-redux';
import {
    setUsername,
    incrementByAmount,
    memberUsername,
    memberColor
} from '../features/memberProcess';

const Profile = (props) => {
    const username = useSelector(memberUsername);
    const color = useSelector(memberColor);

    return (
        <div className={'contact-profile'}>
			<img src={'http://emilcarlsson.se/assets/harveyspecter.png'} alt="" />
			<p>{username}</p>
			<div className={'social-media'}>
                <FontAwesomeIcon icon={All.faLinkedinIn} />
                <FontAwesomeIcon icon={All.faFacebookF} />
                <FontAwesomeIcon icon={All.faTwitter} />
			</div>
		</div>
     )
}

export default Profile;