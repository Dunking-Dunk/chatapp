import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import {auth, provider } from '../firebase'

const login = () => {
    
    const Login = () => {
        auth.signInWithPopup(provider).catch(alert).then(() => {
            console.log('logged in')
        })
    }

  return (
      <Container>
          <Head>
              <title>Login</title>
          </Head>
          <LoginImage src='https://images.unsplash.com/photo-1655138630341-c9fa2011f8ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80' />
          <LoginContainer>
              <Button onClick={Login}>Sign with google</Button>
          </LoginContainer>


    </Container>
  )
}

export default login

const Container = styled.div`
`

const LoginContainer = styled.div`
width: 100%;
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
z-index: 1;
`

const LoginImage = styled.img`
width: 100vh;
height: 100vh;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: -1;
`
const Button = styled.button`
    width: 15rem;
    height: 3rem;
    border-radius: 1rem;
    outline: none;
    border: none;
    font-size: 1.3rem;
    transition: 0.35s ease;
    cursor: pointer;
    &:hover {
        background-color: black;
        color: white;
    }
`