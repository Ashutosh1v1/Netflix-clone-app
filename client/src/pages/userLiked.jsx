import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


//Manual import ----------
import { getUserLikedMovies } from '../store';
import styled from 'styled-components';
import Topnav from '../components/topnav';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseauth } from '../utils/firebase-config';
import Card from '../components/card';

export default function Userliked() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isScrolled, setIsscrolled] = useState(false);
    const [email, setEmail] = useState(undefined)
    const movies = useSelector((state) => state.netflix.movies)



    onAuthStateChanged(firebaseauth, (CurrentUser) => {
        if (CurrentUser) setEmail(CurrentUser.email)
        else navigate("/login")
    })

    useEffect(() => {
        if (email) {
            dispatch(getUserLikedMovies(email))
        }
    })


    window.onscroll = () => {
        setIsscrolled(window.scrollY === 0 ? false : true);
        return () => (window.onscroll = null);
    };
    return (
        <Container>
            <Topnav isscrolled={isScrolled} />
            <div className="content flex column">
                <h1>My List</h1>
                <div className="grid flex">
                    {movies.map((movie, index) => {
                        return <Card
                            moviedata={movie}
                            index={index}
                            key={movie.id}
                            isLiked={true} />
                    })}
                </div>
            </div>
        </Container>
    )
}
const Container = styled.div`
.content{
    margin: 2.3 rem;
    margin-top: 5rem;
    gap: 2rem;

    h1{
        margin-left: 3rem;
        color: white;
        font-weight: normal;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    .grid{
        margin-left: 3rem;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }
}

`


