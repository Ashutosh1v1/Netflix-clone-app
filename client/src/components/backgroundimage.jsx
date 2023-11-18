import React from 'react'
import styled from 'styled-components'
const BackgroundImg = () => {
    return (
        <>
            <Bgcontainer>
                <img src="https://res.cloudinary.com/ehizeex-shop/image/upload/v1668265236/NetflixApp/netflix-reuse-official_ntcjl2_wtrhhh.jpg"
                    alt="no internet connection" />
            </Bgcontainer>

        </>
    )
}

const Bgcontainer = styled.div`
height: 100vh;
width: 100vw;
img{
    height: 100vh;
    width: 100vw;
}

`

export default BackgroundImg
