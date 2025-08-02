// src/contexts/CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from '../services/api';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const response = await cartAPI.get();
      setCart(response.data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await cartAPI.addItem(productId, quantity);
      setCart(response.data);
      return { success: true };
    } catch (error) {
      console.error('Failed to add to cart:', error);
      return { success: false, error: error.message };
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      const response = await cartAPI.updateItem(itemId, quantity);
      setCart(response.data);
      return { success: true };
    } catch (error) {
      console.error('Failed to update cart item:', error);
      return { success: false, error: error.message };
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const response = await cartAPI.removeItem(itemId);
      setCart(response.data);
      return { success: true };
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const value = {
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    refreshCart: fetchCart,
    cartItemsCount: cart?.items_count || 0,
    cartTotal: cart?.total_price || 0
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};