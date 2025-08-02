// src/pages/Cart.js (محدث)
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';

function Cart() {
  const { t } = useTranslation();
  const {
    cart,
    loading,
    updateCartItem,
    removeFromCart,
    cartItemsCount,
    cartTotal
  } = useCart();
  
  const [updating, setUpdating] = useState({});

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setUpdating(prev => ({ ...prev, [itemId]: true }));
    await updateCartItem(itemId, newQuantity);
    setUpdating(prev => ({ ...prev, [itemId]: false }));
  };

  const handleRemoveItem = async (itemId) => {
    if (!window.confirm(t('Are you sure you want to remove this product?'))) {
      return;
    }

    setUpdating(prev => ({ ...prev, [itemId]: true }));
    await removeFromCart(itemId);
    setUpdating(prev => ({ ...prev, [itemId]: false }));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="fw-bold">
          <i className="fas fa-shopping-cart me-2 text-primary"></i>
          {t('Shopping Cart')}
        </h2>
        <Button as={Link} to="/products" variant="outline-primary">
          <i className="fas fa-arrow-left me-2"></i>
          {t('Continue Shopping')}
        </Button>
      </div>

      {cart && cart.items && cart.items.length > 0 ? (
        <Row>
          {/* Cart Items */}
          <Col lg={8} className="mb-4">
            <Card className="border-0">
              <Card.Header className="bg-light">
                <h6 className="mb-0">
                  {t('Selected Items')} ({cartItemsCount})
                </h6>
              </Card.Header>
              <Card.Body className="p-0">
                {cart.items.map((item) => (
                  <div 
                    key={item.id}
                    className="d-flex align-items-center p-4 border-bottom"
                  >
                    {/* Product Image */}
                    <div className="me-3">
                      {item.product.image ? (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="rounded"
                          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        />
                      ) : (
                        <div 
                          className="bg-light rounded d-flex align-items-center justify-content-center"
                          style={{ width: '80px', height: '80px' }}
                        >
                          <i className="fas fa-image fa-2x text-muted"></i>
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow-1">
                      <h6 className="fw-bold mb-1">{item.product.name}</h6>
                      <small className="text-muted">{item.product.category.name}</small>
                      <div className="d-flex align-items-center mt-2">
                        <span className="fw-bold text-success me-3">
                          ${item.product.price}
                        </span>
                        <small className="text-muted">{t('per unit')}</small>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="me-3">
                      <div className="input-group" style={{ width: '130px' }}>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={updating[item.id] || item.quantity <= 1}
                        >
                          <i className="fas fa-minus"></i>
                        </Button>
                        <input
                          type="number"
                          className="form-control form-control-sm text-center"
                          value={item.quantity}
                          min="1"
                          max={item.product.stock}
                          onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                          disabled={updating[item.id]}
                        />
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          disabled={updating[item.id] || item.quantity >= item.product.stock}
                        >
                          <i className="fas fa-plus"></i>
                        </Button>
                      </div>
                    </div>

                    {/* Total Price */}
                    <div className="me-3 text-center">
                      <div className="fw-bold text-success">
                        ${item.total_price || (item.product.price * item.quantity)}
                      </div>
                      <small className="text-muted">{t('Total')}</small>
                    </div>

                    {/* Remove Button */}
                    <div>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={updating[item.id]}
                        title={t('Remove from cart')}
                      >
                        {updating[item.id] ? (
                          <span className="spinner-border spinner-border-sm"></span>
                        ) : (
                          <i className="fas fa-trash"></i>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          {/* Order Summary */}
          <Col lg={4}>
            <Card className="border-0 sticky-top" style={{ top: '20px' }}>
              <Card.Header className="bg-primary text-white">
                <h6 className="mb-0">
                  <i className="fas fa-calculator me-2"></i>
                  {t('Order Summary')}
                </h6>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-3">
                  <span>{t('Subtotal')}:</span>
                  <span className="fw-bold">${cartTotal}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>{t('Shipping')}:</span>
                  <span className="text-success fw-bold">{t('Free')}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>{t('Tax')}:</span>
                  <span>$0.00</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <h5 className="fw-bold">{t('Total')}:</h5>
                  <h5 className="fw-bold text-primary">${cartTotal}</h5>
                </div>

                <div className="d-grid gap-2">
                  <Button variant="success" size="lg">
                    <i className="fas fa-credit-card me-2"></i>
                    {t('Proceed to Checkout')}
                  </Button>
                  <Button as={Link} to="/products" variant="outline-primary">
                    <i className="fas fa-shopping-bag me-2"></i>
                    {t('Add More')}
                  </Button>
                </div>
              </Card.Body>

              {/* Shopping Features */}
              <Card.Footer className="bg-light">
                <Row className="text-center">
                  <Col xs={4}>
                    <i className="fas fa-truck text-success mb-1"></i>
                    <small className="d-block">{t('Fast Shipping')}</small>
                  </Col>
                  <Col xs={4}>
                    <i className="fas fa-shield-alt text-primary mb-1"></i>
                    <small className="d-block">{t('Secure Payment')}</small>
                  </Col>
                  <Col xs={4}>
                    <i className="fas fa-undo text-info mb-1"></i>
                    <small className="d-block">{t('Free Returns')}</small>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      ) : (
        /* Empty Cart */
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="border-0 text-center">
              <Card.Body className="py-5">
                <div className="mb-4">
                  <i className="fas fa-shopping-cart fa-5x text-muted"></i>
                </div>
                <h4 className="fw-bold mb-3">{t('Shopping Cart is Empty')}</h4>
                <p className="text-muted mb-4">
                  {t('There are no products in your shopping cart')}
                </p>
                <div className="d-grid gap-2">
                  <Button as={Link} to="/products" variant="primary" size="lg">
                    <i className="fas fa-store me-2"></i>
                    {t('Start Shopping Now')}
                  </Button>
                  <Button as={Link} to="/" variant="outline-primary">
                    <i className="fas fa-home me-2"></i>
                    {t('Back to Home')}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Cart;