import React from 'react'
import {useRouter} from 'next/router'
import { VscAccount } from 'react-icons/vsc'
import styled from 'styled-components'
import { auth,db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import getRecipientEmail from '../utils/getRecipientEmail'

const Chat = ({ id, users }) => {
    const router = useRouter()
    const [user] = useAuthState(auth)
    const recipientEmail = getRecipientEmail(users, user)
    const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==', getRecipientEmail(users, user)))
    const recipient = recipientSnapshot?.docs?.[0]?.data()
    const enterChat = () => {
        router.push(`/chat/${id}`)
    }

  return (
      <Container onClick={enterChat}>
          {recipient ? <UserImage src={recipient?.photoURL} referrerpolicy="no-referrer"/> :<UserAvatar />}
             
          <p>{recipientEmail}</p>
    </Container>
  )
}

export default Chat




const Container = styled.div`
display: flex;
align-items: center;
cursor: pointer;
padding: 0.9rem;
word-break: break-word;
transition: 0.35s ease;
:hover {
    background-color: #e9eaeb;
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

