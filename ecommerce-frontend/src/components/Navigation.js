// src/components/Navigation.js (محدث)
import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Badge, Form, FormControl } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';

function Navigation() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { cartItemsCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <i className="fas fa-store-alt me-2"></i>
          {t('My Online Store')}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              <i className="fas fa-home me-1"></i>
              {t('Home')}
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              <i className="fas fa-shopping-bag me-1"></i>
              {t('Products')}
            </Nav.Link>
          </Nav>

          {/* Search Form */}
          <Form className="d-flex me-3" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder={t('Search for products...')}
              className="me-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-light" type="submit">
              <i className="fas fa-search"></i>
            </Button>
          </Form>
          <Nav>
            {/* Language Toggle */}
            <Button
              variant="outline-light"
              size="sm"
              className="me-2"
              onClick={() => changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')}
            >
              <i className="fas fa-language me-1"></i>
              {i18n.language === 'ar' ? t('English') : t('العربية')}
            </Button>

            {/* Cart */}
            <Nav.Link as={Link} to="/cart" className="position-relative">
              <i className="fas fa-shopping-cart me-1"></i>
              {t('Cart')}
              {cartItemsCount > 0 && (
                <Badge 
                  bg="danger" 
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;