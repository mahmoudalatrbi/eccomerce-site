// src/pages/Home.js (محدث)
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

function Home() {
  const { t } = useTranslation();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          productsAPI.getFeatured(),
          productsAPI.getCategories()
        ]);
        
        setFeaturedProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      {/* Hero Section */}
      <div className="text-center py-5 mb-5 bg-primary text-white rounded">
        <h1 className="display-5 fw-bold mb-3">
          <i className="fas fa-gem me-2"></i>
          {t('Welcome to Our Store')}
        </h1>
        <p className="lead mb-4">
          {t('Discover the best products at amazing prices')}
        </p>
        <Button as={Link} to="/products" variant="light" size="lg">
          <i className="fas fa-shopping-bag me-2"></i>
          {t('Shop Now')}
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Categories Section */}
      <Row className="mb-5">
        <Col>
          <h3 className="mb-4">
            <i className="fas fa-th-large me-2 text-primary"></i>
            {t('Shop by Category')}
          </h3>
          <Row>
            {categories.map(category => (
              <Col lg={2} md={4} xs={6} key={category.id} className="mb-3">
                <Link 
                  to={`/products?category=${category.id}`} 
                  className="text-decoration-none"
                >
                  <Card className="text-center h-100 category-card">
                    <Card.Body>
                      <div className="mb-2">
                        <i className="fas fa-tag fa-2x text-primary"></i>
                      </div>
                      <Card.Title className="h6">{category.name}</Card.Title>
                      <small className="text-muted">
                        {category.products_count} {t('products')}
                      </small>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Featured Products */}
      <Row>
        <Col>
          <h3 className="mb-4">
            <i className="fas fa-star me-2 text-warning"></i>
            {t('Featured Products')}
          </h3>
          <Row>
            {featuredProducts.map(product => (
              <Col xl={3} lg={4} md={6} key={product.id} className="mb-4">
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;