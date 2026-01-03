import apiClient from './config';

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category: string;
  subcategory?: string;
  brand?: string;
  stock: number;
  minOrder: number;
  unit: string;
  rating: number;
  reviewCount: number;
  soldCount: number;
  tags?: string[];
  specifications?: Record<string, string>;
  pricingTiers?: PricingTier[];
  vendor?: {
    _id: string;
    name: string;
    rating: number;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PricingTier {
  minQty: number;
  maxQty: number;
  price: number;
}

export interface ProductsResponse {
  status: string;
  total: number;
  page: number;
  limit: number;
  products: Product[];
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  search?: string;
  sort?: 'price' | '-price' | 'createdAt' | '-createdAt' | 'rating' | 'soldCount';
  tags?: string[];
}

export const productService = {
  async getProducts(filters: ProductFilters = {}): Promise<ProductsResponse> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(v => params.append(key, v));
        } else {
          params.append(key, String(value));
        }
      }
    });
    const { data } = await apiClient.get(`/products?${params.toString()}`);
    return data;
  },

  async getProduct(idOrSlug: string): Promise<Product> {
    const { data } = await apiClient.get(`/products/${idOrSlug}`);
    return data.product;
  },

  async getProductsByCategory(category: string, limit = 10): Promise<Product[]> {
    const { data } = await apiClient.get(`/products/category/${category}?limit=${limit}`);
    return data.products;
  },

  async getFeaturedProducts(limit = 10): Promise<Product[]> {
    const { data } = await apiClient.get(`/products/featured?limit=${limit}`);
    return data.products;
  },

  async getNewArrivals(limit = 10): Promise<Product[]> {
    const { data } = await apiClient.get(`/products/new-arrivals?limit=${limit}`);
    return data.products;
  },

  async getBestSellers(limit = 10): Promise<Product[]> {
    const { data } = await apiClient.get(`/products/best-sellers?limit=${limit}`);
    return data.products;
  },

  async searchProducts(query: string, filters: ProductFilters = {}): Promise<ProductsResponse> {
    const params = new URLSearchParams({ search: query });
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });
    const { data } = await apiClient.get(`/products/search?${params.toString()}`);
    return data;
  },

  async getCategories(): Promise<{ _id: string; name: string; slug: string; icon?: string; subcategories?: string[] }[]> {
    const { data } = await apiClient.get('/categories');
    return data.categories;
  },

  async getProductReviews(productId: string, page = 1, limit = 10): Promise<{
    reviews: Review[];
    total: number;
    averageRating: number;
  }> {
    const { data } = await apiClient.get(`/products/${productId}/reviews?page=${page}&limit=${limit}`);
    return data;
  },

  async addReview(productId: string, review: { rating: number; comment: string }): Promise<Review> {
    const { data } = await apiClient.post(`/products/${productId}/reviews`, review);
    return data.review;
  },
};

export interface Review {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

export default productService;
