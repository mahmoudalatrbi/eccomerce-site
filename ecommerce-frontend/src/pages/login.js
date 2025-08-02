// src/pages/Login.js (بسيط)
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
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
        
        // محاكاة تسجيل دخول
        setTimeout(() => {
            alert('مرحباً! (هذا تسجيل دخول تجريبي)');
            setLoading(false);
            navigate('/');
        }, 1000);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <h2 className="card-title text-center mb-4">
                                <i className="fas fa-sign-in-alt me-2 text-primary"></i>
                                تسجيل الدخول
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

                                <div className="mb-4">
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

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 mb-3"
                                    disabled={loading}
                                >
                                    {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                                </button>
                            </form>
                            
                            <div className="text-center">
                                <p className="mb-0">
                                    ليس لديك حساب؟ 
                                    <Link to="/register" className="ms-1">إنشاء حساب جديد</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;