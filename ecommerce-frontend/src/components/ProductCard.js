// src/components/ProductCard.js
import React, { useState } from 'react';
import { Card, Button, Toast, ToastContainer } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';

function ProductCard({ product }) {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');

  const handleAddToCart = async () => {
    setAdding(true);
    
    try {
      console.log('Adding product to cart:', product.id); // للتشخيص
      const result = await addToCart(product.id, 1);
      
      console.log('Add to cart result:', result); // للتشخيص
      
      if (result.success) {
        setToastMessage(t('Product added to cart successfully!'));
        setToastVariant('success');
        setShowToast(true);
      } else {
        setToastMessage(result.error || t('Failed to add product to cart'));
        setToastVariant('danger');
        setShowToast(true);
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      setToastMessage(t('Failed to add product to cart'));
      setToastVariant('danger');
      setShowToast(true);
    } finally {
      setAdding(false);
    }
  };

  return (
    <>
      <Card className="h-100 product-card">
        {product.image ? (
          <Card.Img
            variant="top"
            src={product.image}
            alt={product.name}
            style={{ height: '200px', objectFit: 'cover' }}
          />
        ) : (
          <div 
            className="bg-light d-flex align-items-center justify-content-center"
            style={{ height: '200px' }}
          >
            <i className="fas fa-image fa-3x text-muted"></i>
          </div>
        )}
        
        <Card.Body className="d-flex flex-column">
          <small className="text-muted">{product.category_name}</small>
          <Card.Title className="h6 fw-bold">{product.name}</Card.Title>
          
          <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="h6 text-dark mb-0">${product.price}</span>
              <small className="text-muted">
                {t('Stock')}: {product.stock}
              </small>
            </div>
            
            <div className="d-grid gap-2">
              <Button 
                as={Link} 
                to={`/products/${product.slug}`} 
                variant="outline-dark" 
                size="sm"
              >
                <i className="fas fa-eye me-1"></i>
                {t('View Details')}
              </Button>
              <Button 
                onClick={handleAddToCart}
                variant="dark" 
                size="sm"
                disabled={product.stock === 0 || adding}
              >
                {adding ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-1"></span>
                    {t('Adding...')}
                  </>
                ) : (
                  <>
                    <i className="fas fa-cart-plus me-1"></i>
                    {t('Add to Cart')}
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg={toastVariant}
        >
          <Toast.Body className={toastVariant === 'success' ? 'text-white' : 'text-white'}>
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default ProductCard;