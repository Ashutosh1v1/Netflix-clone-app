import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'

//Manual Import-----------
import Topnav from "../components/topnav";
import { fetchMovies, getGenres } from "../store";
import SliderContainer from "../components/slidercontainer";



const Netflix = () => {
  const [isScrolled, setIsscrolled] = useState(false);

  const navigate= useNavigate()

  const dispatch= useDispatch()
  
  const movies = useSelector((state)=>state.netflix.movies)
  const genresloaded = useSelector((state)=>state.netflix.genresloaded)

  useEffect(()=>{
    dispatch(getGenres())
  }, []) 
  useEffect(()=>{
    if(genresloaded){
      dispatch(fetchMovies({type: "all" }))
    }
  },[])

  window.onscroll = () => {
    setIsscrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  // console.log(movies);

  return (
    <HeroContainer>
      <div className="hero">
        <Topnav isscrolled={isScrolled} />
        <img
        className="BGimg"
          src="https://res.cloudinary.com/ehizeex-shop/image/upload/v1668267540/NetflixApp/avengers-age-of-ultron-team-together-poster-wallpaper-1600x600-92751_84_qvwbif.jpg"
          alt="no internet connection"
        />
        <div className="container">
          <div className="title">
            <h1>Super Man</h1>
            <p>
              Superman, also known as Clark Kent, is a beloved DC Comics
              superhero. He possesses incredible superhuman abilities, including
              super strength, flight, and heat vision. He uses his powers to
              protect the world from various threats while maintaining a secret
              identity as a mild-mannered reporter.
            </p>
          </div>
          <div className="buttons">
            <button className="playBTN" onClick={()=>navigate('/player')} >Play</button>
            <button className="moreBTN">More</button>
          </div>
        </div>
      </div>
      <SliderContainer movies={movies}/>
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  .hero {
    position: relative;
    .BGimg{
      filter: brightness(35%);

    }
    img {
      height: 70vh;
      width: 100%;
    }
    .container {
      position: absolute;
      bottom: .1rem;

      .title {
        h1 {
          margin-left: 5rem;
          margin-top: 15rem;
          text-transform: uppercase;
          font-size: 53px;
          background: -webkit-linear-gradient(#eee, rgb(128, 13, 13));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        p {
          margin-bottom: -50px;
          width: 640px;
          margin-left: 5rem;
          font-family: "lexend Deca", sans-serif;
          color: white;
        }
      }
      .buttons {
        display: flex;
        margin: 5rem;
        gap: 2rem;
      }

      .playBTN {
        display: flex;
        align-items: center;
        justify-content: center;
        color: red;
        border-radius: 1rem;
        font-size: 1.2rem ;
        gap: 1rem;
        padding: 0.6rem;
        padding-left: 2rem;
        padding-right: 2rem;
        border: none;
        cursor: pointer;

      }
      .moreBTN {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #f1f1f1;
        background-color: black;
        border-radius: 1rem;
        font-size: 1.2rem ;
        gap: 1rem;
        padding: 0.6rem;
        padding-left: 2rem;
        padding-right: 2rem;
        border: 1px solid white;
        cursor: pointer;
      }
    }
  }
`;

export default Netflix;
