import React from 'react';
import ReturnBar from './ReturnBar';

export default () => {
    return (
        <div className="bounds">
            <ReturnBar />
            <h1>Not Found</h1>
            <p>Sorry! We couldn't find the page you're looking for.</p>
            <img src={require("../images/original.jpg")} className="errorMeme" alt="women yelling at cat meme (original)" />
        </div>
    );
}