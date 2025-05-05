import axios from "axios"


export const listProducts = () => async (dispatch) => {
    try {

        dispatch({ type: 'PRODUCT_LIST_REQUEST' })

        const res =  await axios.get('/api/products');
         console.log("im From action" +  res);
         const data = await res.data.Products;
        


        dispatch({ type: 'PRODUCT_LIST_SUCCESS', payload: data })



    } catch (error) {
        console.log(error);

        dispatch({ type: 'PRODUCT_LIST_FAIL', payload: error.response && error.response.data.message ? error.response.data.message : error.message })

    }



}





//thunk
export const detailProducts = (id) => async (dispatch) => {
    try {

        dispatch({ type: 'PRODUCT_DETAILS_REQUEST' })

        const { data } = await axios.get(`/api/products/${id}`);
       

        dispatch({ type: 'PRODUCT_DETAILS_SUCCESS', payload: data })



    } catch (error) {

        dispatch({ type: 'PRODUCT_DETAILS_FAIL', payload: error.response && error.response.data.message ? error.response.data.message : error.message })

    }



}



export const deleteProduct = (id) => async (dispatch,getState)=> {
    try {
      dispatch({type: "DELETE_PRODUCT_RESET"});
  
      const { userLogin: { userInfo } } = getState();
  
   
      const config = {
          headers: {
              Authorization: `Bearer ${userInfo.token}`
          }
      }
  
     await axios.delete(`/api/products/${id}`, config);
      
      
      dispatch({type: "PRODUCT_DELETE_SUCCESS"});
  
     
  
     
    
    }
    catch(err) {
     
      dispatch({type: "DELETE_PRODUCT_FAIL", payload: err.response && err.response.data.message ? err.response.data.message : err.message });
      
    }
  
  
  }
  
  export const createProduct = () => async (dispatch,getState)=> {
    try {
      dispatch({type: "_PRODUCT_CREATE_REQUEST"});
  
      const { userLogin: { userInfo } } = getState();
  
   
      const config = {
          headers: {
              Authorization: `Bearer ${userInfo.token}`
          }
      }
  
   const  { data } =  await axios.post(`/api/products/`, {},  config);
      
      
      dispatch({type: "PRODUCT_CREATE_SUCCESS", payload: data});
  
     
  
     
    
    }
    catch(err) {
     
      dispatch({type: "PRODUCT_CREATE_FAIL", payload: err.response && err.response.data.message ? err.response.data.message : err.message });
    
    }
  
  
  }
  



  export const updateProduct = (product) => async (dispatch,getState)=> {
    try {
      dispatch({type: "PRODUCT_UPDATE_REQUEST"});
  
      const { userLogin: { userInfo } } = getState();
  
   
      const config = {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`
          }
      }
  
   const  { data } =  await axios.put(`/api/products/${product._id}`, product,  config);
      
      
      dispatch({type: "PRODUCT_UPDATE_SUCCESS", payload: data});
  
     
  
     
    
    }
    catch(err) {
     
      dispatch({type: "PRODUCT_UPDATE_FAIL", payload: err.response && err.response.data.message ? err.response.data.message : err.message });
    
    }
  
  
  }
  

  

  export const addReview = (productId, review) => async (dispatch,getState)=> {
    try {
      dispatch({type: "PRODUCT_REVIEW_REQUEST"});
  
      const { userLogin: { userInfo } } = getState();
  
   
      const config = {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`
          }
      }
 await axios.post(`/api/products/${productId}/reviews`, review,  config);
      
      
      dispatch({type: "PRODUCT_REVIEW_SUCCESS"});
  
     
  
     
    
    }
    catch(err) {
     
      dispatch({type: "PRODUCT_REVIEW_FAILED", payload: err.response && err.response.data.message ? err.response.data.message : err.message });
    
    }
  
  
  }
  