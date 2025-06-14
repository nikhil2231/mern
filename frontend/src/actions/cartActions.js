import axios from "axios";



export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
  const res = await axios.get(`/api/products/${id}`)
  const data = res.data.product;
  

  console.log(res);

   await dispatch({
    type: 'CART_ADD_ITEM',
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems)) }
  catch (error) {
    console.log(error);

  }
}

export const removeCartItems = (id) => (dispatch, getState) => {
  dispatch({
    type: 'Cart_Remove_Item',
    payload: id
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  
} 


export const saveShippingAddress = (data) => (dispatch) =>  {
  dispatch({
      type: "CART_SAVE_SHIPPING_ADDRESS", 
      payload: data
  });

  localStorage.setItem('shippingAddress', JSON.stringify(data))

}




export const savePaymentMethod = (data) => (dispatch) =>  {
  dispatch({
      type: "CART_SAVE_PAYMENT_METHOD", 
      payload: data
  });

  localStorage.setItem('paymentMethod', JSON.stringify(data))

}


export const resetCartAfterSuccessFull= ()=> (dispatch)=> {
     
  dispatch({type: "CART_RESET"});
  localStorage.removeItem('cartItems');
  localStorage.setItem('cartItems', JSON.stringify([]));

}