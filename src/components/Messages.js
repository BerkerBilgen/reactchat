import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as All from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import firebase from '../config/Config';
import Message from './Message';
import { animateScroll } from "react-scroll";

class Messages extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messageList: []
        };
    }

    componentDidMount() {
        const messagesRef = firebase.database().ref("messages");
        messagesRef.on("value", (snapshot) => {
            let messages = snapshot.val();
            let newState = [];
            for (let m in messages) {
                newState.push({
                    id: m,
                    message: messages[m].message,
                    date: messages[m].date,
                    username: messages[m].username,
                    color: messages[m].color
                });
            }
            this.setState({ messageList: newState });
        });

        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        animateScroll.scrollToBottom({
          containerId: "message-list"
        });
    }

    render () {
        const newData = React.createRef();

        if(this.props.Username != "") {
            return (
                <div id="message-list" className={'messages'}>
                    <ul>
                        {
                            Object.keys(this.state.messageList).map((m) => 
                                <Message Color={this.state.messageList[m].color} Sent={this.props.Username != this.state.messageList[m].username} Username={this.state.messageList[m].username} Text={this.state.messageList[m].message} Date={this.state.messageList[m].date} />
                            )
                        }
                    </ul>
                </div>
            )
        }
        else {
            return (
                <div className={'messages'}>
                </div>
            )
        }
    }
}

export default Messages;