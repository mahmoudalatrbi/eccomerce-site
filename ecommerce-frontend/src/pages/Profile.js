// src/pages/Profile.js
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    username: user?.username || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // هنا سنضيف منطق تحديث البيانات لاحقاً
    setEditing(false);
    alert('تم حفظ التغييرات بنجاح! (تجريبي)');
  };

  const getInitials = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase();
    }
    return user?.username?.charAt(0).toUpperCase() || 'U';
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow border-0">
            <Card.Body className="p-4">
              {/* Profile Header */}
              <div className="text-center mb-4">
                <div 
                  className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ width: '80px', height: '80px', fontSize: '32px' }}
                >
                  {getInitials()}
                </div>
                <h2 className="fw-bold mb-1">
                  {user?.first_name && user?.last_name ? 
                    `${user.first_name} ${user.last_name}` : 
                    user?.username
                  }
                </h2>
                <p className="text-muted">{user?.email}</p>
              </div>

              {/* Profile Form */}
              <Form onSubmit={handleSave}>
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
                        disabled={!editing}
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
                        disabled={!editing}
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
                    disabled // اسم المستخدم لا يمكن تغييره
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">البريد الإلكتروني</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>

                {/* Action Buttons */}
                <div className="d-flex gap-2">
                  {editing ? (
                    <>
                      <Button type="submit" variant="success" className="flex-fill">
                        <i className="fas fa-save me-2"></i>
                        حفظ التغييرات
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline-secondary" 
                        onClick={() => {
                          setEditing(false);
                          setFormData({
                            first_name: user?.first_name || '',
                            last_name: user?.last_name || '',
                            email: user?.email || '',
                            username: user?.username || ''
                          });
                        }}
                      >
                        إلغاء
                      </Button>
                    </>
                  ) : (
                    <Button 
                      type="button" 
                      variant="primary" 
                      className="flex-fill"
                      onClick={() => setEditing(true)}
                    >
                      <i className="fas fa-edit me-2"></i>
                      تعديل البيانات
                    </Button>
                  )}
                </div>
              </Form>

              {/* Profile Stats */}
              <hr className="my-4" />
              <Row className="text-center">
                <Col xs={4}>
                  <div className="border-end">
                    <h4 className="fw-bold text-primary mb-1">0</h4>
                    <small className="text-muted">الطلبات</small>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="border-end">
                    <h4 className="fw-bold text-success mb-1">0</h4>
                    <small className="text-muted">المفضلة</small>
                  </div>
                </Col>
                <Col xs={4}>
                  <div>
                    <h4 className="fw-bold text-info mb-1">0</h4>
                    <small className="text-muted">المراجعات</small>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;