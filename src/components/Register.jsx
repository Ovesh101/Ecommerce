import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import  FormRow from './FormRow';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post('http://localhost:3000/api/v1/register', formData);
      toast.success('Registration Successful');
      navigate('/login');
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg transform transition-all hover:scale-105 duration-300 ease-in-out">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center">
          
          <h4 className="text-2xl font-bold text-gray-800">Register</h4>
        </div>
        <FormRow
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          labelText="Name"
          className="mt-4"
        />
        <FormRow
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          labelText="Email"
          className="mt-4"
        />
        <FormRow
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          labelText="Password"
          className="mt-4"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 transition duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        <p className="text-center text-gray-600">
          Already a member?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  </div>
    
  );
};

export default Register;
