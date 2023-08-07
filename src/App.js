import React from 'react';
import './App.css';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from './Init/firebase';
import ChatRoom from './Components/ChatRoom';
import LogIn from './Components/LogIn';
import SignOut from './Components/SignOut';

function App() {
  const [user] = useAuthState(auth);
  return ( 

    <div className="App">
      <header>
        <h1>basicchat</h1>
        <SignOut />
      </header>
      <section>
          {user ? <ChatRoom /> : <LogIn />}
        </section>
    </div>
  );
}







export default App;
