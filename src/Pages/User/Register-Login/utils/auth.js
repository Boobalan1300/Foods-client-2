

import axios from 'axios';

const backendUrl = `${process.env.REACT_APP_BACKEND_URL}`;

// console.log('Backend URL:', backendUrl);


async function signUp(email, password) {
  try {
    const response = await axios.post(`${backendUrl}/api/auth/signup`, { email, password }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    
    throw error; 
  }
}

async function login(email, password) {
  try {
    const response = await axios.post(`${backendUrl}/api/auth/login`, { email, password }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
   
    throw error;
  }
}


export { signUp, login };
