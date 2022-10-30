import React from "react";

const LoginLanding = () => {
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

    return(
        <>
            <div style = {contentStyle}>
                <h1 style = {paragraphStyle}> Successfully Logged In </h1>
            </div>
        </>
    )
}

export default LoginLanding