

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './Pages/User/Pages/Landingage';
import AdminComponent from './Pages/Admin/admin';
import AllProductsComponent from './Pages/User/Pages/AllProducts';
import CartPage from './Pages/User/Pages/CartPage';
import PaymentPage from './Pages/User/Pages/Payment';
import OrderList from './Pages/User/Pages/OrderList';
import LoginPage from './Pages/User/Register-Login/Login';
import SignUpPage from './Pages/User/Register-Login/Regiter';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<ProtectedRoute element={<AdminComponent />} />} />
        <Route path="/allProducts" element={<ProtectedRoute element={<AllProductsComponent />} />} />
        <Route path="/cartPage" element={<ProtectedRoute element={<CartPage />} />} />
        <Route path="/payment" element={<ProtectedRoute element={<PaymentPage />} />} />
        <Route path="/orderList" element={<ProtectedRoute element={<OrderList />} />} />
      </Routes>
    </Router>
  );
}

export default App;




