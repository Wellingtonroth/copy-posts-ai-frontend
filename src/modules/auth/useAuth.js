import { useApi } from '@/composables/useApi';

export function useAuth() {
  const { post } = useApi();

  const register = async (userData) => {
    return await post('/api/auth/register', userData);
  };  

  const login = async (credentials) => {
    const response = await post('api/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  };

  return { register, login };
}
