import React from 'react'
import { Avatar } from '@mui/material';

const About = () => {
  
    const contentStyle = {
        height: '750px',
        color: '#fff',
        textAlign: 'center',
        background: '#DAF',
      };

      const avatarStyle = {
        position: 'relative',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        alignItems : 'center',
      }

      const paragraphStyle = {
        position: 'relative',
        width: '100%',
        top: '30%',
        left: '50%',
        margin: '0px 0px 0px 0px',
        transform: 'translate(-50%, -50%)',
      }
    return (
        <div style = {contentStyle}>
            <Avatar
                alt="Joey Shin"
                src="../joey.jpeg"
                sx={{ width: 250, height: 250}} 
                style = {avatarStyle}
            />
            <div style = {paragraphStyle}> Joey was originally born in South Korea but grew up in Virginia. He is a CIS major at the University of Pennsylvania. His major interests consist of fishing, hiking, and golfing!
            </div>
        </div>
    )
}

export default About
