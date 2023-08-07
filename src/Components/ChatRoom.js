import React, { useRef, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {firestore} from '../Init/firebase'
import {auth} from '../Init/firebase'
import logo from '../default_avatar.jpg'

export default function ChatRoom() {

    const dummy = useRef()

    const messagesRef  = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
  
    const [messages] = useCollectionData(query, {idField: 'id'});
    const [formValue, setFormValue] = useState('');

    const sendMessage = async(e) => {

        // prevent refreshing page
        e.preventDefault();
    
        const {uid, photoURL} = auth.currentUser;
    
        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid: uid,
            photoURL: photoURL
        })
        
        setFormValue('');
        dummy.current.scrollIntoView({behavior: 'smooth'});
    }
    return (
        <>
            <div>
                {messages && messages.map(msg => <ChatMessage key = {msg.id} message = {msg} />)}
            </div>

            <div ref = {dummy}></div>

            <div>
                <form onSubmit={sendMessage}>
                    <input value = {formValue} onChange={(e) => setFormValue(e.target.value)}/>

                    <button type = "submit">Send</button>
                </form>
            </div>
        </>
    )
  
};

// Messages Components
function ChatMessage(props) {
    const {text , uid, photoURL} = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
    <>
        <div className={`message ${messageClass}`}>
        <img src={photoURL || logo} alt="Logo" />
        <p>{text}</p>
    </div>
    </>
    )
};



