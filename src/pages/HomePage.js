import React, {useContext} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {Grid, Transition} from 'semantic-ui-react';

import {AuthenticationContext} from '../util/Authentication';
import ProductCard from '../components/ProductCard';
import AddProductForm from '../components/AddProductForm';
import {FETCH_PRODUCTS_QUERY} from '../util/ProductsQuery';

// HomePage page which displays all products
function HomePage() {
    // Gets a user if they are logged in.
    const {user} = useContext(AuthenticationContext);
    // Gets all products using GraphQL Query.
    const {
        loading,
        data: {getProducts: products}
    } = useQuery(FETCH_PRODUCTS_QUERY);

    // Renderse HomePage Page with all products
    return (
        <div>
            <h1>TechMarket</h1>
            <Grid columns={3}>
                <Grid.Row className="page-title">
                    <h1>Showing Products</h1>
                </Grid.Row>
                <Grid.Row>
                    {user && (
                        <Grid.Column>
                            <AddProductForm/>
                        </Grid.Column>
                    )}
                    {loading ? (
                        <h1>Loading Products...</h1>
                    ) : (
                        <Transition.Group>
                            {products &&
                            products.map((product) => (
                                <Grid.Column key={product.id} style={{marginBottom: 20}}>
                                    <ProductCard product={product}/>
                                </Grid.Column>
                            ))}
                        </Transition.Group>
                    )}
                </Grid.Row>
            </Grid>
        </div>
    );

}

export default HomePage;