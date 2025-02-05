<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          required
          placeholder="Enter your email"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="form.password"
          required
          placeholder="Enter your password"
        />
      </div>

      <button type="submit">Login</button>
    </form>
    <p>
      Don't have an account?
      <router-link to="/register">Register here</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useAuth from '@/composables/auth';

const router = useRouter();
const { login } = useAuth();

const form = ref({
  email: '',
  password: '',
});

async function handleLogin() {
  try {
    const response = await login(form.value);

    const accessToken = response?.data?.data?.session?.access_token;

    if (!accessToken) {
      alert('Failed to retrieve token. Please try again.');
      return;
    }

    localStorage.setItem('token', accessToken);

    router.push('/home');
  } catch (error) {
    console.error('Login error:', error);
    alert('Login failed. Please check your credentials and try again.');
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.7rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

p {
  text-align: center;
  margin-top: 1rem;
}
</style>
