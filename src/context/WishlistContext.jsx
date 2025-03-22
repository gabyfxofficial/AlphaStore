import { createContext, useState, useContext } from "react";

const WishlistContext = createContext();

export function useWishlist() {
  return useContext(WishlistContext);
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  function addToWishlist(product) {
    setWishlist((prevWishlist) => {
      // Dacă produsul există deja, returnăm starea curentă fără modificări
      if (prevWishlist.find((item) => item.id === product.id)) {
        return prevWishlist;
      }
      return [...prevWishlist, product];
    });
  }

  function removeFromWishlist(id) {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((product) => product.id !== id)
    );
  }

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
