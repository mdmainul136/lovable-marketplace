import apiClient from './config';

export interface User {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role: 'customer' | 'vendor' | 'admin';
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface AuthResponse {
  status: string;
  token: string;
  user: User;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await apiClient.post('/auth/login', credentials);
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    return data;
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    const { data } = await apiClient.post('/auth/register', userData);
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    return data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
    localStorage.removeItem('authToken');
  },

  async getProfile(): Promise<User> {
    const { data } = await apiClient.get('/auth/profile');
    return data.user;
  },

  async updateProfile(userData: Partial<User>): Promise<User> {
    const { data } = await apiClient.put('/auth/profile', userData);
    return data.user;
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    const { data } = await apiClient.post('/auth/forgot-password', { email });
    return data;
  },

  async resetPassword(token: string, password: string): Promise<{ message: string }> {
    const { data } = await apiClient.post('/auth/reset-password', { token, password });
    return data;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  },
};

export default authService;
