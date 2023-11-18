import React from 'react'
import styled from 'styled-components'

// Manual import--------
import { fetchDatabyGenre } from '../store'
import { useDispatch } from 'react-redux'





const Selectgenre = ({ genres , type }) => {

    const dispatch= useDispatch()
    return (
        <Select className='flex' onChange={(e)=>{
            dispatch(fetchDatabyGenre({genre: e.target.value ,type} ))

        }}>
            {

                genres.map((genre) => {
                    return ( 
                        <option value={genre.id} key={genre.id}>
                            {genre.name}
                            </option>
                     )
                      
                        
                     
                    
                })

            }

        </Select>
    )
}
const Select = styled.select`
margin-left: 5rem;
margin-bottom: 1rem;
cursor: pointer;
font-size: 1rem;
background-color: rgba(0,0,0,0.4);
color: white;
border: 1px solid white;
border-radius: 5px;
outline: none;
`


export default Selectgenre
