import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link, useNavigate } from 'react-router-dom';


const Product = ({ product }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <Card >
      <div onClick={handleProductClick}>
        <Link>
          <Card.Img src={product.image} variant='top' />
        </Link>
      </div>
      <Card.Body className='d-flex flex-column'>
        <div onClick={handleProductClick}>
          <Link className='text-decoration-none text-dark'>
            <Card.Title as='div'>
              <strong className='text-decoration-none'>{product.name}</strong>
            </Card.Title>
          </Link>
        </div>

        <Card.Text as='div'>
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </Card.Text>

        <Card.Text as='div'>
          <div className='my-3'>
            {product.rating} from {product.numReviews} reviews
          </div>
        </Card.Text>
        <Card.Text as='h3'>₹{product.price} </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
