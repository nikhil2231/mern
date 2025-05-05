import React, { useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, ListGroupItem, Image, Form, Button, Card } from 'react-bootstrap';
import { addToCart, removeCartItems } from '../actions/cartActions';
import './CartPage.css';
import Message from '../Components/Message';

const CartPage = () => {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.cartItems);

  let productId = params.id;
  let qty = location.search ? Number(location.search.split('=')[1]) : 1;

  // Check if the cart already contains an item with the same productId as the one in the URL
  const cartItem = cart.find((item) => item.product === productId);
  if (cartItem) {
    qty = cartItem.qty;

    
  }

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty, navigate]);

  const removeItemHandler = (itemId) => {
    dispatch(removeCartItems(itemId));
    navigate('/cart')
 
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart </h1>
        {cart.length === 0 ? (
          <Message variant={"alert alert-dark "}>
            Your Cart is Empty{" "}
            <Link className='text-decoration-none font-weight-bold' to='/'>Go Back </Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cart.map((item) => (
              <ListGroupItem key={item.product}>
                <Row>
                  <Col md={1}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link className='my-link' to={`/products/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    <h6 style={{lineHeight: "2"}}> Rs.{item.price} </h6> 
                  </Col>
                  <Col md={3}>
                    <div className="quantity-buttons">
                      <Button
                        variant="outline-secondary"
                        disabled={item.qty === 1}
                        onClick={() =>
                          dispatch(addToCart(item.product, Number(item.qty - 1)))
                        }
                      >
                        <i className="fa fa-minus" />
                      </Button>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(addToCart(item.product, Number(e.target.value), 
                         
                          
                          ))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                      <Button key={item.product}
                        variant="outline-secondary"
                        disabled={item.qty === item.countInStock}
                        onClick={() => {
                          dispatch(addToCart(item.product, Number(item.qty + 1)))
                         
                        }}
                      >
                        <i className="fa fa-plus" />
                      </Button>
                    </div>
                  </Col>
                  <Col md={1}>
                    <i class="fa fa-caret-down" aria-hidden="true"></i>
                  </Col>
                  <Col md={2}>
                    <Button type='button'  key={item.product} variant='light' onClick={function () {
                      removeItemHandler(item.product) 
                     
                    }}> 
                      <i className='fas fa-trash' />
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={3}>
      <Card>
        <ListGroup variant='flush'>
        <ListGroup.Item>
          <h2> Subtotal ({cart.reduce((acc, currValue) => acc + currValue.qty, 0 )} ) items</h2>
        </ListGroup.Item>
        <ListGroup.Item>
         Price: ₹{cart.reduce((acc, currValue) => acc + currValue.qty * currValue.price , 0).toFixed(2)}

        </ListGroup.Item>
        <ListGroup.Item>
        <Link to={'/login?redirect=shipping'} > <Button type='button' class='btn-block ' variant='success' disabled={cart.length === 0} > Proceed To Checkout </Button>
</Link>
        </ListGroup.Item>


        </ListGroup>
      </Card>

      </Col>

    </Row>
  )
}

export default CartPage


