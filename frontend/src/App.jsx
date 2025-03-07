import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Contactus from './Pages/Contactus';
import Aboutus from './Pages/Aboutus';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import SearchResults from './Pages/SearchResults';
import Login from './Pages/Login';
import Payment from './Pages/Payment';
import Signup from './Pages/SignUp';
import Confirmation from './Pages/confirmation';
import AddressPage from './Pages/AddressPage';
import MyOrdersPage from './Pages/orders';
import OrderDetail from './Pages/OrderDetail';
import AdminDashboard from './Pages/AdminDashboard';
import AdminOrderDetails from './Pages/adminOrderDetails';

function App() {
  return (
    <div>
      <Router>
       <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/contact" element={<Contactus />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/confirmation' element={<Confirmation />} />
          <Route path='/address' element={<AddressPage />} />
          <Route path='/my-orders' element={<MyOrdersPage />} />
          <Route path="/order/:orderId" element={<OrderDetail />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/orders/:orderId" element={<AdminOrderDetails />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
