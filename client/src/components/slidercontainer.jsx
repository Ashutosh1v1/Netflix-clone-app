import React from 'react'
import styled from 'styled-components'

//manual imports
import Movieslider from './movieslider'

const SliderContainer = ({movies}) => {

    const getMoviesBetween = (start,end)=>{
        return movies.slice(start, end)

    }
  return (
    <SliderWrapper>
      <Movieslider data={getMoviesBetween(0,10)} title="Only on Netflix"/>
      <Movieslider data={getMoviesBetween(10,20)} title="Trending Now"/>
      <Movieslider data={getMoviesBetween(20,30)} title="Popular on Netflix"/>
      <Movieslider data={getMoviesBetween(30,40)} title="romantic Movies"/>
      <Movieslider data={getMoviesBetween(40,50)} title="Adventure"/>
      <Movieslider data={getMoviesBetween(50,60)} title="Epic"/>
      <Movieslider data={getMoviesBetween(60,70)} title="New Release"/>
      <Movieslider data={getMoviesBetween(70,80)} title="Action Movies"/>
    </SliderWrapper>
  )
}
const SliderWrapper =styled.div`

`

export default SliderContainer
