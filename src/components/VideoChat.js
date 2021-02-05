import React, { useState } from 'react';
import styles from '../style.css';
import 'firebase/database';
import classnames from 'classnames';
import { PropTypes } from 'react';
import firebase from '../config/Config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Solid from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import {
  setUsername,
  incrementByAmount,
  setShowRegisterForm,
  memberUsername,
  showRegisterForm
} from '../features/memberProcess';
import jsxToString from 'jsx-to-string';
import { renderToString } from 'react-dom/server'

export function GetUserName() {
  const username = useSelector(memberUsername);
  return username;
}

export default class VideoChat extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userToCall: null,
      loading: false
    }
    this.closeCall = this.closeCall.bind(this);
	this.videoTag = React.createRef();
  }
  
  componentDidMount = () => {
    navigator.mediaDevices
            .getUserMedia({video: true})
            .then(stream => this.videoTag.current.srcObject = stream)
            .catch(console.log);
  }

  handleVideo = (stream) => {
    this.setState({ videoSrc: stream });
  }

  videoError = () => {

  }

  closeCall = () => {
    const id = this.props.id;
      const messagesRef = firebase.database().ref("calls/" + id);
      messagesRef.update({'deleted': true});
  }

  //onLoginClicked = async () => {
    //await this.props.onLogin(this.state.username)
    //this.setState({
      //isLoggedIn: true
    //})
  //}

 onStartCallClicked = () => {
  const call = firebase.database().ref("calls");
  call.push({
            from: this.props.user,
            to: this.state.userToCall,
            rejected: false,
            accepted: false,
            deleted: false
        });

        this.setState({loading: true});
  }

  renderVideos = () => {
    return  <video id={this.props.id}
    ref={this.videoTag}
    width={this.props.width}
    height={this.props.height}
    autoPlay
    title={this.props.title}></video>
  }

  renderForms = () => {
    return <div key='a' className='form'>
        <label>{ this.props.user } Call to</label>
        <input value={this.state.userToCall} type="text" onChange={e => this.setState({ userToCall: e.target.value })} />
        <button onClick={this.onStartCallClicked} id="call-btn" className="btn btn-primary">Call</button>

      </div>
    /*
    return this.state.isLoggedIn
      ? <div key='a' className='form'>
        <label>Call to</label>
        <input value={this.state.userToCall} type="text" onChange={e => this.setState({ userToCall: e.target.value })} />
        <button onClick={this.onStartCallClicked} id="call-btn" className="btn btn-primary">Call</button>

      </div>
      : <div key='b' className='form'>
        <label>Type a name</label>
        <input value={this.state.username} type="text" onChange={e => this.setState({ username: e.target.value })} />

        <button onClick={this.onLoginClicked} id="login-btn" className="btn btn-primary">Login</button>

      </div>
      */
  }

  render () {
    var closeButton = "";
    var loading = "";

if(this.props.connectedUser){
  closeButton = <FontAwesomeIcon onClick={this.closeCall} className="close call" icon={Solid.faPhoneSlash} />
}

if(this.state.loading){
  loading = "Calling...";
}

    return <div id="camera-body"><section id="container">
      {this.props.connectedUser ? null : this.renderForms()}

      {this.renderVideos()}
      {loading}
      {closeButton}

    </section></div>
  }
}