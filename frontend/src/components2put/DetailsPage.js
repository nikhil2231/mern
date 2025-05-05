import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { updateUserProfile, userDetails } from '../actions/userAction';
import { listMyOrders } from '../actions/orderActions';
import { set } from 'mongoose';

const DetailsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userDetail);
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  console.log(userUpdateProfile)
  const { loading, error, user } = userDetail;
  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading: loadingList, error: errorList, orders } = orderMyList;



 
  const { success, error: updateError} = userUpdateProfile;

  console.log(success);

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  



  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      setMessage(null);
      dispatch(updateUserProfile({ id: user._id, name, email, password, currentPassword }));
    }
  };


  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      dispatch(listMyOrders());
    }
  }, [navigate, userInfo, dispatch]);
  
  useEffect(() => {
    if (success) {
      setTimeout(()=> {

        dispatch({ type: 'USER_UPDATE_PROFILE_RESET' });
      }, 2000)

      dispatch(userDetails('/profile'));
      dispatch(listMyOrders());
      
    }
  }, [success, dispatch]);
  
  // Rest of the code...
  

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {
  updateError ? (
    <Message variant="danger">{updateError}</Message>
  ) : (
    error ? (
      <Message variant="danger">{error}</Message>
    ) : (
      success ? (
        <Message variant="success">Profile Updated</Message>
      ) : message ? (
        <Message variant='danger'> Passwords do not match</Message>
      ) : null
    )
  )
}


        
        {loading && <Loader />}
        <Form onSubmit={formSubmitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter an Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="confirmpassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="currentPassword">
            <Form.Label>Current Password</Form.Label>
            <Form.Control type="currentPassword" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          </Form.Group>
          <Button type="submit">Update</Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingList ? (
          <Loader />
        ) : errorList ? (
          <Message variant="danger"> {errorList}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt ? order.createdAt.substring(0, 10) : ''}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? order.paidAt ? order.paidAt.substring(0, 10) : '' : <i className="fas fa-times" style={{ color: 'red' }}></i>}
                  </td>
                  <td>
                    {order.isDelivered ? order.deliveredAt ? order.deliveredAt.substring(0, 10) : '' : <i className="fas fa-times" style={{ color: 'red' }}></i>}
                  </td>
                  <td>
                    <NavLink to={`/order/${order._id}`}>
                      <Button variant="light">Details</Button>
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default DetailsPage;
