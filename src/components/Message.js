import React from 'react';
import firebase from '../config/Config';
import { animateScroll } from "react-scroll";
import $ from 'jquery'; 
import {storage} from "../config/Config";

class Message extends React.Component {
    constructor(props) {
        super(props);
    }

    deleteMessage (event) {
        const messagesRef = firebase.database().ref("messages/" + event.currentTarget.getAttribute('data-id'));
        messagesRef.update({'deleted': true});
        var span = $("span[data-id='" + event.currentTarget.getAttribute('data-id') + "']");
        $(span).closest("p").html("Bu mesaj silindi");
    }

    render() {
        var messageClass = "sent";
        var deleteHtml = "";

        if(!this.props.Sent) {
            messageClass = "replies";
            deleteHtml = <span data-id={this.props.Id} onClick={this.deleteMessage} >Sil</span>
        }

        var date = new Date(this.props.Date);
        var hour = date.getUTCHours();
        var minute = date.getUTCMinutes();
        
        var messageContent = "";

        if(this.props.IsImage) {
            messageContent = <p className={this.props.Color}><img className="message-image" src={this.props.Text} /></p>
        } 
        else if(this.props.IsVideo){
            messageContent = <p className={this.props.Color}><video className="message-video"src={this.props.Text} width="2000" height="900" controls>
            </video>
      </p>
        }
        else {
            messageContent = <p className={this.props.Color}>{this.props.Text} <div> {deleteHtml} <span>{hour}:{minute}</span></div></p>;
        }

        if(this.props.Deleted){
            var className = this.props.Color + " deleted"
            messageContent = <p className={className}>Bu mesaj silindi</p>;
        }

        return (
            <li className={messageClass}>
                <img src={'http://emilcarlsson.se/assets/mikeross.png'} alt="" />
                {messageContent}
            </li>
        )
    }
}

export default Message;