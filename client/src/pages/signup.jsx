import React, { useState } from 'react'
import styled from 'styled-components'
import { createUserWithEmailAndPassword, onAuthStateChanged, } from 'firebase/auth'

//manual imported
import Header from '../components/header'
import BackgroundImg from '../components/backgroundimage'
import { firebaseauth } from '../utils/firebase-config'
import { useNavigate } from 'react-router-dom'



const Signup = () => {
  const [showpassword, setshowpassword] = useState(false)
  const [formValues, setFormValues] = useState({ email: "", password: "" })

  const navigate= useNavigate()

   //AUTHENTICATION
  const handleSignIn = async () => {
    try {
      const { email, password } = formValues
      await createUserWithEmailAndPassword(firebaseauth, email, password)
    }
    catch (err) {
      console.log(err);
    }
  }
  
   //REDIRECTING TO HOME
  onAuthStateChanged(firebaseauth,(CurrentUser)=>{
    if(CurrentUser) navigate ('/')
  })
  return (
    <>
      <Container>
        <BackgroundImg />
        <div className="content">
          <Header login />
          <div className="body">
            <div className="text">
              <h1>Unlimited movies, TV shows and more</h1>
              <h4>watch anywhere , Cancel anytime</h4>
              <h6>Ready to watch? enter your email to create or restart membership</h6>
            </div>
            <div className="form">
              {
                showpassword ? (
                  <input type="password" placeholder='Password:' name="password" value={formValues.password} onChange={(e) => setFormValues({
                    ...formValues, [e.target.name]: e.target.value
                  })} />

                ) : (<input type="email" placeholder='Enter your email:' name="email" value={formValues.email} onChange={(e) => setFormValues({
                  ...formValues, [e.target.name]: e.target.value
                })} />)
              }
              {
                !showpassword ? (

                  <button onClick={() => setshowpassword(true)}>
                    Get Started</button>
                ) : (
                  <button onClick={handleSignIn}>
                    Sign UP</button>

                )
              }

            </div>
          </div>
        </div>



      </Container>




    </>
  )
}
const Container = styled.div`
position: relative;
.content{
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.79);
  height: 100vh;
  width: 100vw;
  grid-template-columns: 15vh 85vh;
  .body{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.9rem;
  }
  .text{
    display: flex;
    flex-direction: column;
   text-align: center;
    font-size: 2rem;
    color: white;
  }
  h1{
font-size: 3rem;
    padding: 0 20rem;
  }
 
 
}
.form{
  display: grid;
  width: 60%;
  input{
    color: black;
    padding: 1.5rem;
    font-size: 0.9rem;
    width: 45rem;
    height: 5%;
    outline: none;
    border-radius: 5px;

  }
  button{
    padding: 0.5rem 1rem;
    background-color: red;
    border: none;
    cursor: pointer;
    color: white;
    font-size: 1.05rem;
    width: 10rem;
    justify-self: center;
    border-radius: 5px;
  }
}
`

export default Signup
