const initialState = {
    loading: false,
    success: null,
    order: null,
    error: null,
}



export const orderReducer = (state={initialState}, action)=> {
  switch(action.type) {
    case 'ORDER_CREATE_REQUEST': return {
        loading: true,
       
    }
    case 'ORDER_CREATE_SUCCESS': return {
        loading: false,
        success: true,
        order: action.payload
    }

    case 'ORDER_CREATE_FAILED' : return {
        loading: false,
        success: false,
        error: action.payload
    }

    
    case 'ORDER_RESET' : return {
      ...state,
      loading: true
  }


    default: return state;


  }


}


export const orderDetailsReducer = (state= { success: false, loading: true, order: [], shippingAddress: {} }, action)=> {
  switch(action.type) {
    case 'ORDER_DETAILS_REQUEST': return {
      ...state,
        loading: true
    }
    case 'ORDER_DETAILS_SUCCESS': return {
        loading: false,
        success: true,
        order: action.payload
    }

    case 'ORDER_DETAILS_FAILED' : return {
        loading: false,
        success: false,
        error: action.payload
    } 
   
    default: return state;


  }


}

export const orderPayReducer = (state={}, action)=> {
  switch(action.type) {
    case "ORDER_PAY_REQUEST": return {
      loading: true
    }
    case "ORDER_PAY_SUCCESS" : return {
      loading: false,
      success: true,
    }

    case "ORDER_PAY_FAILED": return {
      loading: false, 
      error: action.payload,
    }

    case "ORDER_PAY_RESET" : return {

    }
    
    default: return state

  }

}



export const orderListMyReducer = (state={ orders: [] }, action)=> {
  switch(action.type) {
    case "ORDER_LIST_MY_REQUEST": return {
      loading: true
    }
    case "ORDER_LIST_MY_SUCCESS" : return {
      loading: false,
      orders: action.payload
    }

    case "ORDER_LIST_MY_FAILED": return {
      loading: false, 
      error: action.payload,
    }
    case 'ORDER_LIST_RESET' : return {
      orders: []
    }
    default: return state

  }

}
 
 

// this is for the admin to check every order list on the database from the frontend

export const orderListReducer = (state = { orders: [] }, action ) => {
  switch(action.type) {
    case 'ORDER_LIST_REQUEST': {
      
      return {
        loading: true,
        orders: []
      }
    }
   
  case 'ORDER_LIST_SUCCESS' : {
    return {
      loading: false,
      orders: action.payload
    }
  }
case 'ORDER_LIST_FAILED' : {
  return {
    loading: false,
    error: action.payload
  }
}
default : {
  return state
}
}

}

export const getUsersOrder = (state = { orders: [] }, action ) => {
  switch(action.type) { 
    case 'MY_ORDER_REQUEST': return {
      loading: true,
    }

    case 'MY_ORDER_SUCCESS': return {
      loading: false, 
      orders: action.payload
    }

    case 'MY_ORDER_ERROR': return {
      loading: false,
      error: action.payload
    }
    default: return state
  

  }


}

export const orderDeliveredReducer = (state= {loading: false, success: null, error: null}, action) => {
  switch (action.type) {
    case 'ORDER_DELIVER_REQUEST': return {
      loading: true
    }

    case 'ORDER_DELIVER_SUCCESS': return {
      loading: false,
      success: true
      
    }

    case 'ORDER_DELIVER_FAILED': return {
      loading: false,
      success: false,
      error: action.payload
    }

    case 'ORDER_DELIVER_RESET': return {
      loading: false,
      success: false,
      error: null
    }

    default : return state;

    


  }

}