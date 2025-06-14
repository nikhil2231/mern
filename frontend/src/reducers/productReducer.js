export const productListReducer = (state = { products: [] }, action) => {
switch(action.type) {
    case 'PRODUCT_LIST_REQUEST':
        return { loading: true, products: []};

    case 'PRODUCT_LIST_SUCCESS': 
    return { loading: false, products: action.payload};

    case 'PRODUCT_LIST_FAIL': 
    return { loading: false, error: action.payload}

   default:
     return state;
}
}


export const productDetailReducer = (state = { product: { reviews: []}, loading: false, error:false, hasProduct: false }, action) => {
    switch(action.type) {
        case 'PRODUCT_DETAILS_REQUEST':
            return { loading: true, ...state, hasProduct: false};
    
        case 'PRODUCT_DETAILS_SUCCESS': 
        return { loading: false, product: action.payload, hasProduct: true};
    
        case 'PRODUCT_DETAILS_FAIL': 
        return { loading: false, error: action.payload}
    
       default:
         return state;
    }
    }

    export const productDeleteReducer = (state={loading: false,}, action)=> {
      
        switch(action.type) {
           case 'PRODUCT_DELETE_REQUEST': {
            return {
                loading: true
            }
           }
           case 'PRODUCT_DELETE_SUCCESS' : return {
            loading: false,
            success: true
           }

           case 'PRODUCT_DELETE_FAIL': 
           return { loading: false, error: action.payload}
           

           case 'PRODUCT_DELETE_RESET' : return {
            loading: false,
            success: false,
            error: false

           } 
       default: return state;
         



        }



    }


    export const productCreateReducer = (state={loading: false,}, action)=> {
      
        switch(action.type) {
           case 'PRODUCT_CREATE_REQUEST': {
            return {
                loading: true
            }
           }
           case 'PRODUCT_CREATE_SUCCESS' : return {
            loading: false,
            success: true,
            product: action.payload
           }

           case 'PRODUCT_CREATE_FAIL': 
           return { loading: false, error: action.payload}
           

           case 'PRODUCT_CREATE_RESET' : return {
            

           } 
       default: return state;
         



        }



    }


    export const productUpdateReducer = (state={ product: {}}, action) => {
        switch (action.type) {
            case 'PRODUCT_UPDATE_REQUEST': {
                return {
                    loading: true
                }

            }
            case 'PRODUCT_UPDATE_SUCCESS': {
                return {
                    loading: false,
                    success: true,
                    product: action.payload
                }

            }

            case 'PRODUCT_UPDATE_FAIL' : {
                return {
                    loading: false,
                    success: false,
                    error: action.payload
                }

            }
            case 'PRODUCT_UPDATE_RESET' : {
                return {
                    product: {}
                }
            }
            default: return state;

        }

    }

    export const ProductReviewReducer = function (state = { loading: false, error: false , success: false}, action) {
             switch(action.type) { 
                case 'PRODUCT_REVIEW_REQUEST': return  {
                    loading: true,
                }
                case 'PRODUCT_REVIEW_SUCCESS' : return {
                    loading: false,
                    success: true
                }
                case 'PRODUCT_REVIEW_FAILED': return {
                    error: true,
                    loading: false
                }

                case 'PRODUCT_REVIEW_RESET' : return {
                    
                }
                default: return state;

             }
    }