"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  inStock: boolean;
  stock: number;
}

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  decreaseQuantity: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Initial state from localStorage, if available
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cartItems");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Add to Cart (only if the product is in stock)
  const addToCart = (item: CartItem) => {
    if (!item.inStock) {
      console.log("Cannot add out-of-stock product to cart.");
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  // Remove from Cart
  const removeFromCart = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.id !== id)
    );
  };

  // Clear Cart
  const clearCart = () => setCartItems([]);

  // Decrease Quantity in Cart
  const decreaseQuantity = (id: string) => {
    setCartItems((prevItems) =>
      prevItems
        .map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
