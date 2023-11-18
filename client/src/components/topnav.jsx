import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import {  onAuthStateChanged,signOut  } from 'firebase/auth'

//Manual Import-----
import { firebaseauth } from '../utils/firebase-config'

const Topnav = ({ isscrolled }) => {

    const navLinks = [
        { name: "Home", link: "/" },
        { name: "Tv show", link: "/Tv" },
        { name: "Movies", link: "/movies" },
        { name: "My list", link: "/mylist" },
    ]


    const navigate = useNavigate()
//Redirect to home-----
    onAuthStateChanged(firebaseauth, (CurrentUser) => {
        if (!CurrentUser) navigate('/login')
      })
    return (
        <>
            <Navcontainer>
                <nav className={`${isscrolled ? "scrolled" : "notscrolled"}`} >
                    <div className="left-side">
                        <div className="logo">
                            <img src="https://res.cloudinary.com/ehizeex-shop/image/upload/v1668265433/NetflixApp/2560px-Netflix_2015_logo.svg_rbicwl_knwp6f.png"
                                alt="no internet connection" />
                        </div>
                        <ul className='links'>
                            {
                                navLinks.map(({ name, link }) => {
                                    return (
                                        <li key={name}>
                                            <Link to={link}>{name}</Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>

                    </div>
                    <div className="right-side">
                        <button className="right-side"
                        onClick={()=>signOut(firebaseauth)}
                        >
                            <AiOutlineLogout />

                        </button>

                    </div>
                </nav>



            </Navcontainer>

        </>
    )
}
const Navcontainer = styled.div`
.notscrolled{
    display: flex;
}
.scrolled{
    display: flex;
    background-color: black;
}
nav{
    position: sticky;
    top: 0;
    height: 4rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    z-index: 2;
    padding: 0.4rem;
    align-items: center;
    transition: 0.3s ease-in-out;

    .left-side{
        display: flex;
        align-items: center;
        gap: 2rem;
        margin-left: 5rem;
   
   
    .logo{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    img{
        width: 10rem;
        height: 2rem;
        cursor: pointer;
        
      
    }


.links{
    display: flex;
    gap: 3rem;
    li{
        list-style-type: none;
        a{
            color: white;
            text-decoration: none;
        }
    }
}
}
}

.right-side{
    display:flex ;
    gap:1rem;
    margin-right: 0.3rem;
    button{
        background-color: red;
        border: none;
        cursor: pointer;   
        border-radius: 50%;

    }&:focus{
        outline: none
    }svg{
        color: #ffffff;
        font-size: 2rem
    }
}



`

export default Topnav
