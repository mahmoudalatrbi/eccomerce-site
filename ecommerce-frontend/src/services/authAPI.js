// src/services/authAPI.js
const API_BASE_URL = 'http://127.0.0.1:8000';

export const authAPI = {
  // تسجيل الدخول
  login: async (credentials) => {
    try {
      console.log('API: Logging in user:', credentials.username);
      
      const response = await fetch(`${API_BASE_URL}/api/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });

      console.log('API: Login response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: 'Login failed'
        }));
        throw new Error(errorData.message || 'فشل في تسجيل الدخول');
      }

      const result = await response.json();
      console.log('API: Login success:', result);
      
      return {
        success: result.success,
        user: result.user,
        token: result.tokens.access,
        refreshToken: result.tokens.refresh,
        message: result.message
      };
    } catch (error) {
      console.error('API: Login error:', error);
      throw error;
    }
  },

  // إنشاء حساب جديد
  register: async (userData) => {
    try {
      console.log('API: Registering user:', userData.username);
      
      const response = await fetch(`${API_BASE_URL}/api/auth/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      });

      console.log('API: Register response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: 'Registration failed'
        }));
        throw new Error(errorData.errors ? Object.values(errorData.errors).flat().join(', ') : 'فشل في إنشاء الحساب');
      }

      const result = await response.json();
      console.log('API: Register success:', result);
      
      return {
        success: result.success,
        user: result.user,
        token: result.tokens.access,
        refreshToken: result.tokens.refresh,
        message: result.message
      };
    } catch (error) {
      console.error('API: Register error:', error);
      throw error;
    }
  },

  // تسجيل الخروج
  logout: async (refreshToken) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
        body: JSON.stringify({ refresh: refreshToken }),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('API: Logout error:', error);
      return { success: true };
    }
  },
};