import React, {createContext, useReducer} from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
    user: null
};

// Checks if token is stored in User's local storage
if (localStorage.getItem('jwtToken')) {
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));

    // Checks if the token has expired (1 hour limit), if so removes the token
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('jwtToken');
    } else {
        // Puts the current user as the token
        initialState.user = decodedToken;
    }
}

const AuthenticationContext = createContext({
    user: null,
    login: (userData) => {
    },
    logout: () => {
    }
});

// Switch statement for appropriate login or logout action.
function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
}

function AuthenticationHandler(props) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // LoginPage method which saves the user token in the user's local storage
    function login(userData) {
        console.log(userData)
        localStorage.setItem('jwtToken', userData.token);
        dispatch({
            type: 'LOGIN',
            payload: userData
        });
    }

    // Logout method which removes the token from the user's local storage
    function logout() {
        localStorage.removeItem('jwtToken');
        dispatch({type: 'LOGOUT'});
    }

    return (
        <AuthenticationContext.Provider
            value={{user: state.user, login, logout}}
            {...props}
        />
    );
}

export {AuthenticationContext, AuthenticationHandler};
