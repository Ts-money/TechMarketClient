import React, {useContext, useState} from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

import {AuthenticationContext} from '../util/Authentication';

// Nav Bar with options to login and logout - Shows current user logged in, if any.
function MenuBar() {
    const {user, logout} = useContext(AuthenticationContext);
    const pathname = window.location.pathname;

    const path = pathname === '/' ? 'home' : pathname.substr(1);
    const [activeItem, setActiveItem] = useState(path);

    const handleItemClick = (e, {name}) => setActiveItem(name);

    // Renders the menu bar and saves it a variable
    const menuBar = user ? (
        <Menu pointing secondary size="massive" color="teal">
            <Menu.Item name={user.username} active as={Link} to="/"/>

            <Menu.Menu position="right">
                <Menu.Item
                    name={user.cartItems !== undefined ? user.cartItems !== null ? user.cartItems.length < 1 ? "Cart (Empty)" : user.cartItems.length > 1 ? "Cart (" + user.cartItems.length + " Items)" : "Cart (" + user.cartItems.length + " Item)" : "Cart" : "Cart"}
                    onClick={handleItemClick}
                    as={Link}
                    to="/cart"
                />
                <Menu.Item name="logout" onClick={logout}/>
            </Menu.Menu>
        </Menu>
    ) : (
        <Menu pointing secondary size="massive" color="teal">
            <Menu.Item
                name="home"
                active={activeItem === 'home'}
                onClick={handleItemClick}
                as={Link}
                to="/"
            />

            <Menu.Menu position="right">
                <Menu.Item
                    name="login"
                    active={activeItem === 'login'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/login"
                />
                <Menu.Item
                    name="register"
                    active={activeItem === 'register'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/register"
                />
            </Menu.Menu>
        </Menu>
    );

    return menuBar;
}

export default MenuBar;
