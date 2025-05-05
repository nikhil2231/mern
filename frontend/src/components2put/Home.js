import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import Rating from '../Components/Rating';
import Classes from './Home.module.css';

const Home = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, products } = useSelector((state) => state.productList);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const productHandler = (id) => {
    navigate(`/products/${id}`);
  };

  // ✅ Actual filtering logic
  const filteredProducts = props.search
    ? products?.filter((product) =>
        product.name.toLowerCase().includes(props.search.toLowerCase())
      )
    : products;

  return (
    <React.Fragment>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className={Classes.container}>
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="my-2 product"
                onClick={() => productHandler(product._id)}
                role="button"
              >
                <img src={product.image} alt={product.name} />
                <div>
                  <Link to={`/products/${product._id}`} className="text-decoration-none text-dark">
                    <strong>{product.name}</strong>
                  </Link>
                </div>
                <Card.Text as="div">
                  <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </Card.Text>
                <Card.Text as="div">
                  <div className="my-3">{product.rating} from {product.numReviews} reviews</div>
                </Card.Text>
                <Card.Text as="h3">₹{product.price}</Card.Text>
              </div>
            ))
          ) : (
            <Message variant="info">No products match your search.</Message>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default Home;
