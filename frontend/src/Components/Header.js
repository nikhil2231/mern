import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userAction';
import Classes from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTag } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.userLogin.userInfo);

  function logOutHandler() {
    dispatch(logout());
    navigate('/');

  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect fixed='top'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>MERN ProShop Tree     </Navbar.Brand>
          </LinkContainer>
            <div> <input type='text' placeholder='Search For Products' onChange={(e)=> {props.setSearch(e.target.value)}}/> </div>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
             
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i>Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown className={Classes.nav} title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item className={Classes.profile}>
                      Profile <FontAwesomeIcon icon={faUserTag} beatFade />
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/myorders'>
                    <NavDropdown.Item >
                      My Orders
                     
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item className={Classes.logout} onClick={logOutHandler}>
                    Logout
                  </NavDropdown.Item>
                 
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i>Sign in
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='admin/order'>
                    <NavDropdown.Item>
                      Orders
                    </NavDropdown.Item>
                  
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
