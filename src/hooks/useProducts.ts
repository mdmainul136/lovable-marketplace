import { useState, useCallback } from 'react';
import { productService, Product, ProductFilters, ProductsResponse } from '@/lib/api';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 20 });

  const fetchProducts = useCallback(async (filters: ProductFilters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productService.getProducts(filters);
      setProducts(response.products);
      setPagination({ total: response.total, page: response.page, limit: response.limit });
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch products');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchProducts = useCallback(async (query: string, filters: ProductFilters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productService.searchProducts(query, filters);
      setProducts(response.products);
      setPagination({ total: response.total, page: response.page, limit: response.limit });
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Search failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    products,
    loading,
    error,
    pagination,
    fetchProducts,
    searchProducts,
  };
}

export function useProduct(idOrSlug: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!idOrSlug) return;
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProduct(idOrSlug);
      setProduct(data);
      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Product not found');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [idOrSlug]);

  return {
    product,
    loading,
    error,
    fetchProduct,
  };
}

export default useProducts;
