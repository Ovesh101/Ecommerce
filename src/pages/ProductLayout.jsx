// ProductLayout.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

const ProductLayout = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleAddToCart = async (product) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      };

      const response = await axios.post(
        'http://localhost:3000/api/v1/update-cart',
        { productId: product._id },
        config
      );

      if (response.status === 200) {
        setUser(response.data.user);
        toast.success(response.data.msg);
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'Something went wrong');
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get('http://localhost:3000/api/v1/product', config);
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        toast.error(error?.response?.data?.msg || 'Something went wrong');
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get('http://localhost:3000/api/v1/me', config);
        setUser(response.data.user);
      } catch (error) {
        toast.error(error?.response?.data?.msg || 'Something went wrong');
      }
    };

    fetchProducts();
    fetchUser();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <Navbar cartCount={user ? user.cartItems.length : 0} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product._id} className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <img className="w-full h-56 object-cover object-center" src={product.image} alt={product.title} />
            <div className="p-4">
              <h2
                className="text-gray-900 font-bold text-xl mb-2 cursor-pointer"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                {product.title}
              </h2>
              <p className="text-gray-700 text-base mb-2">${product.price}</p>
              <button
                className={`w-full ${user && user.cartItems.includes(product._id) ? 'bg-green-500' : 'bg-blue-500'} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
                onClick={() => handleAddToCart(product)}
              >
                {user && user.cartItems.includes(product._id) ? 'Added' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <Footer />
    </div>
    
  );
};

export default ProductLayout;
