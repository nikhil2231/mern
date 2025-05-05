
 

 const initialState = {
    loading: false,
    userInfo: null,
    error: null
  };
export const userReducer = (state =initialState, action) => {
switch(action.type) {
    case 'USER_LOGIN_REQUEST': 
    return {loading: true }
    case "USER_LOGIN_SUCCESS": 
    return {loading: false, userInfo: action.payload}
    case 'USER_LOGIN_FAIL' :
        return {loading: false , error: action.payload }
        case "USER_LOGOUT": return {}
        default: 
            return state
        
}

}



export const userRegisterReducer = (state =initialState, action) => {
  switch(action.type) {
      case 'USER_REGISTER_REQUEST': 
      return {loading: true }
      case "USER_REGISTER_SUCCESS": 
      return {loading: false, userInfo: action.payload}
      case 'USER_REGISTER_FAIL' :
          return {loading: false , error: action.payload }
          case "USER_LOGOUT": return {}
          default: 
              return state
          
  }
  
  }
  export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case "USER_DETAILS_REQUEST":
        return { ...state, loading: true };
      case "USER_DETAILS_SUCCESS":
        return {
          loading: false,
          user: action.payload
        };
      case "USER_DETAILS_FAIL":
        return {
          loading: false,
          error: action.payload
        };

        case "USER_DETAILS_RESET" : {
          return { user: {}}
        }
      default:
        return state;
    }
  };
  

  export const userProfileUpdateReducer = (state = { loading: false, success: false, userInfo: null, error: null }, action) => {
    switch (action.type) {
      case "USER_UPDATE_PROFILE_REQUEST":
        return { loading: true, success: false, userInfo: null, error: null };
      case "USER_UPDATE_PROFILE_SUCCESS":
        return {
          loading: false,
          success: true,
          userInfo: action.payload,
          error: null
        };
      case "USER_UPDATE_PROFILE_FAIL":
        return {
          loading: false,
          success: false,
          userInfo: null,
          error: action.payload
        };
      case "USER_UPDATE_PROFILE_RESET":
        return {
         
        };
      default:
        return state;
    }
  };
  

  export const userListReducer = (state = { loading: false, users: [] }, action) => {
    switch (action.type) {
      case 'USER_LIST_REQUEST':
        return {
          loading: true,
          users: []
        };
      case 'USER_LIST_SUCCESS':
        return {
          loading: false,
          users: action.payload
        };
      case 'USER_LIST_FAILED':
        return {
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export const userDeleteReducer = (state = { loading: false, }, action) => {
    switch (action.type) {
      case 'USER_DELETE_REQUEST':
        return {
          loading: true,
        };
      case 'USER_DELETE_SUCCESS':
        return {
          loading: false,
          success: true,
        };
      case 'USER_DELETE_FAILED':
        return {
          loading: false,
          error: action.payload
        };

      case 'USER_DELETE_RESET': return {
        loading: false,
        success: false, 
        error: false
      }
      default:
        return state;
    }
  };


  export const userUpdateReducer = (state = { loading: false, }, action) => {
    switch (action.type) {
      case 'USER_UPDATE_REQUEST':
        return {
          loading: true,
        };
      case 'USER_UPDATE_SUCCESS':
        return {
          loading: false,
          success: true
        };
      case 'USER_UPDATE_FAILED':
        return {
          loading: false,
          error: action.payload
        };

      case 'USER_UPDATE_RESET': return {
      user: {}
      }
      default:
        return state;
    }
  };