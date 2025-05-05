import React, { useEffect, useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../Components/FormContainer';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../Components/CheckoutSteps';

const PaymentPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const userLogin = useSelector(state => state.userLogin);
    const { shippingAddress } = cart;
    const { userInfo } = userLogin;
    const { paymentMethod } = cart;

    useEffect(() => {
        console.log(userInfo);
        if (!userInfo) {
            return navigate('/login?redirect=shipping')
        } else if (!shippingAddress) {
            return navigate('/shipping')
        }
    }, [userInfo, navigate, shippingAddress])

    const [paymentMethodCurrent, setPaymentMethodCurrent] = useState(paymentMethod);


    const submitHandler = (e) => {
        e.preventDefault();
        console.log(paymentMethod)
        dispatch(savePaymentMethod(paymentMethodCurrent))
        navigate('/placeorder')

    }

    return (
        <FormContainer>
            <CheckoutSteps step1={true} step2={true} step3={true} />
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend"> Select Payment Method
                    </Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='Paypal or Credit Card'
                            id="Paypal"
                            name="PaymentMethod"
                            value="Paypal"
                            checked={paymentMethod === "Paypal"}
                            onChange={(e) => {
    setPaymentMethodCurrent(e.target.value)
    dispatch(savePaymentMethod(e.target.value))
}}

                            style={{color: paymentMethod ==='Paypal' ? "hotpink" : "black"}}
                        />
                        <Form.Check
                            type='radio'
                            label='Stripe'
                            id="Stripe"
                            name="PaymentMethod"
                            value="Stripe"
                            checked={paymentMethod === "Stripe"}
                            onChange={(e) => {
    setPaymentMethodCurrent(e.target.value)
    dispatch(savePaymentMethod(e.target.value))
}}

                            style={{color: paymentMethod ==="Stripe" ? "hotpink" : "black"}}
                        />
                    </Col>
                </Form.Group>
                <Button type='submit' variant='dark' className='py-2 mt-3' disabled={!paymentMethodCurrent}> { paymentMethodCurrent ? `Continue with ${paymentMethodCurrent}` : 'Continue' } </Button>
            </Form>

        </FormContainer>
    )
}

export default PaymentPage;
