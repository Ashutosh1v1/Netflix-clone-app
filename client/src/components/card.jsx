import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { useDispatch } from 'react-redux';

//Manual import-------------
import { firebaseauth } from '../utils/firebase-config'
import { onAuthStateChanged } from 'firebase/auth'
import axios from 'axios'
import { removeFromLikedMovies } from '../store';

export default React.memo(function Card({ moviedata, isLiked = false }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [onHovered, setonHovered] = useState(false)
    const [email, setEmail] = useState(undefined)


    onAuthStateChanged(firebaseauth, (CurrentUser) => {
        if (CurrentUser) setEmail(CurrentUser.email)
        else navigate("/login")
    })

    //Setting up the rest API connecting part----------------------
    const AddtoList = async () => {
        try {
            await axios.post("http://localhost/api/user/add", { email, data: moviedata })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <CardContainer
            onMouseEnter={() => setonHovered(true)}
            onMouseLeave={() => setonHovered(false)}
        >
            <img src={`https://image.tmdb.org/t/p/w500${moviedata.image}`}
                alt="No internet connection"
                onClick={() => navigate('/player')}
            />
            {
                onHovered && (
                    <div className="hover">
                        <div className="image-video-wrapper">
                            < img src={`https://image.tmdb.org/t/p/w500${moviedata.image}`}
                                alt="No internet connection"
                                onClick={() => navigate('/player')}
                            />
                            <video src="https://res.cloudinary.com/ehizeex-shop/video/upload/v1668377666/NetflixApp/Action_mlw9wx.mp4"
                                autoPlay loop controls muted
                                onClick={() => navigate('/player')}
                            />
                        </div>
                        <div className="info-container">
                            <h3 className="moviename"
                                onClick={() => navigate('/player')}>
                                {moviedata.name}</h3>
                            <div className="icons">
                                <div className="controls">
                                    <IoPlayCircleSharp
                                        title='play'
                                        onClick={() => navigate('/player')}
                                    />
                                    <RiThumbUpFill title='like' />
                                    <RiThumbDownFill title='dislike' />
                                    {
                                        isLiked ?
                                            <BsCheck title='Remove from List'
                                                onClick={() => dispatch(removeFromLikedMovies({ movieId: moviedata.id, email }))}
                                            /> :
                                            <AiOutlinePlus title='Add to My List' onClick={AddtoList} />
                                    }


                                </div>
                                <div className="info">
                                    <BiChevronDown title='More Info' />
                                </div>
                            </div>
                            <div className="genres">
                                <ul>
                                    {moviedata.genres.map((genre) => {
                                        return <li>{genre}</li>

                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>


                )
            }

        </CardContainer>
    )
})
const CardContainer = styled.div`
margin-top: 1rem;
max-width: 230px;
width: 230px;
height: 100%;
cursor: pointer;
position: relative;


img{
    border-radius: .2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
}
.hover{
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: .3rem;
    border: .1rem solid grey;
    background-color: #181818;
    box-shadow: rgba(0,0,0,0.75) 0px 3px 10px;
    transition: 0ms.3s ease-out;

    .image-video-wrapper{
        position: relative;
        height: 140px;

        img{
            width: 100%;
            height: 140px;
            object-fit: cover;
            border-radius: .3rem;
            top: 0;
            z-index: 4;
            position: absolute;
        }
        video{
            width: 100%;
            height: 140px;
            object-fit: cover;
            border-radius: .3rem;
            top: 0;
            z-index: 4;
            position: absolute; 
        }
    }
    .info-container{
        display: flex;
        flex-direction: column;
        padding: 1rem;
        gap: .5rem;

        .moviename{
            color: white;
        }
    }

    .icons{
        display: flex;
        justify-content: space-between;

        .controls{
            display: flex;
            gap: .5rem;
        }

   
     svg{
        color: #ffffff;
        border: .1rem solid white;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover{
            color: #b8b8b8;
        }
     }
   }

   .genres{
    display: flex;
    color: white;

    ul{
        display: flex;
        gap: 1rem;

        li{
            padding-right: 0.7rem;
            list-style-type: none;
            
        }
    }
   }

}

`


