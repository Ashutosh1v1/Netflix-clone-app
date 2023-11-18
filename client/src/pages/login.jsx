import React, { useState } from 'react'
import styled from 'styled-components'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

//manual imported
import { firebaseauth } from '../utils/firebase-config'
import Header from '../components/header'
import BackgroundImg from '../components/backgroundimage'

const Loginpage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  //AUTHENTICATION
  const handleLogIn = async () => {
    try {
      await signInWithEmailAndPassword(firebaseauth, email, password)
    }
    catch (err) {
      console.log(err);
    }
  }

  //REDIRECTING TO HOME
  onAuthStateChanged(firebaseauth, (CurrentUser) => {
    if (CurrentUser) navigate('/')
  })






  return (
    <>
      <Wrapper>
        <BackgroundImg />
        <div className="logincontent">
          <Header />
          <div className="form-wrapper">

            <div className="form">
              <div className="title">
                <h1>LOGIN</h1>
              </div>
              <div className="container">
                <input type="text" placeholder=' Enter your Email:' onChange={(e) => setEmail(e.target.value)} value={email} />
                <input type="password" placeholder='Password:' onChange={(e) => setPassword(e.target.value)} value={password} />
                <button onClick={handleLogIn}>Login</button>
              </div>
            </div>
          </div>
        </div>

      </Wrapper>

    </>
  )
}

const Wrapper = styled.div`
position: relative;
.logincontent{
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.6);
  height: 100vh;
  width: 100vw;
  grid-template-columns: 15vh 85vh;

  .form-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    height: 85vh;
  }
  .form{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    background-color: rgba(0,0,0,0.83);
     height: 65vh;
    padding: 2rem;
    color: white;
    border-radius: 0.4rem;

    .title h1:hover{
      color: grey;
      transition: all ease 0.2s;

    }

    .container{
      display: flex;
      flex-direction: column;
      gap: 2rem;

      input{
        border-radius: 0.4rem;
        padding: 0.5rem 1rem;
        width: 25rem;
        height: 2.3rem;
        outline: none;
        border: none;
        font-size: 0.9rem;

      }
   
      button{
        border-radius: 0.4rem;
        padding: 0.5rem ;
        height: 2.3rem;
        outline: none;
        border: none;
        background-color: red;
        cursor: pointer;
        color: white;
        font-weight: bolder;
        font-size: 1.05rem;
      }
    }
  }

  
}

`

export default Loginpage
