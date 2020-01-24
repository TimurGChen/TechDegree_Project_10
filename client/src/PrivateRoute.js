import React from 'react';
import { Consumer } from './Context';
import { Route, Redirect } from 'react-router-dom';

export default ({ component: Component, ...rest }) => (
      <Consumer>
        {context => (
            <Route
                {...rest}
                render={props => context.authenticatedUser ? 
                    <Component {...props} />
                    :
                    <Redirect to={{
                        pathname: '/signin',
                        state: { from: props.location }
                    }} />
                }
            />
        )}
      </Consumer>
);