export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {

    
      case 'CART_ADD_ITEM': {
        const items = action.payload;
        const existItem = state.cartItems.find(item => item.product === items.product);
  
        if (existItem) {
          return {
            ...state,
            cartItems: state.cartItems.map(x => x.product === items.product ? items : x )
          }
        } else {
          return {
            ...state,
            cartItems : [...state.cartItems, items]
          }
        }
      }
      case 'Cart_Remove_Item': {
        return {
          ...state,
          cartItems: state.cartItems.filter(item => item.product !== action.payload)
        }

      }
      case "CART_SAVE_SHIPPING_ADDRESS": {
        return {
          ...state, 
          shippingAddress: action.payload
        }
      }
    
      case "CART_SAVE_PAYMENT_METHOD": {
        return {
          ...state,
          paymentMethod: action.payload
        }
      }

      case "CART_RESET" :  return {
        ...state,
        cartItems : []
      }
      
      
      default:
        return state;
    }
  };
  