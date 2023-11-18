import React, { useState, useRef } from 'react'
import Card from './card'
import styled from 'styled-components'
import { AiOutlineRight, AiOutlineLeft, } from 'react-icons/ai'

export default React.memo(function Movieslider({ data, title }) {

    const listRef = useRef()
    const [controlvisibility, setControlvisibility] = useState(false)
    const [sliderPosition, setSliderPosition] = useState(0)

    const handleDirection = (direction) => {
        let distance = listRef.current?.getBoundingClientRect().x  -70;
        if (direction === "left" && sliderPosition > 0 ) {
            listRef.current.style.transform = `translateX(${230 + distance}px)`
            setSliderPosition(sliderPosition - 1)
        }
        if (direction === "right" && sliderPosition < 4) {
            listRef.current.style.transform = `translateX(${-230 + distance}px)`
            setSliderPosition(sliderPosition + 1)
        }
    }

    return (
        <Container
            controlvisibilty={controlvisibility}
            onMouseEnter={() => setControlvisibility(true)}
            onMouseLeave={() => setControlvisibility(false)}
        >
            <h1>{title}</h1>
            <div className="wrapper">
                <div className={`slider-action left ${!controlvisibility ? "none" : ""}`}>
                    <AiOutlineLeft onClick={()=>handleDirection("left")} />
                </div>

                <div className="slider" ref={listRef}>
                    {
                        data.map((movie, index) => {
                            return <Card
                                moviedata={movie}
                                index={index}
                                key={movie.id}

                            />
                        })
                    }
                </div>
                <div className={`slider-action right ${!controlvisibility ? "none" : ""}`}>
                    <AiOutlineRight onClick={()=>handleDirection("right")}/>
                </div>
            </div>

        </Container>
    )
})
const Container = styled.div`
position: relative;
padding: .7rem 0;
gap: .7rem;

h1{
    margin-left: 5px;
    font-size: 25px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: white;
    font-weight: normal;

}
.wrapper{
    .slider{
        display: flex;
        width: max-content;
        gap: .5rem;
        transform: translateX(0px);
        transition: .3s ease-in-out;
        margin-left: 5px;
        
    }
    .slider-action{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        z-index: 99;
        height: 100%;
        top: 2rem;
        bottom: 0;
        width: 50px;
        transition: 1s ease-in-out;
        svg{
            font-size: 2rem;
            cursor: pointer;
            color: white;
        }
    }
    .left{
        left: 0;
    }
    .right{
        right: 0;
    }
    .none{
        display: none;
    }
}


`




