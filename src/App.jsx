import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./context/store";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import CardPayment from "./pages/CardPayment";
import BankTransfer from "./pages/BankTransfer";
import OrderConfirmation from "./pages/OrderConfirmation";
import MyAccount from "./pages/MyAccount";
import OrderView from "./pages/OrderView";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ForgotPassword from "./pages/ForgotPassword";
import About from "./pages/About";
import TermsAndConditions from "./pages/TermsAndConditions";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import ChatBox from "./components/ChatBox";

function App() {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/forgot-password"];

  const isAuthenticated = Boolean(localStorage.getItem("authToken"));
  if (!isAuthenticated && !hideNavbarPaths.includes(location.pathname)) {
    return <Navigate to="/login" />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CartProvider>
          <WishlistProvider>
            {/* Render ChatBox only if not on the login page */}
            {location.pathname !== "/login" && (
              <div className="fixed top-4 right-4 z-50">
                <ChatBox />
              </div>
            )}
            <div className="min-h-screen flex flex-col">
              {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/card-payment" element={<CardPayment />} />
                  <Route path="/bank-transfer" element={<BankTransfer />} />
                  <Route
                    path="/order-confirmation"
                    element={<OrderConfirmation />}
                  />
                  <Route path="/my-account" element={<MyAccount />} />
                  <Route path="/order/:orderId" element={<OrderView />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/terms" element={<TermsAndConditions />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </WishlistProvider>
        </CartProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
