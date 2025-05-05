import axios from "axios"




export const createOrder = (orderData) => async (dispatch, getState)=> {
    try {
     
      dispatch({type: "ORDER_CREATE_REQUEST"});
      console.log('hello from createOrder' , orderData);
  
      const { userLogin: { userInfo } } = getState();
   
      const config = {
          headers: {
              'Content_Type': "application/json",
              Authorization: `Bearer ${userInfo.token}`
          }
      }
  
      const { data } = await axios.post("/api/orders", orderData,  config);
      
      dispatch({type: "ORDER_CREATE_SUCCESS", payload: data });
    
    
    }
    catch(err) {
      console.log("Error caught in login action:", err)
      dispatch({type: "ORDER_CREATE_FAILED", payload: err.response && err.response.data.message ? err.response.data.message : err.message });
      console.log(err.response, err.response.data.message , err.message)
    }
  }
  

export const orderDetails = (id) => async (dispatch,getState)=> {
  try {
    dispatch({type: "ORDER_DETAILS_REQUEST"});

    const { userLogin: { userInfo } } = getState();
    console.log(id);
 
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.get(`/api/orders/${id}`, config);
    
    
    dispatch({type: "ORDER_DETAILS_SUCCESS", payload: data });

   

   
  
  }
  catch(err) {
    console.log("Error caught in login action:", err)
    dispatch({type: "ORDER_DETAILS_FAILED", payload: err.response && err.response.data.message ? err.response.data.message : err.message });
    console.log(err.response, err.response.data.message , err.message)
  }


}



export const orderReset = () => async (dispatch)=> {
  try {
    dispatch({type: "ORDER_RESET"});

   
  
  }
  catch(err) {
    console.log("Error")
  }


}

export const markDeliver = (order)=> async (dispatch, getState)=> 

{
try {
  dispatch({type:"ORDER_DELIVER_REQUEST"})
   const { userLogin : { userInfo }} = getState();
   const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`
    }
   }

   const { data } = await axios.put(`/api/orders/${order._id}/deliver`, {}, config);

   dispatch({type: 'ORDER_DELIVER_SUCCESS', payload: data});

}
catch(err) {
       dispatch({
       type: 'ORDER_DELIVER_FAILED',
       payload: err.response && err.response.data.message ? err.response.data.message : err.message

       })
}



}



export const payOrder = (id, paymentResult) => async (dispatch,getState)=> {
  try {
    dispatch({type: "ORDER_PAY_REQUEST"});

    const { userLogin: { userInfo } } = getState();
    console.log(id);
 
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.put(`/api/orders/${id}/pay`, paymentResult, config);
    
    
    dispatch({type: "ORDER_PAY_SUCCESS", payload: data });

   

   
  
  }
  catch(err) {
   
    dispatch({type: "ORDER_PAY_FAILED", payload: err.response && err.response.data.message ? err.response.data.message : err.message });
    console.log(err.response, err.response.data.message , err.message)
  }


}

export const listMyOrders = () => async (dispatch,getState)=> {
  try {
    dispatch({type: "ORDER_LIST_MY_REQUEST"});

    const { userLogin: { userInfo } } = getState();

 
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.get('/api/orders/myorders', config);
    
    
    dispatch({type: "ORDER_LIST_MY_SUCCESS", payload: data });

   

   
  
  }
  catch(err) {
   
    dispatch({type: "ORDER_LIST_MY_FAILED", payload: err.response && err.response.data.message ? err.response.data.message : err.message });
    console.log(err.response, err.response.data.message , err.message)
  }


}

export const listOrder = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'ORDER_LIST_REQUEST' }); // Dispatch an action object
    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/orders', config);
    dispatch({ type: 'ORDER_LIST_SUCCESS', payload: data });
  } catch (err) {
    dispatch({ type: 'ORDER_LIST_FAILED', payload: err });
  }
};

export const myOrder = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'MY_ORDER_REQUEST' }); // Dispatch an action object
    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`api/orders/usersorder`, config);
    dispatch({ type: 'MY_ORDER_SUCCESS', payload: data });
  } catch (err) {
    dispatch({ type: 'MY_ORDER_ERROR', payload: err });
  }
};




