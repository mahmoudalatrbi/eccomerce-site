// src/pages/Register.js (بسيط)
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password_confirm: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        if (formData.password !== formData.password_confirm) {
            alert('كلمات المرور غير متطابقة');
            setLoading(false);
            return;
        }
        
        // محاكاة إنشاء حساب
        setTimeout(() => {
            alert('تم إنشاء الحساب بنجاح! (تجريبي)');
            setLoading(false);
            navigate('/login');
        }, 1000);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <h2 className="card-title text-center mb-4">
                                <i className="fas fa-user-plus me-2 text-success"></i>
                                إنشاء حساب جديد
                            </h2>
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">اسم المستخدم</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">البريد الإلكتروني</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">كلمة المرور</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">تأكيد كلمة المرور</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password_confirm"
                                        value={formData.password_confirm}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success w-100 mb-3"
                                    disabled={loading}
                                >
                                    {loading ? 'جاري الإنشاء...' : 'إنشاء الحساب'}
                                </button>
                            </form>
                            
                            <div className="text-center">
                                <p className="mb-0">
                                    لديك حساب بالفعل؟ 
                                    <Link to="/login" className="ms-1">تسجيل الدخول</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;