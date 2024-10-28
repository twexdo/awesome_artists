import apiClient from './apiClient';

export const login = async (email: string, password: string) => {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data;
};
export const register = async (email: string, password: string, name: string) => {
  const response = await apiClient.post('/auth/register', { email, password,name });
  return response.data;
};

export const logout = async () => {
  await apiClient.post('/auth/logout');
};

export const getProfile = async () => {
  const response = await apiClient.get('/auth/profile');
  return response.data;
};
