import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { login } from '../actions/userAction';
import FormContainer from '../Components/FormContainer';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);  
  const { loading, error, userInfo } = userLogin;

   

  let redirect = location.search ? location.search.split('=')[1] : '/';
if(location.search && location.search.includes('shipping') ) redirect = '/shipping';
 

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };


  useEffect(() => {
    if (userInfo) {
      navigate(`${redirect}`);
    }
  }, [navigate, userInfo, redirect]);

  
  return (
    <FormContainer>
      <h1>Sign in</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={formSubmitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter an Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button className='py-2' type="submit">Sign In</Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;