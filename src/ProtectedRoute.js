

import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const ProtectedRoute = ({ element: Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await axios.get(`${backendUrl}/api/check-auth`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setIsAuthenticated(response.data.valid);
      } catch (error) {
        console.error('Error checking auth:', error.message);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; 
  }

  return isAuthenticated ? Component : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
