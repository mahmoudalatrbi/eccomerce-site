// src/components/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h5>
              <i className="fas fa-store-alt me-2"></i>
              {t('My Online Store')}
            </h5>
            <p className="mb-0">
              {t('Your first destination for online shopping with the best prices and highest quality')}
            </p>
          </Col>
          <Col md={4} className="mb-4">
            <h6>{t('Quick Links')}</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light text-decoration-none">
                  {t('Home')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-light text-decoration-none">
                  {t('Products')}
                </Link>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  {t('About Us')}
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  {t('Contact Us')}
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4} className="mb-4">
            <h6>{t('Contact Us')}</h6>
            <p className="mb-0">
              <i className="fas fa-envelope me-2"></i>info@mystore.com<br />
              <i className="fas fa-phone me-2"></i>+1 234 567 8900<br />
              <i className="fas fa-map-marker-alt me-2"></i>New York, USA
            </p>
          </Col>
        </Row>
        <hr className="text-light" />
        <div className="text-center">
          <p className="mb-0">
            &copy; 2024 {t('My Online Store')}. {t('All rights reserved')}.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;