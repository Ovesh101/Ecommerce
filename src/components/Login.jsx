import  { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import   FormRow  from './FormRow';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (password.length < 3) {
      toast.error("Password is too short");
      setIsSubmitting(false);
      return;
    }

    try {
     const response=  await axios.post(`http://localhost:3000/api/v1/login`, { email, password });
     console.log("response"  ,response);
     localStorage.setItem("token" , response.data.token)
      toast.success("Login Successfully");
      navigate('/product');
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token){
      navigate('/product');
    }
  } , [])

  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg transform transition-all hover:scale-105 duration-300 ease-in-out">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-4">
          
        </div>
        <h4 className="text-3xl font-bold text-center text-gray-800">Login</h4>
        <FormRow
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          labelText="Email"
          className="mt-4"
        />
        <FormRow
          type='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          labelText="Password"
          className="mt-4"
        />
        <button
          type='submit'
          className='w-full px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 transition duration-300'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
        <p className="text-center text-gray-600">
          Not a member yet? <Link to='/register' className='text-blue-500 hover:underline'>Register</Link>
        </p>
      </form>
    </div>
  </div>
    
  );
};

export default Login;
