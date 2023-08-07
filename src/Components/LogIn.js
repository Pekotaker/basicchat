import React from 'react';
import {auth} from '../Init/firebase'
import firebase from 'firebase/app';

export default function LogIn() {

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    
    return (
        <button className='sign-in' onClick = {signInWithGoogle}>Log In With Google</button>
    )
  }