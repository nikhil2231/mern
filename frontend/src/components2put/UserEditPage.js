import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import FormContainer from '../Components/FormContainer';
import Loader from '../Components/Loader'; // You might need to import the Loader component
import Message from '../Components/Message'; // You might need to import the Message component
import { userDetails, updateUser } from '../actions/userAction';

const UserEditPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userDetail = useSelector((state) => state.userDetail);
  const userUpdate = useSelector((state) => state.userUpdate);
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const { user } = userDetail;
  const { isAdmin: admin } = userInfo;

  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (success) {
      dispatch({ type: 'USER_UPDATE_RESET' });
      dispatch({ type: 'USER_UPDATE_PROFILE_RESET' });
      navigate('/admin/userlist');
    }

    if (!userInfo || !admin) {
      navigate('/login');
    }

    if (!user || user._id !== id) {
      dispatch(userDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, id, user, navigate, userInfo, admin, success]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: id, name, email, isAdmin }));
    // Add your update logic here
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <FormContainer>
          <h1>Edit User</h1>
          <Form onSubmit={formSubmitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Edit Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Edit Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default UserEditPage;
