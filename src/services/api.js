// src/services/api.js

const BASE_URL = "https://fakestoreapi.com";

// Funcția pentru a obține produsele
export const getProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Funcția pentru a obține un produs pe baza ID-ului
export const getProductDetails = async (productId) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
};

// Funcția pentru autentificare (login)
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
};
