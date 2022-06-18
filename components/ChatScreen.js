import { useRouter } from 'next/router'
import React, { useState, useRef } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { VscAccount } from 'react-icons/vsc'
import styled from 'styled-components'
import { auth,db } from '../firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import { BsEmojiSmile, BsFillMicFill } from 'react-icons/bs'
import firebase from "firebase/compat/app"
import Message from './Message'
import moment from 'moment'
import InputEmoji from 'react-input-emoji'

const ChatScreen = ({ messages, recipientEmail }) => {
    const [user] = useAuthState(auth)
    const router = useRouter()
    const [textmsg, setTextmsg] = useState('')
    const endofmessageRef = useRef(null)

    const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==', recipientEmail))
    const recipient = recipientSnapshot?.docs?.[0]?.data()

    const [messageSnapshot] = useCollection(db.collection("chats").doc(router.query.chatId).collection("messages").orderBy('timestamp', 'asc'))
    
    const scrollToBottom = () => {
        endofmessageRef.current.scrollIntoView({
            behavior: "smooth",
            block: 'start'
        })
    } 

    
    const showMessages = () => {
        if (messageSnapshot) {
            return messageSnapshot.docs.map((message) => {
                return(<Message key={message.id} user={message.data().user} message={{
                    ...message.data(),
                    timestamp: message.data().timestamp?.toDate().getTime()
                }} />)
            })
        } else {
            return JSON.parse(messages).map((message) => {
                return(<Message key={message.id} user={message.user} message={message} />)
            })     
        }
    }

    const sendMessage = () => {
        db.collection('users').doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true })
        
        db.collection('chats').doc(router.query.chatId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: textmsg,
            user: user.email,
            photoURL: user.photoURL
        })
        setTextmsg('')
        scrollToBottom()
    }


  return (
      <Container>
          <Header>
              {recipient ? <UserImage src={recipient?.photoURL} referrerpolicy="no-referrer" /> : <UserAvatar />}
              <Headerinformation>
                  <h3>{recipientEmail}</h3>
                  {recipient?.lastSeen ?
                   <p>Last active: {moment(recipient?.lastSeen?.toDate().getTime()).fromNow()}</p>: <p>last active: unavailable</p>
                }
             
              </Headerinformation>
          </Header>
          <MessageContainer id='msg_container'>
              {showMessages()}
              <EndOfMessage ref={endofmessageRef} />
          </MessageContainer>
          <MessageInputContainer>
              <MessageInput placeholder='Enter your message' onChange={setTextmsg} value={textmsg}         cleanOnEnter
          onEnter={sendMessage}/>
          </MessageInputContainer>
    </Container>
  )
}

export default ChatScreen

const Container = styled.div`
`

const Header = styled.div`
position: sticky;
top: 0;
z-index: 100;
display: flex;
align-items: center;
margin-left:20px;
background-color: white;
height: 80px;
border-bottom: 1px solid whitesmoke;
`
const Headerinformation = styled.div`
display: flex;
flex-direction: column;

>p {
    font-size: 14px;
    color: gray;
}
`
const UserAvatar = styled(VscAccount)`
    width: 2rem;
    height: 2rem;
    margin: 5px;
    margin-right: 15px;
`
const UserImage = styled.img`
  width: 2rem;
    height: 2rem;
    margin: 5px;
    margin-right: 15px;
    border-radius: 50%;
`


const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 160px);
    border-bottom: 1px solid whitesmoke;
    overflow-x: hidden;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
`
const EndOfMessage = styled.div`
    margin-bottom: 100px;
`

const MessageInputContainer = styled.form`
display: flex;
height: 80px;
padding: 10px;
position: sticky;
bottom: 0;
background-color: white;
align-items: center;
z-index: 100;
`

const Emoji = styled(BsEmojiSmile)`
width: 2rem;
height: 2rem;
cursor: pointer;
`

const Mic = styled(BsFillMicFill)`
width: 2rem;
height: 2rem;
`
const MessageInput = styled(InputEmoji)`
    border: none;
    flex: 1;
    align-items: center;
    padding: 20px;
    margin: 0px 15px;
    outline: none;
    background-color: whitesmoke;
    border-radius: 10px;
`
const ImageInput = styled.input``