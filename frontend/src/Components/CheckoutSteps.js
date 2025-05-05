import React from 'react'
import { NavLink } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

const 
CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <NavLink to='/login' className='nav-link'>
            Sign In
          </NavLink>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <NavLink to='/shipping' className='nav-link'>
            Shipping
          </NavLink>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <NavLink to='/payment' className='nav-link'>
            Payment
          </NavLink>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <NavLink to='/placeorder' className='nav-link'>
            Place Order
          </NavLink>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
