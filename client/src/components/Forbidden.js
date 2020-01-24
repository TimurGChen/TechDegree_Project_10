import React from 'react';
import ReturnBar from './ReturnBar';

export default () => {
    return (
        <div className="bounds">
            <ReturnBar /> 
            <h1>Forbidden</h1>
            <p>Oh oh! You can't access this page.</p>
            <img src={require("../images/egypt.jpg")} className="errorMeme" alt="women yelling at cat meme (original)" />
        </div>
    ); 
}