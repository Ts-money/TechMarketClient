import React, {useContext} from 'react';
import {Card, Image} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import moment from 'moment';

import {AuthenticationContext} from '../util/Authentication';
import DeleteProductButton from './DeleteProductButton';
import AddToCartButton from './AddToCartButton';

// Product card - is used for each product on the home page to be displayed (parameter is product)
function ProductCard({
                         product: {name, price, imageURL, createdAt, id, username}
                     }) {
    // Current user logged in, if any.
    const {user} = useContext(AuthenticationContext);

    // Renders product card.
    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated="right"
                    size="medium"
                    src={imageURL}
                />
                <Card.Header>
                    {username}
                </Card.Header>
                <Card.Meta>
                    {moment(createdAt).fromNow(true)}
                </Card.Meta>
                <Card.Description as={Link} to={`/products/${id}`}>
                    {name + " - $" + price}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                {user && user.username === username && <DeleteProductButton productId={id}/>}
                {user && <AddToCartButton user={user} productId={id}/>}
            </Card.Content>
        </Card>
    );
}

export default ProductCard;