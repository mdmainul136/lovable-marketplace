import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService, AdminFilters } from '@/lib/api/admin';
import { toast } from 'sonner';

// Dashboard
export function useAdminDashboard() {
  return useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: adminService.getDashboard,
  });
}

// Products
export function useAdminProducts(filters?: AdminFilters) {
  return useQuery({
    queryKey: ['admin', 'products', filters],
    queryFn: () => adminService.getProducts(filters),
  });
}

export function useAdminProduct(id: string) {
  return useQuery({
    queryKey: ['admin', 'products', id],
    queryFn: () => adminService.getProduct(id),
    enabled: !!id,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      toast.success('Product created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create product');
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof adminService.updateProduct>[1] }) =>
      adminService.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      toast.success('Product updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update product');
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminService.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      toast.success('Product deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete product');
    },
  });
}

export function useBulkDeleteProducts() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminService.bulkDeleteProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      toast.success('Products deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete products');
    },
  });
}

// Orders
export function useAdminOrders(filters?: AdminFilters) {
  return useQuery({
    queryKey: ['admin', 'orders', filters],
    queryFn: () => adminService.getOrders(filters),
  });
}

export function useAdminOrder(id: string) {
  return useQuery({
    queryKey: ['admin', 'orders', id],
    queryFn: () => adminService.getOrder(id),
    enabled: !!id,
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      adminService.updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
      toast.success('Order status updated');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update order');
    },
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminService.cancelOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
      toast.success('Order cancelled');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to cancel order');
    },
  });
}

// Customers
export function useAdminCustomers(filters?: AdminFilters) {
  return useQuery({
    queryKey: ['admin', 'customers', filters],
    queryFn: () => adminService.getCustomers(filters),
  });
}

export function useAdminCustomer(id: string) {
  return useQuery({
    queryKey: ['admin', 'customers', id],
    queryFn: () => adminService.getCustomer(id),
    enabled: !!id,
  });
}

export function useUpdateCustomerStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      adminService.updateCustomerStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'customers'] });
      toast.success('Customer status updated');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update customer');
    },
  });
}

export function useBlockCustomer() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminService.blockCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'customers'] });
      toast.success('Customer blocked');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to block customer');
    },
  });
}

export function useUnblockCustomer() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminService.unblockCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'customers'] });
      toast.success('Customer unblocked');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to unblock customer');
    },
  });
}

// Analytics
export function useAdminAnalytics(period?: string) {
  return useQuery({
    queryKey: ['admin', 'analytics', period],
    queryFn: () => adminService.getAnalytics(period),
  });
}
