import React, { useEffect, useState } from 'react';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { orderDetails, payOrder, orderReset , markDeliver} from '../actions/orderActions';
import Loader from '../Components/Loader';



const OrderScreen = () => {
  const params = useParams();
  const { id } = params;
  const [sdkReady, setSdkReady] = useState(false);


    const dispatch = useDispatch();
    const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const orderDetail = useSelector((state) => state.orderDetails);
  console.log(orderDetail);
  const userLogin = useSelector(state => state.userLogin);
  const { loading, error , order} = orderDetail;
  const { shippingAddress } = cart;
  const { userInfo } = userLogin;
  const orderPay = useSelector((state)=> state.orderPay);
  const {loading: loadingPay, success: successPay } = orderPay;
  const markDelivered = useSelector((state)=> state.orderDeliver);
  const { error: errorDeliver, loading: loadingDeliver, success: successDeliver} = markDelivered;

  

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }
 order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
    
  }
    



  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
  
      script.onload = () => {
        setSdkReady(true);
      };
  
      document.body.appendChild(script);
    };
  
    dispatch(orderReset());
    
    dispatch({type: "ORDER_DELIVER_RESET"});
  
    if (!userInfo) {
      navigate('/login?redirect=shipping');
    } else if (!shippingAddress) {
      navigate('/shipping');
    } else if (!order || order._id !== id) {
      dispatch(orderDetails(id));
    }
  
    if (successPay || successDeliver) {
      dispatch( {type: "ORDER_PAY_RESET"})
      dispatch( {type: 'ORDER_DELIVER_RESET'})
      dispatch(orderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    } 

   
    
    // Clean up the dynamically added PayPal script when the component unmounts
    return () => {
      const scriptElement = document.querySelector('script[src^="https://www.paypal.com/sdk/js"]');
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  
  }, [userInfo, shippingAddress, navigate, dispatch, id, order, successPay, successDeliver]);
  

  const successPaymentHandler = (paymentResult)=> {
console.log(paymentResult);
dispatch(payOrder(id, paymentResult))

  }
 const deliverHandler = function () {
  dispatch(markDeliver(orderDetail.order));

 }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h1>Order {order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name:</strong> <b>{order.user.name.toUpperCase()}</b>
                  </p>
                  <p>
                    <strong>Email:</strong>{' '}
                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                  </p>
                  <p>
                    <strong>Address:</strong>{' '}
                    {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                    {order.shippingAddress.postalCode},{' '}
                    {order.shippingAddress.country}
                    {order.isDelivered ? (
                      <Message variant="success">Delivered on: {` Date ${order.deliveredAt.slice(0, 10)} Time ${order.deliveredAt.slice(12, 16)}`}</Message>
                    ) : (
                      <Message variant="danger">Not Delivered</Message>
                    )}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <strong>Method:</strong> {order.paymentMethod}
                  {order.isPaid ? (
                    <Message variant="success">Paid</Message>
                  ) : (
                    <Message variant="danger">Not Paid</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Order Item</h2>
                  {order.orderItems.length !== 0 ? (
                    <ListGroup variant="flush">
                      {order.orderItems.map((val, idx) => (
                        <ListGroup.Item key={idx}>
                          <Row>
                            <Col md={1} sm={2} xs={3}>
                              <Image
                                src={val.image}
                                alt={val.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link
                                style={{
                                  textDecoration: 'none',
                                  textAlign: 'center',
                                }}
                                to={`/product/${val.product}`}
                              >
                                {val.name}
                              </Link>
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
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>₹{order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>₹{order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>₹{order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total Price</Col>
                      <Col>₹{order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row className="text-center">
                      <Col></Col>
                    </Row>
                  </ListGroup.Item>
                  {!order.isPaid && (
                    <ListGroup.Item>
                      {loadingPay && <Loader />}
                      {!sdkReady ? (
                        <Loader />
                      ) : (
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        />
                      )}
                    </ListGroup.Item>
                  )} 
                  {
                    userInfo && userInfo.isAdmin && !orderDetail.order.isDelivered &&  <Button onClick={deliverHandler}> {loadingDeliver ? "Loading..." : errorDeliver ? "Error in delivery" :  "Mark As Deliver"}</Button>
                  }
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
  

   
  
};

export default OrderScreen;
