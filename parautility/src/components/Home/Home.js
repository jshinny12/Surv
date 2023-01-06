import React from 'react'
import {Carousel} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home2 from './Home2'

const Home = () => {
    const contentStyle = {
        height: '750px',
        color: '#fff',
        background: '#181818',
        position: 'relative',
        left: '0px',
        top: '30%',
        position: 'relative',
    };

    const boxStyle = {
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
    };
      

    return (
        <>
        <Carousel fade variant="dark">
        <Carousel.Item style = {contentStyle}>
            <Carousel.Caption style = {boxStyle}>
            <h1>Welcome to Tradim</h1>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style = {contentStyle}>
            <Carousel.Caption style = {boxStyle}>
            <h1>A Novel Approach in Trading Discounts</h1>
            </Carousel.Caption>
        </Carousel.Item>
        </Carousel>

        <Home2 />

    
        


        </>
    )
}

export default Home


