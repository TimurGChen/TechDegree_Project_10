import React from 'react';
import ReturnBar from './ReturnBar';

export default () => {
    return (
        <React.Fragment>
            <ReturnBar />
            <div className="bounds">
                <h1>Not Found</h1>
                <p>Sorry! We couldn't find the page you're looking for.</p>
            </div>
        </React.Fragment>
    );
}