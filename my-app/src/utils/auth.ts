import api from './api';

export const login = async (email: string, password: string) => {
    console.log('Attempting login:', { email, password });
    const response = await api.post('/auth/login', { email, password });
    console.log('Login response:', response.data);
    localStorage.setItem('token', response.data.token);
    return response.data;
  };
  

export const register = async (email: string, password: string) => {
  const response = await api.post('/auth/register', { email, password });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const verifyToken = async () => {
  try {
    const response = await api.get('/auth/verify');
    return response.data;
  } catch (error) {
    logout();
    throw error;
  }
};
