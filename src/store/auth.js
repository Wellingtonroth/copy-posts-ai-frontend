import { defineStore } from 'pinia';
import api from '../services/api/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isLoading: false,
  }),
  actions: {
    async login(credentials) {
      try {
        this.isLoading = true;
        const response = await api.login(credentials);
        if (response.data.session?.access_token) {
          localStorage.setItem('token', response.data.session.access_token);
          this.token = response.data.session.access_token;
        }
        return response;
      } catch (error) {
        console.error('Login error:', error);
      } finally {
        this.isLoading = false;
      }
    },
    async register(userData) {
      try {
        this.isLoading = true;
        const response = await api.register(userData);
        return response;
      } catch (error) {
        console.error('Registration error:', error);
      } finally {
        this.isLoading = false;
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.token = null;
    },
  },
});
