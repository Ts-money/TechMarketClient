import React, {useContext} from 'react';
import {Redirect, Route} from 'react-router-dom';

import {AuthenticationContext} from './Authentication';

// Once user's token is validated the user will be routed to HomePage page.
function AuthenticationRoute({component: Component, ...rest}) {
    const {user} = useContext(AuthenticationContext);

    return (
        <Route
            {...rest}
            render={(props) =>
                user ? <Redirect to="/"/> : <Component {...props} />
            }
        />
    );

}

export default AuthenticationRoute;
