import React from 'react';
import {Link} from 'react-router-dom';

export default () => (
    <div className="actions--bar">
        <div className="bounds">
            <div className="grid-100">
                <Link className="button button-secondary" to="/">Return to List</Link>
            </div>
        </div>
    </div>
);
