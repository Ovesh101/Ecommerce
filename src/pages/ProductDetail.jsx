// ProductDetail.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/NavBar';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const handleAddToCart = async (product) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post(
        'http://localhost:3000/api/v1/update-cart',
        { productId: product._id },
        config
      );

      if (response.status === 200) {
        const updatedUser = response.data.user;
        setUser(updatedUser);
        toast.success(response.data.msg);
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'Something went wrong');
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchProductAndUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Fetch product details
        const productResponse = await axios.get(`http://localhost:3000/api/v1/product/${id}`, config);
        console.log(productResponse);
        setProduct(productResponse.data.SingleProduct);

        // Fetch user details
        const userResponse = await axios.get('http://localhost:3000/api/v1/me', config);
        setUser(userResponse.data.user);

        setLoading(false);
      } catch (error) {
        toast.error(error?.response?.data?.msg || 'Something went wrong');
        setLoading(false);
      }
    };

    fetchProductAndUser();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <Navbar cartCount={user ? user.cartItems.length : 0} />
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img className="w-full h-96 object-cover object-center" src={product.image} alt={product.title} />
        <div className="p-4">
          <h2 className="text-gray-900 font-bold text-2xl mb-4">{product.title}</h2>
          <p className="text-gray-700 text-base mb-4">{product.description}</p>
          <p className="text-gray-900 text-xl mb-4">${product.price}</p>
          <button
            className={`w-full ${user && user.cartItems.includes(product._id) ? 'bg-green-500' : 'bg-blue-500'} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
            onClick={() => handleAddToCart(product)}
          >
            {user && user.cartItems.includes(product._id) ? 'Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
