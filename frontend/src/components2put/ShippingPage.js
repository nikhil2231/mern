import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../Components/FormContainer';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../Components/CheckoutSteps';

const ShippingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const userLogin = useSelector(state => state.userLogin);
    const { shippingAddress } =  cart;
    const { userInfo } = userLogin;

    useEffect(()=> {
        console.log(userInfo);
        if(!userInfo) {
            navigate('/login?redirect=shipping')
        } 
     }, [userInfo, navigate])
    
const [city, setCity] = useState(shippingAddress.city);
const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
const [address, setAddress] = useState(shippingAddress.address);
const [country, setCountry] = useState(shippingAddress.country);


const submitHandler = (e)=> {
   e.preventDefault();
   dispatch(saveShippingAddress({address, city, postalCode, country}));
   navigate('/payment')
}

  return (
    <FormContainer>
    <CheckoutSteps step1={true}  step2={true}  />
    <h1>Shipping </h1>
    <Form onSubmit={submitHandler}>
    <Form.Group controlId='address'>
        <Form.Label>Address</Form.Label>
        <Form.Control type='text' placeholder='Enter Address' value={address} required onChange={(e)=> {setAddress(e.target.value)}}>
        </Form.Control>
           
    </Form.Group>
    <Form.Group controlId='city'>
        <Form.Label>City</Form.Label>
        <Form.Control type='text' placeholder='Enter City' value={city} required onChange={(e)=> {setCity(e.target.value)}}>
        </Form.Control>
           
    </Form.Group>
    <Form.Group controlId='postalcode'>
        <Form.Label>Postal Code</Form.Label>
        <Form.Control type='text' placeholder='Enter PostalCode' value={postalCode} required onChange={(e)=> {setPostalCode(e.target.value)}}>
        </Form.Control>
           
    </Form.Group>
    <Form.Group controlId='country'>
        <Form.Label>Country</Form.Label>
        <Form.Control type='text' placeholder='Enter Country' value={country} required onChange={(e)=> {setCountry(e.target.value)}}>
        </Form.Control>
           
    </Form.Group>

       <Button type='submit' variant='dark' className='py-2 mt-3'>Continue </Button>
    </Form>
       
    </FormContainer>
  )
}

export default ShippingPage