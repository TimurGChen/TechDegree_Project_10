import React from 'react';
import { Link } from 'react-router-dom';

export default ({context}) => {
    const authUser = context.authenticatedUser;

    return (
    <div className="header">
        <div className="bounds">
            <Link to="/">
                <h1 className="header--logo">Courses</h1>
            </Link>
            {authUser ? (
                <nav><span>Welcome {`${authUser.firstName} ${authUser.lastName}`}!</span><Link className="signout" to="/signout">Sign Out</Link></nav>
            ) : (
                <nav><Link className="signup" to="/signup">Sign Up</Link><Link className="signin" to="/signin">Sign In</Link></nav>
            )}
        </div>
    </div>
    );
};
