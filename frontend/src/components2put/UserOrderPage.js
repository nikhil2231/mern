import React, { useEffect } from 'react';
import { Container, Row, Card, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { myOrder } from '../actions/orderActions';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { Link } from 'react-router-dom';
import Classes from './UserOrderPage.module.css';
const UserOrderPage = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.usersOrder);
  const { loading, orders, error } = order;

  useEffect(() => {
    dispatch(myOrder());
  }, [dispatch]);

  const formatDate = (inputDate) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const dateObj = new Date(inputDate);
    return dateObj.toLocaleDateString('en-US', options);
  };

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          <Row>
            <h1 className='text-bg-info rounded-5 text-uppercase text-bg-light font-weight-bolder shadow-m-0 p-3 mb-5 bg-white rounded text-center'>
              My Orders:-
            </h1>
          </Row>
          {orders.map((order) => (
            <Col key={order._id} xs={12} sm={6} md={4} lg={3}>
              <Link to={`/order/${order._id}`} className={`text-decoration-none text-dark `}>
                <Card className={`mb-3 ${Classes.hover} `} >
                  <Col>{`Order At: ${formatDate(order.createdAt)}`}</Col>
                  <Col>{` Rs.${order.totalPrice}`}</Col>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default UserOrderPage;
