// src/App.js (محدث)
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CartProvider } from './contexts/CartContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import './App.css';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // تطبيق الاتجاه المحفوظ
    const savedLang = localStorage.getItem('language') || 'en';
    document.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLang;
  }, []);

  useEffect(() => {
    // تغيير اتجاه الصفحة حسب اللغة
    document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <CartProvider>
      <div className="App">
        <Navigation />
        <main className="min-vh-100">
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;