import React from 'react';
import ReturnBar from './ReturnBar';

export default ({context}) => {
    return (
        <div className="bounds">
            <ReturnBar />
            <h1>Error</h1>
            <p>Sorry! We just encountered an unexpected error.</p>
            <img src={require("../images/china.jpg")} className="errorMeme" alt="women yelling at cat meme (original)" />
        </div>
    ); 
}