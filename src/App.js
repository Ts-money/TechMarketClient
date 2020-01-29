import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Container} from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import "./App.css";

import {AuthenticationHandler} from './util/Authentication';
import AuthenticationRoute from './util/AuthenticationRoute';

import MenuBar from './components/MenuBar';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';

function App() {
    // Renders routes for HTML
    return (
        <AuthenticationHandler>
            <Router>
                <Container>
                    <MenuBar/>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/cart" component={CartPage}/>
                    <AuthenticationRoute exact path="/login" component={LoginPage}/>
                    <AuthenticationRoute exact path="/register" component={RegistrationPage}/>
                </Container>
            </Router>
        </AuthenticationHandler>
    );
}

export default App;
