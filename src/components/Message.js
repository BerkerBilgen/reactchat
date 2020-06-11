import React from 'react';

class Message extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var messageClass = "sent";

        if(!this.props.Sent) {
            messageClass = "replies";
        }

        return (
            <li className={messageClass}>
                <img src={'http://emilcarlsson.se/assets/mikeross.png'} alt="" />
                <p className={this.props.Color}>{this.props.Text}</p>
            </li>
        )
    }
}

export default Message;