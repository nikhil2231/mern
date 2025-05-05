
import React, { useState } from 'react';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components2put/Home';
import ProductPage from './components2put/ProductPage';
import CartPage from './components2put/CartPage';
import NotFoundPage from './components2put/NotFoundPage';
import LoginPage from './components2put/LoginPage';
import ShippingPage from './components2put/ShippingPage';
import DetailsPage from './components2put/DetailsPage';
import RegisterPage from './components2put/RegisterPage';
import PaymentPage from './components2put/PaymentPage';
import PlaceOrderPage from './components2put/PlaceOrderPage';
import OrderScreen from './components2put/OrderScreen';
import UsersListPage from './components2put/UsersListPage';
import UserEditPage from './components2put/UserEditPage';
import ProductListPage from './components2put/ProductListPage';
import ProductEditPage from './components2put/ProductEditPage';
import OrdersListPage from './components2put/OrderListPage';
import UserOrderPage from './components2put/UserOrderPage';
function App() {
  const [search2 ,setSearch2] = useState();
  return (
    <BrowserRouter>
      <Header setSearch={setSearch2}/>
      <main className='py-3  d-flex flex-column'>
        <Container className='flex-grow-1 flex-shrink-1 flex-1'>
          <Routes>
            <Route path={'/'} index={true} element={<Home search={search2} />} />
            <Route path={'/products/:id'} element={<ProductPage />} />
            <Route path={'/register'} element={<RegisterPage/>}/>
            <Route path={'/login'} element={<LoginPage/>}/>
            <Route path={'/profile'} element={<DetailsPage/>}/>
            <Route path={'/cart'} element={<CartPage />} />
            <Route path={'/cart/:id'} element={<CartPage />} />
            <Route path={'/shipping'} element={<ShippingPage/>}/>
            <Route path={'/myorders'} element={<UserOrderPage/>}/>
            <Route path={'/payment'}  element={<PaymentPage/>}/>
            <Route path={'/placeorder'} element={<PlaceOrderPage/>}/> 
            <Route path={'/order/:id'} element={<OrderScreen/>}/>
            <Route path={'/admin/userlist'} element={<UsersListPage/>}/>
            <Route path={'/admin/user/:id/edit'} element={<UserEditPage/>}/>
            <Route path={'/admin/productlist'} element={<ProductListPage/>}/>
            <Route path={'/admin/product/:id/edit'} element={<ProductEditPage/>}/>
            <Route path={'/admin/order'} element={<OrdersListPage/>}/>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          </Container>
          <Footer />
        
      </main>
     
    </BrowserRouter>
  );
}

export default App;



