import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);
      if (exists) {
        // Incrementează cantitatea dacă produsul există deja
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Adaugă produsul nou cu quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }

  function updateQuantity(id, quantity) {
    // Asigură că valoarea este minim 1
    if (quantity < 1) quantity = 1;
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }

  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
