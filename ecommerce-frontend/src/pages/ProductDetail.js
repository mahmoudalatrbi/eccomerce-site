// src/pages/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Badge } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { productsAPI, cartAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

function ProductDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      const response = await productsAPI.getById(slug);
      setProduct(response.data);
    } catch (err) {
      setError('Product not found');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    setAddingToCart(true);
    try {
      await cartAPI.addItem(product.id, quantity);
      // يمكن إضافة notification هنا
    } catch (err) {
      console.error('Failed to add to cart:', err);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  // src/pages/ProductDetail.js (تكملة)
  if (loading) return <LoadingSpinner />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container>
      <Row>
        {/* Product Image */}
        <Col md={6} className="mb-4">
          <Card className="border-0">
            {product.image ? (
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.name}
                className="rounded"
                style={{ height: '500px', objectFit: 'cover' }}
              />
            ) : (
              <div 
                className="bg-light rounded d-flex align-items-center justify-content-center"
                style={{ height: '500px' }}
              >
                <div className="text-center">
                  <i className="fas fa-image fa-5x text-muted mb-3"></i>
                  <p className="text-muted">{t('No image available')}</p>
                </div>
              </div>
            )}
          </Card>
        </Col>

        {/* Product Details */}
        <Col md={6}>
          <Card className="border-0 h-100">
            <Card.Body>
              {/* Category */}
              <div className="mb-3">
                <Link 
                  to={`/products?category=${product.category.id}`}
                  className="text-decoration-none"
                >
                  <Badge bg="primary" className="bg-opacity-10 text-primary px-3 py-2">
                    <i className="fas fa-tag me-1"></i>
                    {product.category.name}
                  </Badge>
                </Link>
              </div>

              {/* Product Name */}
              <h1 className="fw-bold mb-3">{product.name}</h1>

              {/* Rating (Static for now) */}
              <div className="mb-3">
                <div className="d-flex align-items-center">
                  <div className="me-2">
                    {[1,2,3,4,5].map(star => (
                      <i key={star} className="fas fa-star text-warning"></i>
                    ))}
                  </div>
                  <span className="text-muted">(125 {t('reviews')})</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <h6 className="fw-bold">{t('Description')}:</h6>
                <p className="text-muted">
                  {product.description || t('No description available for this product.')}
                </p>
              </div>

              {/* Price and Stock */}
              <Row className="mb-4">
                <Col xs={6}>
                  <h3 className="text-primary">${product.price}</h3>
                </Col>
                <Col xs={6} className="text-end">
                  {product.stock > 0 ? (
                    <Badge bg="success">
                      <i className="fas fa-check-circle me-1"></i>
                      {t('In Stock')} ({product.stock})
                    </Badge>
                  ) : (
                    <Badge bg="danger">
                      <i className="fas fa-times-circle me-1"></i>
                      {t('Out of Stock')}
                    </Badge>
                  )}
                </Col>
              </Row>

              {/* Add to Cart Form */}
              {product.available && product.stock > 0 ? (
                <Row className="mb-3">
                  <Col xs={4}>
                    <label className="form-label small">{t('Quantity')}:</label>
                    <input
                      type="number"
                      className="form-control"
                      value={quantity}
                      min="1"
                      max={product.stock}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                  </Col>
                  <Col xs={8} className="d-flex align-items-end">
                    <Button
                      variant="success"
                      className="w-100"
                      onClick={addToCart}
                      disabled={addingToCart}
                    >
                      {addingToCart ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          {t('Adding...')}
                        </>
                      ) : (
                        <>
                          <i className="fas fa-cart-plus me-2"></i>
                          {t('Add to Cart')}
                        </>
                      )}
                    </Button>
                  </Col>
                </Row>
              ) : (
                <Button variant="secondary" className="w-100 mb-3" disabled>
                  <i className="fas fa-times me-2"></i>
                  {t('Currently Unavailable')}
                </Button>
              )}

              {/* Additional Buttons */}
              <div className="d-grid gap-2">
                <Button variant="outline-danger">
                  <i className="fas fa-heart me-2"></i>
                  {t('Add to Wishlist')}
                </Button>
                <Button as={Link} to="/products" variant="outline-secondary">
                  <i className="fas fa-arrow-left me-2"></i>
                  {t('Back to Products')}
                </Button>
              </div>

              {/* Product Information */}
              <div className="mt-4">
                <Card className="bg-light border-0">
                  <Card.Body>
                    <h6 className="fw-bold mb-3">
                      <i className="fas fa-info-circle me-2"></i>
                      {t('Product Information')}
                    </h6>
                    <ul className="list-unstyled mb-0">
                      <li className="mb-2">
                        <i className="fas fa-truck text-success me-2"></i>
                        {t('Free shipping on orders over $100')}
                      </li>
                      <li className="mb-2">
                        <i className="fas fa-undo text-info me-2"></i>
                        {t('30-day return policy')}
                      </li>
                      <li className="mb-2">
                        <i className="fas fa-shield-alt text-primary me-2"></i>
                        {t('One year warranty')}
                      </li>
                      <li>
                        <i className="fas fa-headset text-warning me-2"></i>
                        {t('24/7 customer support')}
                      </li>
                    </ul>
                  </Card.Body>
                </Card>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;