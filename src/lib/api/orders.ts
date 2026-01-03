import apiClient from './config';
import { CartItem } from './cart';

export interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  user: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: 'cod' | 'bkash' | 'nagad' | 'card' | 'bank';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  notes?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderData {
  shippingAddress: ShippingAddress;
  paymentMethod: Order['paymentMethod'];
  notes?: string;
}

export const orderService = {
  async createOrder(orderData: CreateOrderData): Promise<Order> {
    const { data } = await apiClient.post('/orders', orderData);
    return data.order;
  },

  async getOrders(page = 1, limit = 10): Promise<{ orders: Order[]; total: number }> {
    const { data } = await apiClient.get(`/orders?page=${page}&limit=${limit}`);
    return data;
  },

  async getOrder(orderId: string): Promise<Order> {
    const { data } = await apiClient.get(`/orders/${orderId}`);
    return data.order;
  },

  async cancelOrder(orderId: string, reason?: string): Promise<Order> {
    const { data } = await apiClient.put(`/orders/${orderId}/cancel`, { reason });
    return data.order;
  },

  async trackOrder(orderNumber: string): Promise<{
    order: Order;
    tracking: { status: string; timestamp: string; location?: string }[];
  }> {
    const { data } = await apiClient.get(`/orders/track/${orderNumber}`);
    return data;
  },
};

export default orderService;
