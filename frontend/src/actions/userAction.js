import axios from "axios"

export const login = (email, password) => async (dispatch)=> {
  try {
    console.log("Inside login action")
    dispatch({type: "USER_LOGIN_REQUEST"});

    const config = {
        headers: {
            'Content_Type': "application/json"
        }
    }

    const { data } = await axios.post('/api/users/login', {email, password}, config);
    
    console.log('im from userLogin', data);
     
    dispatch({type: "USER_LOGIN_SUCCESS", payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
    
    console.log("Dispatched USER_LOGIN_SUCCESS action")
  }
  catch(err) {
    console.log("Error caught in login action:", err)
    dispatch({type: "USER_LOGIN_FAIL", payload: err.response && err.response.data.message ? err.response.data.message : err.message });
    console.log(err.response, err.response.data.message , err.message)
  }
}


export const logout = () => (dispatch) => {

    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems')
    dispatch({ type: "USER_LOGOUT"});
    dispatch({type: 'USER_LIST_RESET'});
    dispatch({type: 'USER_DETAILS_RESET'});
    dispatch({type: 'CART_RESET'});
    
   
    
}


export const registerUser = (name, email, password) => async (dispatch)=> {
  try {
    dispatch({type: "USER_REGISTER_REQUEST"});
    const config = {
        headers: {
            'Content_Type': "application/json"
        }
    }

    const { data } = await axios.post('/api/users', {name, email, password}, config);
    
    dispatch({type: "USER_REGISTER_SUCCESS", payload: data });
     
    dispatch({type: "USER_LOGIN_SUCCESS", payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  
  }
  catch(err) {
    console.log("Error caught in login action:", err)
    dispatch({type: "USER_REGISTER_FAIL", payload: err.response && err.response.data.message ? err.response.data.message : err.message });
    console.log(err.response, err.response.data.message , err.message)
  }
}



export const userDetails = (id) => async (dispatch, getState)=> {
  try {
    dispatch({type: "USER_DETAILS_REQUEST"});

    const { userLogin: { userInfo } } = getState();
    console.log("im from userDetails", userInfo)
    const config = {
        headers: {
            'Content_Type': "application/json",
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.get(`/api/users/${id}`, config);
    
    dispatch({type: "USER_DETAILS_SUCCESS", payload: data });
   
  
  }
  catch(err) {
    console.log("Error caught in login action:", err)
    dispatch({type: "USER_DETAILS_FAIL", payload: err.response && err.response.data.message ? err.response.data.message : err.message });
    console.log(err.response, err.response.data.message , err.message)
  }
}




export const updateUserProfile = (userData) => async (dispatch, getState)=> {
  try {
    dispatch({type: "USER_UPDATE_PROFILE_REQUEST"});

    const { userLogin: { userInfo } } = getState();
 
    const config = {
        headers: {
            'Content_Type': "application/json",
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.put("/api/users/profile", userData,  config);
    
    dispatch({type: "USER_UPDATE_PROFILE_SUCCESS", payload: data });
    dispatch({type: 'USER_LOGIN_SUCCESS', payload: data});
    localStorage.setItem('userInfo', JSON.stringify(data));
   
  
  }
  catch(err) {
    console.log(err)
    console.log("Error caught in login action:", err)
    dispatch({type: "USER_UPDATE_PROFILE_FAIL", payload: err.response && err.response.data.message ? err.response.data.message : err.message });
    console.log(err.response, err.response.data.message , err.message)
  }
}



export const listUsers = () => async (dispatch, getState)=> {
  try {
    dispatch({type: "USER_LIST_REQUEST"});

    const { userLogin: { userInfo } } = getState();
 
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.get("/api/users/", config);
    
    dispatch({type: "USER_LIST_SUCCESS", payload: data });
   
  
  }
  catch(err) {

    dispatch({type: "USER_LIST_FAILED", payload: err.response && err.response.data.message ? err.response.data.message : err.message });
    console.log(err.response, err.response.data.message , err.message)
  }
}



export const deleteUser = (userId) => async (dispatch, getState)=> {
  try {
    dispatch({type: "USER_DELETE_REQUEST"});

    const { userLogin: { userInfo } } = getState();
 
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }

     await axios.delete(`/api/users/${userId}`, config);
    
    dispatch({type: "USER_DELETE_SUCCESS"});
   
  
  }
  catch(err) {

    dispatch({type: "USER_DELETE_FAILED", payload: err.response && err.response.data.message ? err.response.data.message : err.message });
    console.log(err.response, err.response.data.message , err.message)
  }
}




export const updateUser = (userData) => async (dispatch, getState)=> {
  try {
    dispatch({type: "USER_UPDATE_REQUEST"});

    const { userLogin: { userInfo } } = getState();
 
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }

  const { data } =   await axios.put(`/api/users/${userData._id}`, userData,  config);
    
    dispatch({type: "USER_UPDATE_SUCCESS"});
   
   
  
  }
  catch(err) {

    dispatch({type: "USER_UPDATE_FAILED", payload: err.response && err.response.data.message ? err.response.data.message : err.message });
    console.log(err.response, err.response.data.message , err.message)
  }
}