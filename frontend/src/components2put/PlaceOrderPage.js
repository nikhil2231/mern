  import React, { useEffect, useState } from 'react';
  import { Button, Row, Col, ListGroup, Image, Card, } from 'react-bootstrap';
  import { useDispatch, useSelector } from 'react-redux';
  import Message from '../Components/Message';
  import CheckoutSteps from '../Components/CheckoutSteps';
  import { Link, useNavigate } from 'react-router-dom';
  import { removeCartItems } from '../actions/cartActions';
  import { createOrder } from '../actions/orderActions';


  const PlaceOrderPage = () => {
      const dispatch = useDispatch();
      const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const orderFromReducer = useSelector((state) => state.orderCreate);
    const userLogin = useSelector(state => state.userLogin);
    const { loading, success, error , order,} = orderFromReducer;
  console.log(loading, success, error , order)

    const { shippingAddress } = cart;
    const { userInfo } = userLogin;

    console.log(orderFromReducer)
    const removeItemHandler = (value)=> {
      dispatch((removeCartItems(value)))
    }


    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    cart.itemsPrice = addDecimals(
      cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (
      Number(cart.itemsPrice) +
      Number(cart.shippingPrice) +
      Number(cart.taxPrice)
    ).toFixed(2)


    

    const placeOrderHandler = ()=> {

      dispatch(createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice
      }))
    }

  
    useEffect(() => {
      console.log(userInfo);
      if (!userInfo) {
          navigate('/login?redirect=shipping');
      } else if (!shippingAddress) {
          navigate('/shipping');
      }

      if (success && order && order._id && !error &&!loading) {
      
          navigate(`/order/${order._id}`);
      }
      
  }, [userInfo, shippingAddress, navigate, success, order, error, dispatch, loading]);

    return (
      <>
        <CheckoutSteps step1={true} step2={true} step3={true} step4={true} />
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
                  {cart.shippingAddress.country}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <strong>Method:</strong> {cart.paymentMethod}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order Item</h2>
                {cart.cartItems.length !== 0 ? (
                  <ListGroup variant='flush'>
                    {cart.cartItems.map((val, idx) => (
                      <ListGroup.Item key={idx}>
                        <Row>
                          <Col md={1} sm={2} xs={3}>
                            <Image src={val.image} alt={val.name} fluid rounded />
                          </Col>
                          <Col>
                            <Link
                              style={{ textDecoration: 'none', textAlign: 'center' }}
                              to={`/products/${val.product}`}
                            >
                              {val.name}
                            </Link>
                            <Button type='button'  key={val.product} variant='light' onClick={ ()=> {removeItemHandler(val.product) } 
                  
                      
                      }> 
                        <i className='fas fa-trash' />
                      </Button>
                          </Col>
                          <Col md={4}>
                            <strong>
                              {val.qty} x ₹{val.price} = ₹{val.qty * val.price}
                            </strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <Message>Your Cart is Empty</Message>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>

  <Card>
      <ListGroup variant='flush'>
      <ListGroup.Item>
          <h2> Order Summary</h2>

      </ListGroup.Item>
      <ListGroup.Item>
          <Row>
              <Col> Items </Col>
              <Col> ₹{cart.itemsPrice}</Col>
          </Row>
      </ListGroup.Item>
      <ListGroup.Item>
          <Row>
              <Col> Shipping </Col>
              <Col> ₹{cart.shippingPrice}</Col>
          </Row>
      </ListGroup.Item>
      <ListGroup.Item>
          <Row>
              <Col> Tax </Col>
              <Col> ₹{cart.taxPrice}</Col>
          </Row>
      </ListGroup.Item>
      <ListGroup.Item>
          <Row>
              <Col> Total Price </Col>
              <Col> ₹{cart.totalPrice}</Col>
          </Row>
      </ListGroup.Item>
      <ListGroup.Item>
      <ListGroup.Item> 
      {error && <Message variant='danger'> {error} </Message>}
      </ListGroup.Item>
    <Row className="text-center">
      <Col>
        <Button
          type="button"
          className="btn-block"
          disabled={cart.cartItems.length === 0}
          onClick={placeOrderHandler}
          style={{ backgroundColor: 'black', width: '100%' }}
        >
          Place Order
        </Button>
      </Col>
    </Row>
  </ListGroup.Item>



      </ListGroup>
  </Card>


          </Col>
        </Row>
      </>
    );
  };

  export default PlaceOrderPage;
