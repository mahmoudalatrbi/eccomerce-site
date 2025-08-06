// src/pages/Register.js
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/authAPI';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirm: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.password_confirm) {
      setError('جميع الحقول مطلوبة');
      return false;
    }

    if (formData.password !== formData.password_confirm) {
      setError('كلمات المرور غير متطابقة');
      return false;
    }

    if (formData.password.length < 8) {
      setError('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const response = await authAPI.register(formData);
      
      if (response.success) {
        login(response.user, response.token);
        localStorage.setItem('refreshToken', response.refreshToken);
        
        setSuccess(response.message || 'تم إنشاء الحساب بنجاح!');
        
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1000);
      }
    } catch (error) {
      setError(error.message || 'حدث خطأ في إنشاء الحساب');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow border-0">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <i className="fas fa-user-plus fa-3x text-success mb-3"></i>
                <h2 className="fw-bold">إنشاء حساب جديد</h2>
                <p className="text-muted">انضم إلينا اليوم</p>
              </div>

              {error && (
                <Alert variant="danger" className="mb-3">
                  <i className="fas fa-exclamation-circle me-2"></i>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert variant="success" className="mb-3">
                  <i className="fas fa-check-circle me-2"></i>
                  {success}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">الاسم الأول</label>
                      <input
                        type="text"
                        className="form-control"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="أدخل الاسم الأول"
                        disabled={loading}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">الاسم الأخير</label>
                      <input
                        type="text"
                        className="form-control"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="أدخل الاسم الأخير"
                        disabled={loading}
                      />
                    </div>
                  </Col>
                </Row>

                <div className="mb-3">
                  <label className="form-label fw-bold">اسم المستخدم</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="أدخل اسم المستخدم"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">البريد الإلكتروني</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="أدخل البريد الإلكتروني"
                    required
                    disabled={loading}
                  />
                </div>

                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">كلمة المرور</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="أدخل كلمة المرور"
                        required
                        disabled={loading}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-4">
                      <label className="form-label fw-bold">تأكيد كلمة المرور</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password_confirm"
                        value={formData.password_confirm}
                        onChange={handleChange}
                        placeholder="أعد إدخال كلمة المرور"
                        required
                        disabled={loading}
                      />
                    </div>
                  </Col>
                </Row>

                <Button
                  type="submit"
                  variant="success"
                  size="lg"
                  className="w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        className="me-2"
                      />
                      جاري إنشاء الحساب...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-user-plus me-2"></i>
                      إنشاء الحساب
                    </>
                  )}
                </Button>
              </Form>

              <hr className="my-4" />

              <div className="text-center">
                <p className="mb-0">
                  لديك حساب بالفعل؟
                  <Link 
                    to="/login" 
                    className="ms-2 text-decoration-none fw-bold"
                    state={{ from: location.state?.from }}
                  >
                    تسجيل الدخول
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;