import React from 'react'
import styled from 'styled-components'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import moment from 'moment'

const Message = ({ user, message }) => {
  const [users] = useAuthState(auth)
  return (
    <Container style={{alignSelf: message.user === users.email? 'flex-start': 'flex-end', backgroundColor: message.user === users.email? '#E3FCBF': 'whitesmoke' }}> 
      <p>{message.message}  </p>
      <Timestamp>{moment(message.timestamp).format('LT')}</Timestamp>
    </Container>
  )
}

export default Message

const Container = styled.div`
display: flex;
flex-direction: column;
  border-radius: 0.5rem;
  font-weight: 500;
  background-color: whitesmoke;
  margin: 0.7rem;
  padding: 0.5rem 0.7rem 0.7rem 0.4rem;
  max-width: fit-content;
`
const Timestamp = styled.span`
font-size: 0.6rem;
opacity: 0.5;
margin-left: 0.6rem;
align-self: flex-end;
margin-top: 5px;
` 
