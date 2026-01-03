import { useState, useEffect, useCallback } from 'react';
import { cartService, Cart, AddToCartData } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export function useCart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const cartData = await cartService.getCart();
      setCart(cartData);
    } catch (err) {
      // User might not be logged in, use local cart
      console.log('Using local cart');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (data: AddToCartData) => {
    setLoading(true);
    try {
      const updatedCart = await cartService.addToCart(data);
      setCart(updatedCart);
      toast({ title: 'Added to cart', description: 'Item added successfully' });
      return updatedCart;
    } catch (err: any) {
      toast({ 
        title: 'Failed to add item', 
        description: err.response?.data?.message || 'Please try again',
        variant: 'destructive' 
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    setLoading(true);
    try {
      const updatedCart = await cartService.updateCartItem(itemId, quantity);
      setCart(updatedCart);
      return updatedCart;
    } catch (err: any) {
      toast({ 
        title: 'Failed to update', 
        description: err.response?.data?.message || 'Please try again',
        variant: 'destructive' 
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId: string) => {
    setLoading(true);
    try {
      const updatedCart = await cartService.removeFromCart(itemId);
      setCart(updatedCart);
      toast({ title: 'Item removed', description: 'Item removed from cart' });
      return updatedCart;
    } catch (err: any) {
      toast({ 
        title: 'Failed to remove', 
        description: err.response?.data?.message || 'Please try again',
        variant: 'destructive' 
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      await cartService.clearCart();
      setCart(null);
      toast({ title: 'Cart cleared', description: 'All items removed' });
    } catch (err: any) {
      toast({ 
        title: 'Failed to clear cart', 
        description: err.response?.data?.message || 'Please try again',
        variant: 'destructive' 
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    cart,
    loading,
    itemCount: cart?.itemCount || 0,
    total: cart?.total || 0,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    refreshCart: fetchCart,
  };
}

export default useCart;
