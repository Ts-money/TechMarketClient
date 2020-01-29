import React, {useState} from 'react';
import gql from 'graphql-tag';
import {Button, Confirm, Icon} from 'semantic-ui-react';
import {useMutation} from '@apollo/react-hooks';
import {FETCH_PRODUCTS_QUERY} from '../util/ProductsQuery';

import CustomPopup from '../util/CustomPopup';

const jwt = require('jsonwebtoken');

const {SECRET_KEY} = require('../config');

function generateToken(id, email, username, cartItems) {
    return jwt.sign(
        {
            id: id,
            email: email,
            username: username,
            cartItems: cartItems
        },
        SECRET_KEY,
        {expiresIn: '1h'}
    );
}

// Purchase button
function AddToCartButton({user, productId, callback}) {

    const [errors, setErrors] = useState({});

    const userId = user.id;

    // Variables used to open the confirm popup.
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [addToCartMutation] = useMutation(ADD_TO_CART_MUTATION, {
        update(proxy) {
            const data = proxy.readQuery({
                query: FETCH_PRODUCTS_QUERY
            });
            proxy.writeQuery({query: FETCH_PRODUCTS_QUERY, data});
            const token = generateToken(user.id, user.email, user.username, user.cartItems);
            localStorage.setItem('jwtToken', token);
            window.location.reload();
            if (callback) callback();
        },
        variables: {
            userId,
            productId
        }
    });

    function addToCart() {
        setConfirmOpen(false);
        if (user !== undefined && user !== null && user.cartItems !== undefined && user.cartItems !== null) {
            user.cartItems.push(productId);
            addToCartMutation();
        }
    }

    // Renders purchase button
    return (
        <>
            <CustomPopup content={'Add To Cart'}>
                <Button
                    as="div"
                    color="green"
                    floated="left"
                    onClick={() => setConfirmOpen(true)}
                >
                    <Icon name="cart" style={{margin: 0}}/>
                </Button>
            </CustomPopup>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={addToCart}
            />
            {console.log(errors)}
        </>
    )

}

const ADD_TO_CART_MUTATION = gql`
    mutation addToCart($userId: ID!, $productId: ID!) {
        addToCart(userId: $userId, productId: $productId)
    }
`;

export default AddToCartButton;