// src/pages/Products.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { productsAPI, cartAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

function Products() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filters
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('ordering') || '');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchQuery, sortBy]);

  const fetchCategories = async () => {
    try {
      const response = await productsAPI.getCategories();
      setCategories(response.data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (searchQuery) params.search = searchQuery;
      if (sortBy) params.ordering = sortBy;

      const response = await productsAPI.getAll(params);
      setProducts(response.data.results || response.data);
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    try {
      await cartAPI.addItem(productId);
      // يمكن إضافة notification هنا
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  const handleFilterChange = (filterType, value) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (value) {
      newParams.set(filterType, value);
    } else {
      newParams.delete(filterType);
    }
    
    setSearchParams(newParams);
    
    switch (filterType) {
      case 'category':
        setSelectedCategory(value);
        break;
      case 'search':
        setSearchQuery(value);
        break;
      case 'ordering':
        setSortBy(value);
        break;
      default:
        break;
    }
  };

  const clearFilters = () => {
    setSearchParams({});
    setSelectedCategory('');
    setSearchQuery('');
    setSortBy('');
  };

  return (
    <Container>
      <Row>
        {/* Sidebar Filters */}
        <Col md={3}>
          {/* Categories Filter */}
          <Card className="mb-4">
            <Card.Header>
              <h6><i className="fas fa-list me-2"></i>{t('Categories')}</h6>
            </Card.Header>
            <Card.Body>
              <Form.Select
                value={selectedCategory}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">{t('All Categories')}</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.products_count})
                  </option>
                ))}
              </Form.Select>
            </Card.Body>
          </Card>

          {/* Search Filter */}
          <Card className="mb-4">
            <Card.Header>
              <h6><i className="fas fa-search me-2"></i>{t('Search')}</h6>
            </Card.Header>
            <Card.Body>
              <Form.Control
                type="text"
                placeholder={t('Search for products...')}
                value={searchQuery}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </Card.Body>
          </Card>

          {/* Sort Filter */}
          <Card className="mb-4">
            <Card.Header>
              <h6><i className="fas fa-sort me-2"></i>{t('Sort by')}</h6>
            </Card.Header>
            <Card.Body>
              <Form.Select
                value={sortBy}
                onChange={(e) => handleFilterChange('ordering', e.target.value)}
              >
                <option value="">{t('Default')}</option>
                <option value="name">{t('Name (A-Z)')}</option>
                <option value="price">{t('Price (Low to High)')}</option>
                <option value="-price">{t('Price (High to Low)')}</option>
                <option value="-created">{t('Newest')}</option>
              </Form.Select>
            </Card.Body>
          </Card>

          {/* Clear Filters */}
          {(selectedCategory || searchQuery || sortBy) && (
            <Card>
              <Card.Body className="text-center">
                <Button variant="outline-secondary" size="sm" onClick={clearFilters}>
                  <i className="fas fa-times me-1"></i>
                  {t('Clear Filters')}
                </Button>
              </Card.Body>
            </Card>
          )}
        </Col>

        {/* Products Grid */}
        <Col md={9}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>
              {searchQuery ? 
                `${t('Search results for')} "${searchQuery}"` : 
                t('All Products')
              }
            </h2>
            <small className="text-muted">
              {products.length} {t('products')}
            </small>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          {loading ? (
            <LoadingSpinner />
          ) : (
            <Row>
              {products.length > 0 ? (
                products.map(product => (
                  <Col md={4} key={product.id} className="mb-4">
                    <ProductCard product={product} onAddToCart={addToCart} />
                  </Col>
                ))
              ) : (
                <Col>
                  <Alert variant="info" className="text-center">
                    <i className="fas fa-info-circle me-2"></i>
                    {t('No products found')}
                  </Alert>
                </Col>
              )}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Products;