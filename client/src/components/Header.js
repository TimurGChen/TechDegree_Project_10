import React from 'react';

export default () => (
    <div class="header">
        <div class="bounds">
            <h1 class="header--logo">Courses</h1>
            <nav><span>Welcome Joe Smith!</span><a class="signout" href="index.html">Sign Out</a></nav>
            {/** or */}
            <nav><a class="signup" href="sign-up.html">Sign Up</a><a class="signin" href="sign-in.html">Sign In</a></nav>
        </div>
    </div>
);
