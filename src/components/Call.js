import React from 'react'
//import styles from '../VideoChat.css'
import config from '../config/Config'
import 'firebase/database'
import firebase from 'firebase/app' 
import VideoChat from './VideoChat'
import {startCall,createOffer, initiateConnection, initiateLocalStream, listenToConnectionEvents, sendAnswer, addCandidate} from '../Modules/RTCModule'
import { doLogin,doAnswer, doCandidate, doOffer } from '../Modules/Firebase'
import { data } from 'jquery'
import 'webrtc-adapter'
import GetUsername from '../Functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as All from '@fortawesome/free-brands-svg-icons';
import * as Solid from '@fortawesome/free-solid-svg-icons';

console.log(firebase.name);
console.log(firebase.database());

class Call extends React.Component {
  constructor (props) {
    super(props)
    this.accept = this.accept.bind(this);
  }

    componentDidMount = async () => {
      
    }

    accept = () => {
        const id = this.props.callid;
        const messagesRef = firebase.database().ref("calls/" + id);
        messagesRef.update({'accepted': true});
    }

    reject = () => {
        const id = this.props.callid;
        const messagesRef = firebase.database().ref("calls/" + id);
        messagesRef.update({'rejected': true, 'deleted': true});
    }

    render () {
      var returnData = <div class="calling">
    <p>{ this.props.from } calling!</p>
    <FontAwesomeIcon onClick={this.accept} className="accept call" icon={Solid.faPhone} />
    <FontAwesomeIcon onClick={this.reject} className="reject call" icon={Solid.faPhoneSlash} />
</div>;

      if (this.props.showVideo == "true") {
        returnData = <VideoChat user="" connectedUser={true} id={this.props.callid} />
      }
      return returnData;
    }
}

export default Call