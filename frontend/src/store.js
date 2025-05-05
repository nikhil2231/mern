
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { ProductReviewReducer, productListReducer ,productCreateReducer, productDetailReducer, productDeleteReducer, productUpdateReducer} from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';
import { userReducer, userRegisterReducer, userDetailsReducer, userProfileUpdateReducer, userListReducer, userDeleteReducer, userUpdateReducer,  } from './reducers/userReducer';
import { orderReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer, orderListReducer, getUsersOrder, orderDeliveredReducer } from './reducers/orderReducer';


const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];


const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')): {};

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')): null;
console.log(paymentMethodFromStorage);

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
  productUpdate: productUpdateReducer,
  cart: cartReducer,
  userLogin: userReducer,
  userRegister: userRegisterReducer,
  userDetail: userDetailsReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdateProfile: userProfileUpdateReducer,
  orderCreate: orderReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMyList: orderListMyReducer,
  orderList: orderListReducer,
  userUpdate: userUpdateReducer,
  productDeleteReducer: productDeleteReducer,
  productCreate: productCreateReducer,
  usersOrder : getUsersOrder,
  orderDeliver: orderDeliveredReducer,
  productReview: ProductReviewReducer
});



const initialState = { 
  cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage, paymentMethod: paymentMethodFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
  
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
