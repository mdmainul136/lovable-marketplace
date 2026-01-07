import { apiClient } from './config';

// ============ Types ============
export interface AdminStats {
  totalRevenue: number;
  revenueChange: number;
  totalOrders: number;
  ordersChange: number;
  totalProducts: number;
  newProductsThisWeek: number;
  totalCustomers: number;
  customersChange: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  orders: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export interface RecentOrder {
  id: string;
  customer: string;
  amount: number;
  status: string;
  date: string;
}

export interface TopProduct {
  id: string;
  name: string;
  sales: number;
  revenue: number;
}

export interface DashboardData {
  stats: AdminStats;
  revenueData: RevenueData[];
  categoryData: CategoryData[];
  recentOrders: RecentOrder[];
  topProducts: TopProduct[];
}

export interface AdminProduct {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  status: 'active' | 'low_stock' | 'out_of_stock' | 'draft';
  image: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface AdminProductsResponse {
  data: AdminProduct[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface AdminOrder {
  id: string;
  customer: string;
  email: string;
  items: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'refunded' | 'failed';
  date: string;
  shippingAddress?: {
    address: string;
    city: string;
    postalCode: string;
  };
}

export interface AdminOrdersResponse {
  data: AdminOrder[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  stats: {
    all: number;
    pending: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
  };
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'vip' | 'blocked';
  joinedAt: string;
}

export interface AdminCustomersResponse {
  data: AdminCustomer[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  stats: {
    total: number;
    active: number;
    vip: number;
    newThisMonth: number;
  };
}

export interface AdminFilters {
  search?: string;
  category?: string;
  status?: string;
  page?: number;
  per_page?: number;
}

// ============ API Service ============
export const adminService = {
  // Dashboard
  getDashboard: async (): Promise<DashboardData> => {
    const response = await apiClient.get('/admin/dashboard');
    return response.data;
  },

  // Products
  getProducts: async (filters?: AdminFilters): Promise<AdminProductsResponse> => {
    const response = await apiClient.get('/admin/products', { params: filters });
    return response.data;
  },

  getProduct: async (id: string): Promise<AdminProduct> => {
    const response = await apiClient.get(`/admin/products/${id}`);
    return response.data;
  },

  createProduct: async (data: Partial<AdminProduct>): Promise<AdminProduct> => {
    const response = await apiClient.post('/admin/products', data);
    return response.data;
  },

  updateProduct: async (id: string, data: Partial<AdminProduct>): Promise<AdminProduct> => {
    const response = await apiClient.put(`/admin/products/${id}`, data);
    return response.data;
  },

  deleteProduct: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/products/${id}`);
  },

  bulkDeleteProducts: async (ids: string[]): Promise<void> => {
    await apiClient.post('/admin/products/bulk-delete', { ids });
  },

  // Orders
  getOrders: async (filters?: AdminFilters): Promise<AdminOrdersResponse> => {
    const response = await apiClient.get('/admin/orders', { params: filters });
    return response.data;
  },

  getOrder: async (id: string): Promise<AdminOrder> => {
    const response = await apiClient.get(`/admin/orders/${id}`);
    return response.data;
  },

  updateOrderStatus: async (id: string, status: string): Promise<AdminOrder> => {
    const response = await apiClient.patch(`/admin/orders/${id}/status`, { status });
    return response.data;
  },

  cancelOrder: async (id: string): Promise<void> => {
    await apiClient.patch(`/admin/orders/${id}/cancel`);
  },

  // Customers
  getCustomers: async (filters?: AdminFilters): Promise<AdminCustomersResponse> => {
    const response = await apiClient.get('/admin/customers', { params: filters });
    return response.data;
  },

  getCustomer: async (id: string): Promise<AdminCustomer> => {
    const response = await apiClient.get(`/admin/customers/${id}`);
    return response.data;
  },

  updateCustomerStatus: async (id: string, status: string): Promise<AdminCustomer> => {
    const response = await apiClient.patch(`/admin/customers/${id}/status`, { status });
    return response.data;
  },

  blockCustomer: async (id: string): Promise<void> => {
    await apiClient.patch(`/admin/customers/${id}/block`);
  },

  unblockCustomer: async (id: string): Promise<void> => {
    await apiClient.patch(`/admin/customers/${id}/unblock`);
  },

  // Analytics
  getAnalytics: async (period?: string): Promise<{
    revenue: RevenueData[];
    dailySales: { date: string; sales: number; orders: number }[];
    categoryDistribution: CategoryData[];
    topProducts: TopProduct[];
  }> => {
    const response = await apiClient.get('/admin/analytics', { params: { period } });
    return response.data;
  },
};
