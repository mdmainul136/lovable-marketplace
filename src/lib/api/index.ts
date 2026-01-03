// API Service Layer - Main Export
export { apiClient } from './config';
export { authService, type User, type LoginCredentials, type RegisterData, type AuthResponse } from './auth';
export { productService, type Product, type ProductsResponse, type ProductFilters, type PricingTier, type Review } from './products';
export { cartService, type Cart, type CartItem, type AddToCartData } from './cart';
export { orderService, type Order, type ShippingAddress, type CreateOrderData } from './orders';
