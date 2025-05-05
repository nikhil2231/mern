import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { listUsers, deleteUser } from '../actions/userAction';



const UsersListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const userList = useSelector((state) => state.userList);
  const userLogin = useSelector((state) => state.userLogin);
  const userDelete = useSelector((state) => state.userDelete);
  const { userInfo } = userLogin;
  const { error, loading, users } = userList;
  const { error: deleteError, loading: deleteLoading, success} = userDelete;
  console.log(users, error);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate('/login');
    }
  }, [dispatch, userInfo, navigate, success]);

  function deleteHandler(id) {
    setShowModal(true);
    setSelectedUserId(id);
    

    
  }

  function closeModal() {
    setShowModal(false);
    setSelectedUserId(null);
  }

  function deleteUserHandler() {
    dispatch(deleteUser(selectedUserId));
    dispatch({type: "DELETE_USER_RESET"})
 
    closeModal();
  }

  return (
    <Container>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='table-responsive'>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`} className='email-link'>
                      {user.email}
                    </a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i className='fas fa-check' style={{ color: 'green' }}></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <Link to={`/admin/user/${user._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </Link>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {deleteLoading ? (
  <p>Deleting user...</p>
) : deleteError ? (
  <p>{deleteError}</p>
) : (
  <p>are you sure you wanna delete the user <b>{selectedUserId} </b> ?</p>
)}

        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeModal}>
            Cancel
          </Button>
          <Button variant='danger' onClick={deleteUserHandler}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UsersListPage;
