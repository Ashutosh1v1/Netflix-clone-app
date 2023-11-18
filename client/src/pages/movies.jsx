import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';


//Manual import ----------
import { fetchMovies, getGenres } from '../store';
import styled from 'styled-components';
import Topnav from '../components/topnav';
import Notavailable from '../components/notavailable'
import SliderContainer from '../components/slidercontainer';
import Selectgenre from '../components/selectgenre';

const Moviepage = () => {
  const [isScrolled, setIsscrolled] = useState(false);

  const dispatch = useDispatch()

  const movies = useSelector((state) => state.netflix.movies)
  const genres = useSelector((state) => state.netflix.genres)
  const genresloaded = useSelector((state) => state.netflix.genresloaded)

  useEffect(() => {
    dispatch(getGenres())
  },[])
  useEffect(() => {
   if (genresloaded) 
      dispatch(fetchMovies({ type: "movies" })) 
  }, [])

  window.onscroll = () => {
    setIsscrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <div className="navbar">
        <Topnav isScrolled={isScrolled} />
      </div>

      <div className="data">
      <Selectgenre genres={genres} type="movie" />
        {
          movies.length ? <SliderContainer movies={movies}/> :
            <Notavailable />
        }
      </div>

    </Container>
  )
}
const Container = styled.div`
.data{
  margin-top: 5rem;

  .not-available{
    text-align: center;
    color: white;
    margin-top: 4rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
}


`


export default Moviepage
