import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from "../utils/apiUtils"; // Adjust path as per your project structure
import { setCartItems  } from '../features/cart/cartSlice';
import { fetchProductsStart, fetchProductsSuccess, removeFromCart, fetchProductsFailure , incrementQuantity , decrementQuantity } from '../features/product/productSlice';

import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';

const ViewCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const products = useSelector(state => state.product.products);
  const loading = useSelector(state => state.product.loading);
  
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await fetchUser(); // Implement your fetchUser function from API
        dispatch(setCartItems(user.cartItems));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [dispatch]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(fetchProductsStart());
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Fetch product details for each productId in cartItems
        const productRequests = cartItems.map(productId =>
          axios.get(`http://localhost:3000/api/v1/product/${productId}`, config)
          .then(response => ({ ...response.data.SingleProduct, quantity:1 }))
        );

        const productsData = await Promise.all(productRequests);
        console.log("Products" , productsData);
        dispatch(fetchProductsSuccess(productsData));
      } catch (error) {
        console.error('Error fetching products:', error);
        dispatch(fetchProductsFailure());
      }
    };

    if (cartItems.length > 0) {
       
      fetchProducts();
    }
  }, [dispatch, cartItems]);

  const handleIncrement = (productId) => {
    dispatch(incrementQuantity({ productId }));
  };

  const handleDecrement = (productId) => {
    dispatch(decrementQuantity({ productId }));
  };

  const handleRemove = (productId) => {
    // Remove product from cart in Redux store
    dispatch(removeFromCart({ productId }));

    // Remove product from cart in database
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:3000/api/v1/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response => {
      console.log('Product removed from cart in database:', response.data);
    })
    .catch(error => {
      console.error('Error removing product from cart in database:', error);
    });
  };

//   Handle Checkout......

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Prepare cart items for checkout
      const checkoutData = {
        cartItems: cartItems.map(item => ({
          productId: item,
          quantity: products.find(product => product._id === item)?.quantity || 1 // Assuming quantity is bound to products
        }))
      };

      // Make POST request to backend for checkout
      const response = await axios.post('http://localhost:3000/api/v1/checkout', checkoutData, config);
      console.log('Checkout successful:', response.data);
      const id = response.data.cart._id
     

      // Optionally, clear the cart in Redux store after successful checkout
      dispatch(setCartItems([])); // Assuming setCartItems([]) clears the cart
      navigate(`/product/payment-form/${id}`)

    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

 

  const calculateTotal = () => {
    const total = products.reduce((total, product) => {
      // Assuming each product has a price and quantity field
      const itemTotal = product.price * (product.quantity || 1);
      return total + itemTotal;
    }, 0);
  
    return total.toFixed(2);
  };

  const renderCartItems = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (products.length === 0) {
        
      return <p>Your cart is empty</p>;
    }

    

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
          {products.map(product => (
            <div key={product._id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4">
              <div className="flex items-center">
                <img src={product.image} alt={product.title} className="w-20 h-20 object-cover rounded-lg mr-4" />
                <div>
                  <h3 className="font-bold">{product.title}</h3>
                  <p className="text-gray-600">${product.price}</p>
                  <button
                    onClick={() => handleRemove(product._id)}
                    className="bg-lightblue-500 hover:bg-lightblue-700 text-blue-400 font-bold py-2 px-4 rounded"
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleDecrement(product._id)}
                  className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-lg"
                >
                  -
                </button>
                <span>{product.quantity || 1}</span>
                <button
                  onClick={() => handleIncrement(product._id)}
                  className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-lg"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-1">
          <h2 className="text-2xl font-bold mb-4">Total</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">Total: ${calculateTotal()}</h3>
          </div>
          <button
              onClick={handleCheckout}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Checkout
            </button>
          
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8">
      
      {renderCartItems()}
    </div>
  );
};

export default ViewCart;
