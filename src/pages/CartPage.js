import React, {useContext} from 'react';

import gql from 'graphql-tag';
import {AuthenticationContext} from '../util/Authentication';
import {Image, List} from 'semantic-ui-react';
import {useQuery} from '@apollo/react-hooks';
import DeleteButtonCart from '../components/DeleteButtonCart';

function CartPage() {
    const {user} = useContext(AuthenticationContext);

    let render;

    const state = {cartItems: []};

    if (user !== null && user.cartItems !== undefined && user.cartItems !== null) {
        state.cartItems = [...user.cartItems];
    }
    render = (
        <>
            <h1>Cart</h1>
            {user ? (
                <>
                    <br/>
                    <List>
                        {console.log(user)}
                        {state.cartItems ? (state.cartItems.map((productId) => {
                            console.log(productId + ' ' + state.cartItems);
                            if (state.cartItems.includes(productId) && productId !== undefined && productId !== null) {
                                console.log(productId);
                                try {
                                    const {
                                        data: {getProduct},
                                    } = useQuery(GET_PRODUCT_QUERY, {
                                        variables: {
                                            productId
                                        }
                                    });
                                    if (getProduct !== undefined && getProduct) {
                                        return <List.Item key={indexIncrement}>
                                            <Image size="small" src={getProduct.imageURL}/>
                                            <br/>
                                            <DeleteButtonCart user={user} productId={productId} state={state}/>
                                            <br/>
                                            <List.Content>
                                                <List.Header as='a'>{getProduct.name}</List.Header>
                                                <List.Description>
                                                    Purchase {getProduct.name} today for ${getProduct.price}!
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                    }
                                } catch (err) {
                                    console.log(err);
                                }
                            }
                        })) : (
                            <>
                                <br/>
                                <h2>Your cart is empty!</h2>
                            </>
                        )}
                        <br/>
                    </List>
                </>
            ) : (
                <>
                    <br/>
                    <h2>You must be logged in to view your cart!</h2>
                </>
            )}
        </>
    );
    return render;
}

let indexKey = 0;

let indexIncrement = function () {
    indexKey++;
    return indexKey - 1;
};

const GET_PRODUCT_QUERY = gql`
  query($productId: ID!) {
      getProduct(productId: $productId) {
          id
          name
          price
          imageURL
          username
          createdAt
      }
  }
`;

export default CartPage;