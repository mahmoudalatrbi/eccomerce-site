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
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    try {
      setError(null);
      console.log('Fetching cart...'); // للتشخيص
      const response = await cartAPI.get();
      console.log('Cart fetched:', response.data); // للتشخيص
      setCart(response.data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      setError(error.message);
      // في حالة فشل جلب البيانات، قم بتعيين سلة فارغة
      setCart({
        items: [],
        total_price: 0,
        items_count: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      setError(null);
      console.log('Adding to cart - Product ID:', productId, 'Quantity:', quantity); // للتشخيص
      
      const response = await cartAPI.addItem(productId, quantity);
      console.log('Add to cart response:', response); // للتشخيص
      
      setCart(response.data);
      return { success: true };
    } catch (error) {
      console.error('Failed to add to cart:', error);
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      setError(null);
      console.log('Updating cart item - Product ID:', productId, 'Quantity:', quantity);
      
      const response = await cartAPI.updateItem(productId, quantity);
      console.log('Update cart response:', response);
      
      setCart(response.data);
      return { success: true };
    } catch (error) {
      console.error('Failed to update cart item:', error);
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setError(null);
      console.log('Removing from cart - Product ID:', productId);
      
      const response = await cartAPI.removeItem(productId);
      console.log('Remove from cart response:', response);
      
      setCart(response.data);
      return { success: true };
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const clearCart = async () => {
    try {
      setError(null);
      const response = await cartAPI.clear();
      setCart(response.data);
      return { success: true };
    } catch (error) {
      console.error('Failed to clear cart:', error);
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const value = {
    cart,
    loading,
    error,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
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