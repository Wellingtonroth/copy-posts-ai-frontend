import { 
  ref, 
  computed
} from 'vue';
import { useAuthStore } from '@/store/auth';

export default function useAuth(authStore = useAuthStore()) {
  const user = computed(() => authStore.user);
  const token = computed(() => authStore.token);

  const login = async (credentials) => {
    try {
      const response = await authStore.login(credentials);
      return response;
    } catch (error) {
      console.error('Failed to login', error);
    }
  };

  const register = async (userData) => {
    try {
      const response = await authStore.register(userData);
      return response;
    } catch (error) {
      console.error('Failed to register', error);
    }
  };

  return {
    login,
    register,
  }
};