// src/components/Navigation.js
import React, { useState } from 'react';
import {
  Navbar,
  Nav,
  Container,
  Button,
  Badge,
  Form,
  FormControl,
  NavDropdown,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/authAPI';

function Navigation() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { cartItemsCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
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

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      await authAPI.logout(refreshToken);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      logout();
      navigate('/');
    }
  };

  const getInitials = (user) => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase();
    }
    return user?.username?.charAt(0).toUpperCase() || 'U';
  };

  const getUserDisplayName = (user) => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name} ${user.last_name}`;
    } else if (user?.first_name) {
      return user.first_name;
    }
    return user?.username || 'User';
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/">
          <i className="fas fa-store-alt me-2"></i>
          {t('My Online Store')}
        </Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Left Navigation Links */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="d-flex align-items-center">
              <i className="fas fa-home me-1"></i>
              {t('Home')}
            </Nav.Link>
            <Nav.Link as={Link} to="/products" className="d-flex align-items-center">
              <i className="fas fa-shopping-bag me-1"></i>
              {t('Products')}
            </Nav.Link>
          </Nav>

          {/* Right Side Items */}
          <div className="d-flex align-items-center">
            {/* Search Form - Hidden on small screens */}
            <Form className="d-none d-lg-flex me-3" onSubmit={handleSearch}>
              <FormControl
                type="search"
                placeholder={t('Search for products...')}
                className="me-2"
                style={{ width: '250px' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline-light" type="submit">
                <i className="fas fa-search"></i>
              </Button>
            </Form>

            {/* Language Toggle */}
            <Button
              variant="outline-light"
              size="sm"
              className="me-3 d-flex align-items-center"
              onClick={() => changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')}
            >
              <i className="fas fa-language me-1"></i>
              <span className="d-none d-sm-inline">
                {i18n.language === 'ar' ? 'EN' : 'العربية'}
              </span>
            </Button>

            {/* Cart Link */}
            <Nav className="me-3">
              <Nav.Link 
                as={Link} 
                to="/cart" 
                className="position-relative d-flex align-items-center px-3"
              >
                <i className="fas fa-shopping-cart me-1"></i>
                <span className="d-none d-sm-inline">{t('Cart')}</span>
                {cartItemsCount > 0 && (
                  <Badge
                    bg="danger"
                    className="position-absolute"
                    style={{ 
                      top: '8px', 
                      right: '8px',
                      fontSize: '10px',
                      minWidth: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </Nav.Link>
            </Nav>

            {/* Authentication Section */}
            <Nav>
              {isAuthenticated ? (
                <NavDropdown
                  title={
                    <span className="d-flex align-items-center">
                      <div
                        className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                        style={{ 
                          width: '32px', 
                          height: '32px', 
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}
                      >
                        {getInitials(user)}
                      </div>
                      <span className="d-none d-md-inline text-white">
                        {getUserDisplayName(user)}
                      </span>
                    </span>
                  }
                  id="user-dropdown"
                  align="end"
                  className="user-dropdown"
                >
                  {/* User Info Header */}
                  <NavDropdown.Header className="text-center py-3">
                    <div
                      className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2"
                      style={{ 
                        width: '50px', 
                        height: '50px', 
                        fontSize: '20px',
                        fontWeight: 'bold'
                      }}
                    >
                      {getInitials(user)}
                    </div>
                    <div className="fw-bold text-dark mb-1">
                      {getUserDisplayName(user)}
                    </div>
                    <div className="text-muted small">
                      {user?.email}
                    </div>
                  </NavDropdown.Header>

                  <NavDropdown.Divider />

                  {/* Menu Items */}
                  <NavDropdown.Item as={Link} to="/profile" className="d-flex align-items-center py-2">
                    <i className="fas fa-user me-2 text-primary"></i>
                    {t('My Profile')}
                  </NavDropdown.Item>

                  <NavDropdown.Item as={Link} to="/orders" className="d-flex align-items-center py-2">
                    <i className="fas fa-box me-2 text-info"></i>
                    {t('My Orders')}
                  </NavDropdown.Item>

                  <NavDropdown.Item as={Link} to="/wishlist" className="d-flex align-items-center py-2">
                    <i className="fas fa-heart me-2 text-danger"></i>
                    {t('Wishlist')}
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item 
                    onClick={handleLogout}
                    className="d-flex align-items-center py-2 text-danger"
                  >
                    <i className="fas fa-sign-out-alt me-2"></i>
                    {t('Logout')}
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login" className="d-flex align-items-center px-3">
                  <i className="fas fa-sign-in-alt me-1"></i>
                  {t('Login')}
                </Nav.Link>
              )}
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;