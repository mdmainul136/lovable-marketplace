import axios from 'axios';

// Laravel API Configuration
// For development: http://localhost:8000/api
// For production: your deployed Laravel URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // Laravel CSRF compatibility
  },
  withCredentials: true, // Enable cookies for Laravel Sanctum
});

// Request interceptor to add auth token (Laravel Sanctum Bearer token)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/auth';
    }
    // Handle Laravel validation errors (422)
    if (error.response?.status === 422) {
      const validationErrors = error.response.data.errors;
      if (validationErrors) {
        const firstError = Object.values(validationErrors)[0];
        error.message = Array.isArray(firstError) ? firstError[0] : firstError;
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
