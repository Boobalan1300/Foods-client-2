



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import img33 from '../Images/img36.jpg'

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const ProductsComponent = () => {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [addedItems, setAddedItems] = useState(new Set());
  const [loadingFoodId, setLoadingFoodId] = useState(null); 

  const handleAuthError = (status) => {
    if (status === 401 || status === 403) {
      console.error('Authorization error: Token expired or invalid');
      navigate('/login');
    }
  };

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch(`${backendUrl}/api/foods`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          handleAuthError(response.status);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setFoods(data);
        } else {
          console.error('Unexpected response format:', data);
        }
      } catch {
        navigate('/login');
      }
    };

    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch(`${backendUrl}/api/cartitems`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          handleAuthError(response.status);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setAddedItems(new Set(data.map(item => item.foodId)));
        } else {
          console.error('Unexpected response format:', data);
        }
      } catch {
        navigate('/login');
      }
    };

    fetchFoods();
    fetchCartItems();
  }, [navigate]);

  const handleAddToCart = async (food) => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('email');

    setLoadingFoodId(food.foodId); 

    try {
      const response = await fetch(`${backendUrl}/api/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: userEmail,
          food: {
            foodId: food.foodId,
            name: food.name,
            image: food.image,
            cost: food.cost,
            quantity: 1,
          },
        }),
      });

      if (!response.ok) {
        handleAuthError(response.status);
        const errorDetails = await response.json();
        console.error('Failed to add item to cart:', errorDetails.message);
        throw new Error(errorDetails.message || 'Failed to add item to cart');
      }

      const updatedCart = await response.json();
      if (Array.isArray(updatedCart.cartItems)) {
        setAddedItems(new Set(updatedCart.cartItems.map(item => item.foodId)));
      } else {
        console.error('Unexpected response format:', updatedCart);
      }
    } catch {
      navigate('/login');
    } finally {
      setLoadingFoodId(null);
    }
  };

  return (
    <>
      <div className="container">
        <div className='custom-margin-sm'>
          <div>
            <h2 className='text-center my-5'> Featured <span className='text-muted'> Foods</span></h2>
          </div>
          <div className="row custom-horizontal-sm">
            {foods.slice(0, 8).map((food) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-12 mb-4" key={food.foodId}>
                <div className="card shadow position-relative card-width" style={{ minHeight: '420px' }}>
                  <div className='text-center col-sm-12 col-6'>
                    <img 
                      src={food.image} 
                      className="img-thumbnail " 
                      alt={food.name} 
                      style={{ width: '250px', height: '230px' }} 
                    />
                  </div>
                  <div className="card-body col-sm-12 col-6">
                    <h5 className="card-title">{food.name}</h5>
                    <p className="card-text">Cost: Rs.{food.cost}</p>
                    <div>
                      <button
                        className="btn btn-success custom-btn"
                        onClick={() => handleAddToCart(food)}
                        disabled={addedItems.has(food.foodId) || loadingFoodId === food.foodId} // Disable while adding
                      >
                        {loadingFoodId === food.foodId
                          ? "Adding..."
                          : addedItems.has(food.foodId) 
                          ? "Added" 
                          : "Add to Cart"
                        }
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsComponent;
