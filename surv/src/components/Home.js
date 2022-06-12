import React from 'react'



const Home = () => {
    const contentStyle = {
        height: '750px',
        color: '#fff',
        background: '#DAF',
        position: 'relative',

    };

    const boxStyle = {
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };


    
    function Item(props)
    {
        return (
            <div style = {contentStyle}>
                <h1> {props.item.name} </h1>
            </div>
        )
    }
      
    var items = [
        {
            name: "Welcome to Surv",
        },
        {
            name: "A minimalist way of creating surveys.",
        },
        {
            name: "Offering ease of access to secure, reliable, and unique responses.",
        },
        {
            name: "Made using ZK-technology",
        }
    ]

    return (
        <div style = {contentStyle}>
            <div style = {boxStyle}>
            <h1 style = {{textAlign: 'center'}}>Welcome to Surv</h1>
            <h3 style = {{textAlign: 'center'}}> A minimalist way of creating surveys made using ZK-technology </h3>
            </div>
        </div>
    )
}

export default Home


