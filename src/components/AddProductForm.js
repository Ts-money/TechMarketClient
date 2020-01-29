import React from 'react';
import {Button, Form} from 'semantic-ui-react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';

import {useForm} from '../util/FormHook';
import {FETCH_PRODUCTS_QUERY} from '../util/ProductsQuery';

// Product Form - Is the card on the home page which lets you add your own products in
function AddProductForm() {

    // Initial values
    const {formValues, onChange, onSubmit} = useForm(createProductCallback, {
        name: '',
        price: '',
        imageURL: ''
    });

    // Create Produdct method
    const [createProduct, {error}] = useMutation(CREATE_PRODUCT_MUTATION, {
        variables: formValues,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_PRODUCTS_QUERY
            });
            data.getProducts = [result.data.createProduct, ...data.getProducts];
            proxy.writeQuery({query: FETCH_PRODUCTS_QUERY, data});
            formValues.name = '';
            formValues.price = '';
            formValues.imageURL = '';
        }
    });

    function createProductCallback() {
        createProduct();
    }

    // Renders card
    return (
        <>
            <Form onSubmit={onSubmit}>
                <h2>Add Your Product:</h2>
                <Form.Field>
                    <Form.Input
                        placeholder="Name of Product"
                        name="name"
                        onChange={onChange}
                        values={formValues.name}
                        error={error}
                    />
                    <Form.Input
                        placeholder="Price of Product"
                        name="price"
                        onChange={onChange}
                        values={formValues.price}
                        error={error}
                    />
                    <Form.Input
                        placeholder="Image of Product (URL)"
                        name="imageURL"
                        onChange={onChange}
                        values={formValues.imageURL}
                        error={error}
                    />
                    <Button type="submit" color="green">
                        Add Product
                    </Button>
                </Form.Field>
            </Form>
            {error && (
                <div className="ui error message" style={{marginBottom: 20}}>
                    <ul className="list">
                        <li>{error.message}</li>
                    </ul>
                </div>
            )}
        </>
    );

}

// GraphQL Query to create product
const CREATE_PRODUCT_MUTATION = gql`
  mutation createProduct($name: String!, $price: String!, $imageURL: String!) {
      createProduct(name: $name, price: $price, imageURL: $imageURL) {
          id
          name
          price
          imageURL
          createdAt
          username
      }
  }
`;

export default AddProductForm;