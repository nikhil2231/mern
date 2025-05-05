import React, { useEffect, useState , useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../Components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, detailProducts } from '../actions/productActions';
import Loader from '../Components/Loader';
import Message from '../Components/Message';


const ProductPage = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState();
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id ? params.id : '';
  const navigate = useNavigate(); 


  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error } = productDetails;
  const product = productDetails.product?.product; // Added optional chaining
  console.log(productDetails);
  const cartState = useSelector((state) => state.cart.cartItems);
  const isProductInCart = cartState && cartState.find((item) => item.product === params.id);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const {error: reviewError , success} = useSelector((state)=> state.productReview );
  

  const addToCartHandler = () => {

    navigate(`/cart/${id}?qty=${qty}`);
  };

const datePost = useCallback(
  (date) => {
    const options = {
      day: 'numeric', month:'short', year:'numeric'
    };

    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', options)
  },[])



  

  useEffect(() => {
    if(success) {
      alert('Review Submitted');
      setRating(null);
      setComment('')
      dispatch({ type: 'PRODUCT_REVIEW_RESET'})

    }
    dispatch(detailProducts(params.id));

    

  }, [params.id, dispatch, success]);

  const submitHandler = (e) => { 
    e.preventDefault();
    const datePosted = datePost(new Date());
    console.log(datePosted);
  
    dispatch(addReview(id, {
      rating, 
      comment, 
      datePosted 
    }));
  }
  





  return (
    <React.Fragment>
      <Link className='btn btn-light my-2' to='/'>
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='dark'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  aspectRatio: 2 / 1,
                }}
                src={product?.image}
                alt={product?.name}
                fluid
              />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product?.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product?.rating} text={`${product?.numReviews} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item>{`Price: ₹${product?.price}`}</ListGroup.Item>
                <ListGroup.Item>{`Description: ${product?.description}`}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>{` ₹${product?.price}`}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status</Col>
                      <Col>{product?.countInStock === 0 ? 'Out Of Stock' : 'In Stock'}</Col>
                    </Row>
                  </ListGroup.Item>
                  {!isProductInCart && product?.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => {
                              setQty(e.target.value);
                            }}
                          >
                            {[...Array(product?.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className='btn-block btn-dark'
                      type='button'
                      disabled={product?.countInStock === 0}
                      onClick={() => (isProductInCart ? navigate('/cart') : addToCartHandler())}
                    >
                      {isProductInCart ? 'Product is already in cart, Go to Cart' : 'Add to Cart'}
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2> Reviews </h2>
              {product?.reviews.length === 0 && <Message> No reviews </Message>}
                <ListGroup variant='flush'> 
                {product?.reviews.length > 0 && 
                  product?.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.datePosted}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item key={'random'}>
                    <h2>Write a Review</h2>
                    {userInfo ? (
                      <Form onSubmit={submitHandler}> 
                      <Form.Group controlId='rating'>
                        <Form.Label> Rating </Form.Label>
                        <Form.Control as='select' placeholder='select..' onChange={(e)=> setRating(e.target.value) }
                        > <option value="" disabled selected>Select your Rating</option>
                          <option value='1'>1- Poor</option>
                          <option value='2'>2- Fair</option>
                          <option value='3'>3- Good</option>
                          <option value='4'>4- Very Good</option>
                          <option value='5'>5- Excellent</option>

                        </Form.Control>

                      </Form.Group>
                      <Form.Group>
                        <Form.Label> Add a Comment </Form.Label>
                        <Form.Control as='textarea' placeholder='Write a review...' row='4' value={comment} onChange={(e)=> setComment(e.target.value) }></Form.Control>
                      </Form.Group>
                      <Button className='my-3' type='submit' disabled={!rating || !comment}> Submit Review </Button>
                      </Form>
                    ) : (
                      <Link to={'/login'}>
                        <Message>{"Please login"}</Message>
                      </Link>
                    )}
                  </ListGroup.Item>
                </ListGroup>

            </Col>
          </Row>
        </>
      )}
    </React.Fragment>
  );
};

export default ProductPage;
