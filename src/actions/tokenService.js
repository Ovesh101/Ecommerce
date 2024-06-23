// tokenService.js

const storeToken = (token) => {
    const now = new Date();
    const expiration = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000); // 1 day expiry
    localStorage.setItem('token', JSON.stringify({ value: token, expiresAt: expiration.getTime() }));
  };
  
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    if (!tokenString) return null;
  
    const tokenData = JSON.parse(tokenString);
    const { value, expiresAt } = tokenData;
    const now = new Date().getTime();
  
    if (now > expiresAt) {
      localStorage.removeItem('token'); // Remove expired token
      return null;
    }
  
    return value;
  };
  
  const removeToken = () => {
    localStorage.removeItem('token');
  };
  
  export { storeToken, getToken, removeToken };
  