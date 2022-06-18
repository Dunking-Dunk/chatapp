import React from 'react'
import { MdMessage } from 'react-icons/md'
import { FiMoreHorizontal } from 'react-icons/fi'
import { FiSearch } from 'react-icons/fi'
import * as EmailValidation from 'email-validator'
import {auth, db} from '../firebase'
import styled from 'styled-components'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import Chat from './Chat'


const Sidebar = () => {
  const [user] = useAuthState(auth)
  const userChatRef = db.collection('chats').where('users', 'array-contains', user.email)
  const [snapshot] = useCollection(userChatRef)
  const createChat = () => {
    const input = prompt('Please enter a email address for the user you wish to chat with.')
    if (!input) return null
    if (EmailValidation.validate(input) && input !== user.email && !chatAlreadyExist(input)) {
      db.collection('chats').add({
          users: [user.email, input]
        })
    }
  }

  const chatAlreadyExist = (recipientEmail) => !!snapshot?.docs.find(chat => chat.data().users.find(user => user === recipientEmail)?.length > 0)
  

  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} referrerpolicy="no-referrer" onClick={() => auth.signOut()} />
        <IconsContainer>
          <ChatIcon />
          <MoreIcon />
        </IconsContainer>
      </Header>
        
      <Search>
        <SearchIcon />
        <Input type="search" placeholder='search in chats' />
      </Search>

      <SideBarButton onClick={createChat}>
        START A NEW CHAT
      </SideBarButton>

      {snapshot?.docs.map((chat) => {
        return (
          <Chat key={chat.id} id={chat.id} users={chat.data().users} />
    )
      })}
      

    </Container>

  )
}

export default Sidebar

const Container = styled.div`
border-right:  1px solid whitesmoke;
flex: 0.45;
height: 100vh;
min-width: 300px;
max-width: 350px;
overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-styled: none;
  scrollbar-width:none;
`

const Header = styled.div`
height: 80px;
display: flex;
align-items: center;
justify-content: space-between;
position: sticky;
top: 0;
background-color: white;
z-index: 1;
padding: 0.8rem;
border-bottom: 1px solid whitesmoke;
`

const UserAvatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  cursor: pointer;
`

const IconsContainer = styled.div`
   display: grid;
   grid-template-columns: 2;
   grid-column-gap: 1rem;
`

const ChatIcon = styled(MdMessage)`
  width: 1.5rem;
  height: 1.5rem;
  grid-column: 1;
  cursor: pointer;
`

const MoreIcon = styled(FiMoreHorizontal)`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  grid-column: 2;
`

const SearchIcon = styled(FiSearch)``

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`

const Input = styled.input`
  margin-left: 20px;
  border: none;
  outline: none;
`

const SideBarButton = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
  width: 100%;
  padding: 0.5rem;
  &:hover {
    background-color: whitesmoke;
  }
  border-top: 1px solid whitesmoke;
  border-bottom: 1px solid whitesmoke;
`



const UserImage = styled.img``