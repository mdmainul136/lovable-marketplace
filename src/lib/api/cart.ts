import apiClient from './config';
import { Product } from './products';

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  price: number;
  total: number;
}

export interface Cart {
  _id: string;
  user?: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface AddToCartData {
  productId: string;
  quantity: number;
}

export const cartService = {
  async getCart(): Promise<Cart> {
    const { data } = await apiClient.get('/cart');
    return data.cart;
  },

  async addToCart(item: AddToCartData): Promise<Cart> {
    const { data } = await apiClient.post('/cart/add', item);
    return data.cart;
  },

  async updateCartItem(itemId: string, quantity: number): Promise<Cart> {
    const { data } = await apiClient.put(`/cart/item/${itemId}`, { quantity });
    return data.cart;
  },

  async removeFromCart(itemId: string): Promise<Cart> {
    const { data } = await apiClient.delete(`/cart/item/${itemId}`);
    return data.cart;
  },

  async clearCart(): Promise<{ message: string }> {
    const { data } = await apiClient.delete('/cart/clear');
    return data;
  },

  async applyCoupon(code: string): Promise<Cart> {
    const { data } = await apiClient.post('/cart/coupon', { code });
    return data.cart;
  },

  async removeCoupon(): Promise<Cart> {
    const { data } = await apiClient.delete('/cart/coupon');
    return data.cart;
  },

  // Local cart for guest users
  getLocalCart(): CartItem[] {
    const cart = localStorage.getItem('guestCart');
    return cart ? JSON.parse(cart) : [];
  },

  setLocalCart(items: CartItem[]): void {
    localStorage.setItem('guestCart', JSON.stringify(items));
  },

  clearLocalCart(): void {
    localStorage.removeItem('guestCart');
  },

  async syncLocalCart(): Promise<Cart> {
    const localItems = this.getLocalCart();
    if (localItems.length > 0) {
      const { data } = await apiClient.post('/cart/sync', { items: localItems });
      this.clearLocalCart();
      return data.cart;
    }
    return this.getCart();
  },
};

export default cartService;
