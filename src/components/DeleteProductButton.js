import React, {useState} from 'react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import {Button, Confirm, Icon} from 'semantic-ui-react';

import {FETCH_PRODUCTS_QUERY} from '../util/ProductsQuery';
import CustomPopup from '../util/CustomPopup';

// Delete Button available for users who want to delete their product.
function DeleteProductButton({productId, callback}) {

    // Variables to open confirm popup.
    const [confirmOpen, setConfirmOpen] = useState(false);

    // Method to re-render the home page to display all products excluding the one deleted.
    const [deleteProductOrMutation] = useMutation(DELETE_PRODUCT_MUTATION, {
        update(proxy) {
            setConfirmOpen(false);
            const data = proxy.readQuery({
                query: FETCH_PRODUCTS_QUERY
            });
            data.getProducts = data.getProducts.filter((p) => p.id !== productId);
            proxy.writeQuery({query: FETCH_PRODUCTS_QUERY, data});
            if (callback) callback();
        },
        variables: {
            productId
        }
    });

    // Renders Delete Button
    return (
        <>
            <CustomPopup content={'Delete Product'}>
                <Button
                    as="div"
                    color="red"
                    floated="right"
                    onClick={() => setConfirmOpen(true)}
                >
                    <Icon name="trash" style={{margin: 0}}/>
                </Button>
            </CustomPopup>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deleteProductOrMutation}
            />
        </>
    );

}

// GraphQL Query to delete a product using its productId.
const DELETE_PRODUCT_MUTATION = gql`
    mutation deleteProduct($productId: ID!) {
        deleteProduct(productId: $productId)
    }
`;

export default DeleteProductButton;