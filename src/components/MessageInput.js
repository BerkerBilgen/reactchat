import React, {useState} from 'react';
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
import {storage} from "../config/Config";
import Picker from 'emoji-picker-react';

class MessageInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messageList: [],
            message: "",
            image: "",
            video:"",
            username: this.props.Username,
            color: this.props.Color,
            fileName : "",
            isVideo: false,
            isImage: false,
            chosenEmoji: null,
            setChosenEmoji: null,
            emojiVisible: false
        };

        this.sendMessage = this.sendMessage.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
    }

    handleMessage (event) {
        this.setState({message: event.target.value});
    }

    showEmoji(){
        var isActive = this.state.emojiVisible;

        if (isActive){
            this.setState({emojiVisible: false});
        } else {
            this.setState({emojiVisible: true});
        }
    }

    addEmoji(e) {
        var text = this.state.message;
        text = text + e.target.textContent;
        this.setState({message: text});
    }

    onEmojiClick = (e, emojiObject) => {
        this.setChosenEmoji(emojiObject);
      };

      setChosenEmoji = (emojiObject) => {
        var text = this.state.message;
        text = text + emojiObject.emoji;
        this.setState({message: text});
        this.setState({emojiVisible: false});
      };

    sendMessage = e => {
        e.preventDefault();

        const refMessages = firebase.database().ref("messages");
        var messageList = this.state.messageList;

        const fileUrl = this.state.fileUrl;

        var messageContent = this.state.message;

       if(fileUrl != null && fileUrl.length > 0) {
           messageContent = fileUrl;
       }

        refMessages.push({
            message: messageContent,
            date: Date.now(),
            username: this.props.Username,
            color: this.props.Color,
            deleted: false,
            isImage: this.state.isImage,
            isVideo : this.state.isVideo
        });

        this.setState({fileUrl:""})
        this.setState({"messageList": messageList, "message": ""});
        this.setState({isImage: false, isVideo: false});
      }


      onVideoChange (e){

        
        const reader = new FileReader();

        var currentDate = new Date
        var fileName = currentDate.getTime();

        let file = e.target.files[0];

        if(file){
            reader.onload = () => {
                if(reader.readyState === 2){
                    var extension = file.name.split(".")[1];
                    console.log(file);
                    this.setState({video:file});
                    if(file){
                        const storageRef = storage.ref();
                        const videoRef = storageRef.child(fileName + "." + extension);
                        videoRef.put(file)
                        .then((uploadedFile) => {
                            return uploadedFile.ref.getDownloadURL();
                        }).then(url => {
                            this.setState({fileName:file.name});
                            this.setState({fileUrl:url});
                            this.setState({isVideo: true});
                            alert("Video Başarıyla Yüklendi");
                        });
                    } else{
                        alert("Lütfen Video Seçiniz.");
                    }
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else{
            this.setState({this:null});
        }
    };

      onImageChange (e){

        
        const reader = new FileReader();

        var currentDate = new Date
        var fileName = currentDate.getTime();

        let file = e.target.files[0];

        if(file){
            reader.onload = () => {
                if(reader.readyState === 2){
                    var extension = file.name.split(".")[1];
                    console.log(file);
                    this.setState({image:file});
                    if(file){
                        const storageRef = storage.ref();
                        const imageRef = storageRef.child(fileName + "." + extension);
                        imageRef.put(file)
                        .then((uploadedFile) => {
                            return uploadedFile.ref.getDownloadURL();
                        }).then(url => {
                            this.setState({fileName:file.name});
                            this.setState({fileUrl:url});
                            this.setState({isImage: true});
                            alert("Fotoğraf Başarıyla Yüklendi");
                        });
                    } else{
                        alert("Lütfen Fotoğraf Seçiniz.");
                    }
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else{
            this.setState({this:null});
        }
    };

    render () {
        return (
            <div className={'message-input'}>
                <div class="wrap">
                    <form onSubmit={this.sendMessage}>
                        <div id="emojis" className={this.state.emojiVisible ? "show" : "hide"}>
                        <Picker onEmojiClick={this.onEmojiClick} pickerStyle={{ width: '100%', height:'400px' }}/>
{/*                             <ul>
                                <li onClick={this.addEmoji.bind(this)}>😀</li>
                                <li onClick={this.addEmoji.bind(this)}>😂</li>
                                <li onClick={this.addEmoji.bind(this)}>😍</li>
                                <li onClick={this.addEmoji.bind(this)}>🤪</li>
                                <li onClick={this.addEmoji.bind(this)}>🤗</li>
                                <li onClick={this.addEmoji.bind(this)}>🤐</li>
                                <li onClick={this.addEmoji.bind(this)}>😏</li>
                                <li onClick={this.addEmoji.bind(this)}>🤤</li>
                                <li onClick={this.addEmoji.bind(this)}>🤮</li>
                                <li onClick={this.addEmoji.bind(this)}>😎</li>
                                <li onClick={this.addEmoji.bind(this)}>😱</li>
                                <li onClick={this.addEmoji.bind(this)}>😈</li>
                                <li onClick={this.addEmoji.bind(this)}>☠</li>
                                <li onClick={this.addEmoji.bind(this)}>💩</li>
                                <li onClick={this.addEmoji.bind(this)}>😸</li>
                                <li onClick={this.addEmoji.bind(this)}>💗</li>
                                <li onClick={this.addEmoji.bind(this)}>💙</li>
                                <li onClick={this.addEmoji.bind(this)}>💯</li>
                                <li onClick={this.addEmoji.bind(this)}>💬</li>
                                <li onClick={this.addEmoji.bind(this)}>👋</li>
                                <li onClick={this.addEmoji.bind(this)}>👌</li>
                                <li onClick={this.addEmoji.bind(this)}>🤟</li>
                                <li onClick={this.addEmoji.bind(this)}>👍</li>
                                <li onClick={this.addEmoji.bind(this)}>👏</li>
                                <li onClick={this.addEmoji.bind(this)}>🙏</li>
                                <li onClick={this.addEmoji.bind(this)}>💪</li>
                                <li onClick={this.addEmoji.bind(this)}>👀</li>
                                <li onClick={this.addEmoji.bind(this)}>🤦‍♂️</li>
                                <li onClick={this.addEmoji.bind(this)}>🤦</li>
                                <li onClick={this.addEmoji.bind(this)}>👨‍🎓</li>
                                <li onClick={this.addEmoji.bind(this)}>🍻</li>
                                <li onClick={this.addEmoji.bind(this)}>🌍</li>
                                <li onClick={this.addEmoji.bind(this)}>⏰</li>
                                <li onClick={this.addEmoji.bind(this)}>❄</li>
                                <li onClick={this.addEmoji.bind(this)}>☃</li>
                                <li onClick={this.addEmoji.bind(this)}>🔥</li>
                                <li onClick={this.addEmoji.bind(this)}>🎃</li>
                                <li onClick={this.addEmoji.bind(this)}>🏀</li>
                                <li onClick={this.addEmoji.bind(this)}>⚽</li>
                                <li onClick={this.addEmoji.bind(this)}>🎱</li>
                                <li onClick={this.addEmoji.bind(this)}>🧿</li>
                                <li onClick={this.addEmoji.bind(this)}>🔊</li>
                                <li onClick={this.addEmoji.bind(this)}>📺</li>
                                <li onClick={this.addEmoji.bind(this)}>🚳</li>
                                <li onClick={this.addEmoji.bind(this)}>⛔</li>
                                <li onClick={this.addEmoji.bind(this)}>🏳️‍🌈</li>
                                <li onClick={this.addEmoji.bind(this)}>🇵🇱</li>
                                <li onClick={this.addEmoji.bind(this)}>🇹🇷</li>
                                <li onClick={this.addEmoji.bind(this)}>👨‍🔬</li>
                                <li onClick={this.addEmoji.bind(this)}>👮</li>
                                <li onClick={this.addEmoji.bind(this)}>🕵</li>
                                <li onClick={this.addEmoji.bind(this)}>💂‍♂️</li>
                                <li onClick={this.addEmoji.bind(this)}>🎅</li>
                                <li onClick={this.addEmoji.bind(this)}>🧍</li>
                                <li onClick={this.addEmoji.bind(this)}>🏃‍♂️</li>

                            </ul> */}
                        </div>
                        <input value={this.state.message} onChange={this.handleMessage} type="text" placeholder="Write your message..." />
                        <input type="file" id="fileInput" accept="image/x-png,image/jpeg,image/jpg,video/mp4" onChange={(e) => { e.target.files[0].type == "video/mp4" ? this.onVideoChange(e) : this.onImageChange(e) }}/>
                        <div className="btn_class" onClick={this.showEmoji.bind(this)}>Emoji</div>
                        {/* <input type="file" accept="video/*" onChange={(e) => {this.onVideoChange(e) }}/> */}
                        <button type="submit" className={'submit'}><FontAwesomeIcon icon={All.faPaperPlane} /></button>
                    </form>
                </div>
		    </div>
        )
    }
}

export default MessageInput;