import React from 'react'
import AboutEach from './AboutEach'

const About = () => {
  
    const contentStyle = {
        height: '500px',
        color: '#fff',
        textAlign: 'center',
        background: '#181818',
      };

      const paragraphStyle = {
        position: 'relative',
        width: '100%',
        top: '50%',
        left: '50%',
        margin: '0px 0px 0px 0px',
        transform: 'translate(-50%, -50%)',
      }
    return (
      <>
        <div style = {contentStyle}>
              <h1 style = {paragraphStyle}> Meet the Team </h1>
        </div>
        <AboutEach />
      </>
    )
}

export default About
