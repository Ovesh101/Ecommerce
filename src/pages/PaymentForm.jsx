import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios'; // Import axios for making API calls
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    paymentMethod: 'cashOnDelivery',
  });
  const navigate = useNavigate();

  const {id} = useParams();

  const [isSubmitting, setIsSubmitting] = useState(false); // To manage submit button state
  const [error, setError] = useState(null); // To manage error state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      const response = await axios.post(`http://localhost:3000/api/v1/payment/${id}`, formData , config); // Replace with your actual API endpoint
      toast.success(response.data.message)
      console.log(response.data);
      navigate('/product/payment-form/order');
      // Handle success (e.g., redirect to a thank you page)
    } catch (error) {
        
      setError('There was an issue submitting your payment. Please try again.');
      toast.error(response.data.message)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Payment Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              Shipping Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Payment Method
            </label>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                name="paymentMethod"
                value="cashOnDelivery"
                checked={formData.paymentMethod === 'cashOnDelivery'}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-gray-700">Cash on Delivery</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="cheque"
                checked={formData.paymentMethod === 'cheque'}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-gray-700">Cheque</label>
            </div>
          </div>
          <button
            type="submit"
            className={`w-full ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Payment'}
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </motion.div>
    </div>
  );
};

export default PaymentForm;
