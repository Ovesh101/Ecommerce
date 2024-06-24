import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderModel = () => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(true);
  const navigate = useNavigate();

 



  return (
    <div className="relative">
      {/* Your main application content */}
    
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg animate-fade-in max-w-md w-full">
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">Order Confirmed!</h2>
            <p className="text-lg text-gray-700 mb-4 text-center">Thank you for your order. Your items will be shipped shortly.</p>
            <div className="flex justify-center">
              <button
                onClick={
                    () => {
                        navigate("/product")
                        setIsOrderModalOpen(false)
                    }
                }
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mr-2"
              >
                Continue Shopping
              </button>
            
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderModel;
