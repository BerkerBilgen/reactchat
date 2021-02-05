import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as All from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import firebase from '../config/Config';
import Message from './Message';
import { animateScroll } from "react-scroll";
import Call from './Call';

class Messages extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.Username,
            messageList: [],
            callList: []
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
                    color: messages[m].color,
                    deleted: messages[m].deleted
                });
            }
            this.setState({ messageList: newState });
        });

        this.scrollToBottom();

        const callsRef = firebase.database().ref("calls");
        callsRef.on("value", (snapshot) => {
            let calls = snapshot.val();
            let newState = [];
            for (let m in calls) {
                newState.push({
                    id: m,
                    from: calls[m].from,
                    to: calls[m].to,
                    accepted: calls[m].accepted,
                    rejected: calls[m].rejected,
                    deleted: calls[m].deleted
                });
            }

            this.setState({ callList: newState });
        });
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
        var username = this.props.Username;
        const userCalls = this.state.callList.filter(function(e) {
            return e.to === username && e.accepted === false && e.rejected === false && e.deleted === false
        });

        const showVideo = this.state.callList.filter(function(e) {
            return e.to === username && e.accepted === true && e.rejected === false && e.deleted === false
        });

        var callDiv = "";

        if(username != "" && userCalls != null && userCalls.length > 0) {
            callDiv = <Call callid={userCalls[0].id} from={userCalls[0].from} />
        }

        if(username != "" && showVideo != null && showVideo.length > 0) {
            callDiv = <Call showVideo="true" callid={showVideo[0].id} from={showVideo[0].from} />
        }

        if(this.props.Username != "") {
            return (
                <div id="message-list" className={'messages'}>
                    {callDiv}
                    <div>
                        <ul>
                            {
                                Object.keys(this.state.messageList).map((m) => 
                                    <Message Id={this.state.messageList[m].id} Color={this.state.messageList[m].color} Sent={this.props.Username != this.state.messageList[m].username} Username={this.state.messageList[m].username} Text={this.state.messageList[m].message} Deleted={this.state.messageList[m].deleted} Date={this.state.messageList[m].date} />
                                )
                            }
                        </ul>
                    </div>
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