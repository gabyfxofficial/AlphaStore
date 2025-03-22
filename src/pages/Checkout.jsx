import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  CreditCard,
  User,
  Mail,
  Phone,
  MapPin,
  Home,
  Tag,
  Truck,
  Inbox,
  DollarSign,
  Banknote,
  Package,
} from "lucide-react";

function Checkout() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.items);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!phone.trim()) newErrors.phone = "Phone number is required.";
    if (!address.trim()) newErrors.address = "Address is required.";
    if (!city.trim()) newErrors.city = "City is required.";
    if (!zip.trim()) newErrors.zip = "ZIP Code is required.";
    if (!deliveryMethod)
      newErrors.deliveryMethod = "Please select a delivery method.";
    if (!paymentMethod)
      newErrors.paymentMethod = "Please select a payment method.";
    if (!termsAccepted)
      newErrors.termsAccepted = "You must accept the Terms and Conditions.";
    if (cart.length === 0)
      newErrors.cart = "Your cart is empty. Please add items before checkout.";
    return newErrors;
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    // Check if cart is empty
    if (cart.length === 0) {
      setErrors({
        cart: "Your cart is empty. Please add items before checkout.",
      });
      return;
    }

    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    }

    // Calculate order total
    const orderTotal = cart
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);

    // Create order object
    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      total: orderTotal,
      status: "Processing",
      deliveryDetails: {
        fullName,
        email,
        phone,
        address,
        city,
        zip,
        deliveryMethod,
        paymentMethod,
      },
      items: cart,
    };

    // Add order and clear cart
    dispatch({ type: "ADD_ORDER", payload: newOrder });
    dispatch({ type: "CLEAR_CART" });
    scrollToTop();

    if (paymentMethod === "creditCard") {
      navigate("/card-payment");
    } else if (paymentMethod === "bankTransfer") {
      navigate("/bank-transfer");
    } else if (paymentMethod === "cash") {
      navigate("/order-confirmation");
    }
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center p-4 mt-[3px]">
      {/* Adăugăm noValidate pentru a dezactiva validarea nativă */}
      <form
        noValidate
        onSubmit={handleCheckout}
        className="w-full max-w-lg bg-gray-800 p-10 rounded-lg shadow-lg border border-gray-700"
      >
        {/* Titlu Checkout cu design similar cu Shopping Cart */}
        <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-[0_0_10px_rgba(59,130,246,0.7)] text-center mb-6">
          Checkout
        </h1>
        <div className="mt-4 h-1 w-48 mx-auto bg-gradient-to-r from-blue-500 to-blue-300 rounded-full shadow-[0_0_15px_5px_rgba(59,130,246,0.5)]"></div>
        <div className="mb-10"></div>

        {/* Mesaj de eroare pentru coșul gol */}
        {errors.cart && (
          <p className="text-red-500 text-sm text-center mb-4">{errors.cart}</p>
        )}

        {/* Delivery Details */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            <Package size={20} className="inline mr-2 text-blue-500" /> Delivery
            Details
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              <User size={16} className="inline mr-1 text-blue-500" /> Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className="w-full p-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              <Mail size={16} className="inline mr-1 text-blue-500" /> Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john.doe@example.com"
              className="w-full p-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              <Phone size={16} className="inline mr-1 text-blue-500" /> Phone
              Number
            </label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="1234567890"
              className="w-full p-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              <MapPin size={16} className="inline mr-1 text-blue-500" /> Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Main St"
              className="w-full p-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                <Home size={16} className="inline mr-1 text-blue-500" /> City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="w-full p-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                <Tag size={16} className="inline mr-1 text-blue-500" /> ZIP Code
              </label>
              <input
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="ZIP Code"
                className="w-full p-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.zip && (
                <p className="text-red-500 text-sm mt-1">{errors.zip}</p>
              )}
            </div>
          </div>
        </div>

        {/* Delivery Method */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            <Truck size={20} className="inline mr-2 text-blue-500" /> Delivery
            Method
          </h2>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="courier"
              name="deliveryMethod"
              value="courier"
              checked={deliveryMethod === "courier"}
              onChange={(e) => setDeliveryMethod(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="courier" className="text-lg">
              Courier Delivery
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="easybox"
              name="deliveryMethod"
              value="easybox"
              checked={deliveryMethod === "easybox"}
              onChange={(e) => setDeliveryMethod(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="easybox" className="text-lg">
              Easybox Delivery
            </label>
          </div>
          {errors.deliveryMethod && (
            <p className="text-red-500 text-sm mt-1">{errors.deliveryMethod}</p>
          )}
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            <CreditCard size={20} className="inline mr-2 text-blue-500" />{" "}
            Payment Method
          </h2>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="creditCard"
              name="paymentMethod"
              value="creditCard"
              checked={paymentMethod === "creditCard"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="creditCard" className="text-lg">
              Credit Card
            </label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="cash"
              name="paymentMethod"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="cash" className="text-lg">
              Cash
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="bankTransfer"
              name="paymentMethod"
              value="bankTransfer"
              checked={paymentMethod === "bankTransfer"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="bankTransfer" className="text-lg">
              Bank Transfer
            </label>
          </div>
          {errors.paymentMethod && (
            <p className="text-red-500 text-sm mt-1">{errors.paymentMethod}</p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="mb-6 flex flex-col">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mr-2 h-5 w-5 accent-blue-500"
              required
            />
            <label htmlFor="terms" className="text-lg">
              I accept the{" "}
              <Link to="/terms" className="text-blue-500 underline">
                Terms and Conditions
              </Link>
            </label>
          </div>
          {errors.termsAccepted && (
            <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>
          )}
        </div>

        {/* Place Order Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            onClick={scrollToTop}
            className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-blue-600/50 border border-white/20 bg-gradient-to-r from-blue-600 to-indigo-600 w-1/2"
          >
            <span className="relative z-10 flex items-center gap-2">
              <CreditCard size={18} />
              Place Order
            </span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
              <div className="relative h-full w-10 bg-white/30"></div>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
