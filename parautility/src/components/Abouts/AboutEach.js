import React from 'react'
import {Row, Col, Image} from 'react-bootstrap'

const AboutEach = () => {
    const contentStyle2 = {
        height: '1000px',
        textAlign: 'center',
        background: 'white',
        top : '30%',
        position: 'relative',
        flex: '1',
      };

      const contentStyle3 = {
        top: '10%',
        height: '300px',
        color: '#181818',
        textAlign: 'center',
        transform: `translate(50px, 50px)` 
      };

      const paragraphStyle = {
        top: '10%',
        height: '300px',
        color: '#181818',
        textAlign: 'center',
        transform: `translate(0px, 75px)`,
        width: '90%',
      };

      const headerStyle = {
        top: '10%',
        height: '10px',
        color: 'blue',
        textAlign: 'center',
        width: '90%',
      };

      const imageStyle = {
        maxHeight : '250px',
        maxWidth : '250px',
        borderRadius: '50%',

      };

      var Aidan = "Aidan is a first-generation student at Temple University studying Finance with a concentration in Investment Analysis. He has previous experience interning at an Ultra high net worth family office and part time at a Middle Market Investment bank in M&A. Aidan and Vincent met in the Temple University Fox Fund, an investment fund for the school.";
      var Vincent = "Vincent is a first-generation student at Temple University studying Finance & Economics. He has previous experience interning at a SaaS Tech Startup and a Middle Market Investment bank in M&A. Aidan and Vincent met in the Temple University Fox Fund, an investment fund for the school.";
      var Joey = "Joey is a student at University of Pennsylvania studying Computer science with minors in Data Science, Mathematics, and Statistics.  He is a front-end developer at Penn Blockchain For PennDAO, and recently has begun a role at Harmony as a Smart Contract Developer."; 


    return (
        <div style = {contentStyle2}>
                <Row>
                    <Col xs={12} md={3}> 
                    <div style = {contentStyle3}> 
                    <Image 
                    style = {imageStyle}
                            src=
                    {require("../../assets/Aidan.jpeg")}
                            roundCircle
                        />
                    </div>
                    </Col>
                    <Col xs={6} md={9}> 
    <div style = {contentStyle3}> <h2 style = {headerStyle}>Aidan Lynn (CEO)</h2><h4 style = {paragraphStyle}>{Aidan}</h4> </div>
                     </Col>
                </Row>

                <Row>
                <Col xs={6} md={9}> 
    <div style = {contentStyle3}> <h2 style = {headerStyle}>Vincent Preis (CEO)</h2><h4 style = {paragraphStyle}>{Vincent}</h4> </div>
                     </Col>
                    <Col xs={12} md={3}> 
                    <div style = {contentStyle3}> 
                    <Image
                    style = {imageStyle}
                            src=
                    {require("../../assets/Vincent.jpeg")}
                            roundCircle
                        />
                    </div>
                    </Col>
                    
                </Row>

                <Row>
                    <Col xs={12} md={3}> 
                    <div style = {contentStyle3}> 
                    <Image
                    style = {imageStyle}
                            src=
                    {require("../../assets/joey.jpeg")}
                            roundCircle
                        />
                    </div>
                    </Col>
                    <Col xs={6} md={9}> 
    <div style = {contentStyle3}><h2 style = {headerStyle}>Joey Shin (CTO)</h2> <h4 style = {paragraphStyle}>{Joey}</h4> </div>
                     </Col>
                </Row>
        </div>
    )
}

export default AboutEach
