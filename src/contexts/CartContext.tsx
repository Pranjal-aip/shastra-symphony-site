import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Course } from '@/contexts/AdminContext';

export interface CartItem {
  course: Course;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;
  isInCart: (courseId: string) => boolean;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'shastrakulam_cart';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (course: Course) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.course.id === course.id);
      if (existing) {
        return prev; // Course already in cart
      }
      return [...prev, { course, quantity: 1 }];
    });
  };

  const removeFromCart = (courseId: string) => {
    setItems((prev) => prev.filter((item) => item.course.id !== courseId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (courseId: string) => {
    return items.some((item) => item.course.id === courseId);
  };

  const totalItems = items.length;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
