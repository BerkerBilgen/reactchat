import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as All from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import firebase from '../config/Config';
import { useSelector, useDispatch } from 'react-redux';
import {
    setUsername,
    incrementByAmount,
    memberUsername,
} from '../features/memberProcess';
import GetUsername from '../Functions';

class MessageInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messageList: [],
            message: "",
            username: this.props.Username,
            color: this.props.Color
        };

        this.sendMessage = this.sendMessage.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
    }

    handleMessage (event) {
        this.setState({message: event.target.value});
    }

    sendMessage = e => {
        e.preventDefault();

        const refMessages = firebase.database().ref("messages");
        var messageList = this.state.messageList;

        refMessages.push({
            message: this.state.message,
            date: Date.now(),
            username: this.props.Username,
            color: this.props.Color,
            deleted: false
        });

        this.setState({"messageList": messageList, "message": ""});
      }

    /*
    sendMessage (e) {
        const refMessages = firebase.database().ref("messages");
        var messageList = this.state.messageList;

        refMessages.push({
            message: this.state.message,
            date: Date.now(),
            username: this.props.Username,
            color: this.props.Color
        });

        this.setState({"messageList": messageList});
    }
    */

    render () {
        return (
            <div className={'message-input'}>
                <div class="wrap">
                    <form onSubmit={this.sendMessage}>
                        <input value={this.state.message} onChange={this.handleMessage} type="text" placeholder="Write your message..." />
                        <button type="submit" className={'submit'}><FontAwesomeIcon icon={All.faPaperPlane} /></button>
                    </form>
                </div>
		    </div>
        )
    }
}

export default MessageInput;