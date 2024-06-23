import axios from 'axios';

export const fetchUser = async () => {
  try {
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    if (!token) {
      throw new Error('Token not found');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get('http://localhost:3000/api/v1/me', config); // Adjust URL as per your backend API
    return response.data.user; // Assuming the response contains a 'user' object with cartItems
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error; // Handle or rethrow the error as needed
  }
};
