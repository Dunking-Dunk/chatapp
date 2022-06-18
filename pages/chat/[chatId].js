import React from 'react'
import styled from 'styled-components'
import Sidebar from '../../components/Sidebar'
import ChatScreen from '../../components/ChatScreen'
import { db, auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import getRecipientEmail from '../../utils/getRecipientEmail'


const Chat = ({ messages, chat }) => {
  const [user] = useAuthState(auth)
  return (
    <Container>
      <head>
        <title>Chat with {getRecipientEmail(chat.users,user)}</title>
      </head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen messages={messages} recipientEmail={getRecipientEmail(chat.users,user)} />
      </ChatContainer>
      </Container>
  )
}

export default Chat

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.chatId)
  
  const messagesRes = await ref.collection('messages').orderBy("timestamp", "asc").get()

  const messages = messagesRes.docs.map(doc => ({
    id: doc.id,
      ...doc.data()
  })).map((msg) => ({
    ...msg,
    timestamp: msg.timestamp.toDate().getTime()
  }))

  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data()
  }

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat
    }
  }

}

const Container = styled.div`
  display: flex;
`
const ChatContainer = styled.div`
  flex: 1;
`