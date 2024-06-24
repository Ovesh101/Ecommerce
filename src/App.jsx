
import {   Route, Routes } from 'react-router-dom';
import Login from './components/Login'; // Adjust the path as necessary
import Register from './components/Register'; // Adjust the path as necessary
import ProductLayout from './pages/ProductLayout';
import ProductDetail from './pages/ProductDetail';
import ViewCart from './pages/ViewCart';
import PaymentForm from './pages/PaymentForm';
import Order from './pages/Order';
import OrderModel from './pages/OrderModel';


function App() {
  return (
    <Routes>

        <Route path="/" element={<Login />} /> {/* Default home page as login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product" element={<ProductLayout />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/product/view-cart" element={<ViewCart />} />
        <Route path="/product/payment-form/:id" element={<PaymentForm />} />
        <Route path="/product/payment-form/order" element={<OrderModel />} />
       
      
    </Routes>
  );
}

export default App;
