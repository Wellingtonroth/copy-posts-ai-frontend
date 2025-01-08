import { createRouter, createWebHistory } from 'vue-router';
import LandingView from '@/views/LandingView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import ConfirmationView from '@/views/ConfirmationView.vue';
import HomeView from '@/views/HomeView.vue';

const routes = [
  { 
    path: '/', 
    name: 'Landing', 
    component: LandingView,
  },
  { 
    path: '/login', 
    name: 'Login', 
    component: LoginView,
  },
  { 
    path: '/register', 
    name: 'Register', 
    component: RegisterView,
  },
  { 
    path: '/confirm', 
    name: 'Confirmation', 
    component: ConfirmationView,
  },
  { 
    path: '/home', 
    name: 'Home', 
    component: HomeView,
    meta: { 
      requiresAuth: true
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});


export default router;