// src/components/LoadingSpinner.js
import React from 'react';
import { Spinner, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function LoadingSpinner() {
  const { t } = useTranslation();

  return (
    <Container className="text-center py-5">
      <Spinner animation="border" variant="primary" />
      <p className="mt-2">{t('Loading...')}</p>
    </Container>
  );
}

export default LoadingSpinner;