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

console.log(firebase.name);
console.log(firebase.database());

class VideoChatContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      database: null,
      connectedUser: null,
      localStream: null,
      localConnection: null
    }
    this.localVideoRef = React.createRef()
    this.remoteVideoRef = React.createRef()
    
  }

    componentDidMount = async () => {
      // initialize firebase
        //firebase.initializeApp(config)
      // getting local video stream
      const localStream = await initiateLocalStream()
      this.localVideoRef.srcObject = localStream;

      // create the local connection
      const localConnection = await initiateConnection()
      this.setState({
          database:firebase,
          localStream,
          localConnection
      })

    }

    shouldComponentUpdate (nextProps, nextState) {
      // prevent rerenders if not necessary
        if(this.state.database !== nextState.database){
            return false;
        }

        if(this.state.localStream !== nextState.localStream){
            return false;
        }

        if(this.state.localConnection !== nextState.localConnection){
            return false;
        }

      return true
    }

    startCall = async (username, userToCall) => {
        const {database,localConnection,localStream}=this.state;
      // listen to the events first
        listenToConnectionEvents(localConnection, username, userToCall,database,this.remoteVideoRef,doCandidate)
      // create a new offer
        createOffer(localConnection,localStream, userToCall,doOffer,database,username)
    }

    
    onLogin = async (username) => { 
      // do the login phase
      await doLogin(username, this.state.database, this.handleUpdate)

    }

    setLocalVideoRef = ref => {
      this.localVideoRef = ref
    }

    setRemoteVideoRef = ref => {
      this.remoteVideoRef = ref
    }

    handleUpdate = (notif, username) => {
      // read the received notif and apply it
        const {database,localConnection,localStream} = this.state
      if(notif){
          switch (notif.type){
              case 'offer':

              this.setState({
                  connectedUser: notif.from
              })
                  //listen connection events
                    listenToConnectionEvents(localConnection,username,notif.from,database,this.remoteVideoRef,doCandidate)
                  //send response
                  sendAnswer(localConnection,localStream,notif,doAnswer,database,username)
                  
                  break;
                  case 'answer':
                      this.setState({
                          connectedUser: notif.from
                      })
                      //start the call
                      startCall(localConnection, notif)
                      break;
                      case 'candidate':
                          //add candidate to the connection
                          addCandidate(localConnection, notif)

                          break;
                          default:
                              break;
          }
      }

    }

    render () {
      return <VideoChat
        startCall={this.startCall}
        onLogin={this.onLogin}
        setLocalVideoRef={this.setLocalVideoRef}
        setRemoteVideoRef={this.setRemoteVideoRef}
        connectedUser={this.state.connectedUser}
      />
    }
}

export default VideoChatContainer