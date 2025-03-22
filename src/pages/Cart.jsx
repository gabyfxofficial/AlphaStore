import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, CreditCard, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  // Inițializare: discountul nu se aplică automat
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountError, setDiscountError] = useState("");

  // Calculate total price and discounted total
  const totalPrice = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);
  const discountedTotal = (
    totalPrice -
    totalPrice * (discountPercent / 100)
  ).toFixed(2);

  const handleQuantityChange = (id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const truncateTitle = (title) =>
    title.length > 25 ? `${title.substring(0, 25)}...` : title;

  const handleApplyDiscount = () => {
    // Reset discount error la început
    setDiscountError("");
    // Dacă discount code-ul introdus este "SPRING" și discountul nu a fost aplicat, se aplică reducerea de 30%
    if (discountCode.trim().toUpperCase() === "SPRING" && !discountApplied) {
      setDiscountPercent(30);
      setDiscountApplied(true);
    } else {
      setDiscountError("Invalid discount code or voucher already used.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (cart.length === 0) {
    return (
      <motion.div
        className="mt-10 w-full p-4 sm:p-8 max-w-4xl mx-auto bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-2xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-white drop-shadow-[0_0_10px_rgba(59,130,246,0.7)] text-center mb-6"
          variants={itemVariants}
        >
          Shopping Cart
        </motion.h2>
        <div className="mt-4 h-1 w-48 mx-auto bg-gradient-to-r from-blue-500 to-blue-300 rounded-full shadow-[0_0_15px_5px_rgba(59,130,246,0.5)]"></div>
        <div className="mt-8"></div>
        <motion.p
          className="text-center text-gray-300 text-base sm:text-lg"
          variants={itemVariants}
        >
          Your cart is empty.
        </motion.p>
        <div className="mt-6 flex justify-center">
          <Link
            onClick={scrollToTop}
            to="/products"
            className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-green-600/50 border border-white/20"
          >
            <ShoppingBag size={18} className="mr-2 relative z-10" />
            <span className="relative z-10">Continue Shopping</span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
              <div className="relative h-full w-10 bg-white/30"></div>
            </div>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="mt-10 w-full p-4 sm:p-8 max-w-4xl mx-auto bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-2xl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Title */}
      <motion.h2
        className="text-4xl sm:text-5xl font-bold text-white drop-shadow-[0_0_10px_rgba(59,130,246,0.7)] text-center mb-6"
        variants={itemVariants}
      >
        Shopping Cart
      </motion.h2>
      <div className="mt-4 h-1 w-48 mx-auto bg-gradient-to-r from-blue-500 to-blue-300 rounded-full shadow-[0_0_15px_5px_rgba(59,130,246,0.5)]"></div>
      <div className="mt-8"></div>

      {/* Cart Items */}
      <div className="space-y-6">
        {cart.map((item) => (
          <motion.div
            key={item.id}
            className="group flex flex-col sm:flex-row items-center bg-gray-800 p-4 rounded-lg shadow-lg w-full transition-shadow duration-300 hover:shadow-2xl"
            variants={itemVariants}
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-contain transition-all duration-300 group-hover:brightness-110"
              />
            </div>
            <div className="flex-grow sm:ml-6 mt-4 sm:mt-0 w-full">
              <h3 className="text-sm sm:text-base md:text-2xl font-semibold text-white truncate">
                {truncateTitle(item.title)}
              </h3>
              <p className="text-sm sm:text-lg text-gray-300 mt-1">
                ${item.price}
              </p>
              <div className="mt-2">
                <span className="text-xs sm:text-sm text-gray-400">
                  Category:{" "}
                  <span className="font-medium text-gray-200">
                    {item.category}
                  </span>
                </span>
              </div>
              <div className="mt-3 flex items-center space-x-2">
                <label
                  htmlFor={`quantity-${item.id}`}
                  className="text-xs sm:text-sm text-gray-300"
                >
                  Quantity:
                </label>
                <input
                  id={`quantity-${item.id}`}
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                  className="w-12 p-1 rounded-lg border border-gray-400 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-4">
              <button
                onClick={() =>
                  dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
                }
                className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-3 py-2 text-xs sm:text-sm font-bold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-red-600/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <Trash2 size={16} className="mr-1 relative z-10" />
                <span className="relative z-10">Remove</span>
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                  <div className="relative h-full w-10 bg-white/30"></div>
                </div>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Discount Code Section */}
      <motion.div className="mt-6" variants={itemVariants}>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            placeholder="Enter discount code"
            className="p-2 rounded border border-gray-400 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleApplyDiscount}
            className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-blue-500/30 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-blue-600/50 border border-white/20"
          >
            <CheckCircle size={18} className="mr-2 relative z-10" />
            <span className="text-lg relative z-10">Apply</span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
              <div className="relative h-full w-10 bg-white/30"></div>
            </div>
          </button>
        </div>
        {discountError && (
          <p className="text-red-500 text-sm mt-2">{discountError}</p>
        )}
        {discountApplied && (
          <p className="text-green-400 mt-2">
            Discount applied: {discountPercent}% off!
          </p>
        )}
      </motion.div>

      {/* Total Price Section */}
      <motion.div
        className="w-full bg-gray-800 p-4 rounded-lg shadow-lg mt-6"
        variants={itemVariants}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h3 className="text-base sm:text-lg font-semibold text-white">
            Total Price
          </h3>
          {discountApplied ? (
            <div className="text-base sm:text-lg font-bold text-white text-right">
              <p className="line-through text-gray-400">${totalPrice}</p>
              <p>${discountedTotal}</p>
            </div>
          ) : (
            <p className="text-base sm:text-lg font-bold text-white">
              ${totalPrice}
            </p>
          )}
        </div>
      </motion.div>

      {/* Bottom Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-3 sm:space-y-0"
        variants={itemVariants}
      >
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => dispatch({ type: "CLEAR_CART" })}
            className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-red-600/50 border border-white/20"
          >
            <Trash2 size={18} className="mr-2 relative z-10" />
            <span className="relative z-10">Clear Cart</span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
              <div className="relative h-full w-10 bg-white/30"></div>
            </div>
          </button>
          <Link
            onClick={scrollToTop}
            to="/products"
            className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-green-600/50 border border-white/20"
          >
            <ShoppingBag size={18} className="mr-2 relative z-10" />
            <span className="relative z-10">Continue Shopping</span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
              <div className="relative h-full w-10 bg-white/30"></div>
            </div>
          </Link>
        </div>
        <Link
          onClick={scrollToTop}
          to="/checkout"
          className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2 text-xs sm:text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-blue-600/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <CreditCard size={18} className="mr-2 relative z-10" />
          <span className="relative z-10">Checkout</span>
          <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
            <div className="relative h-full w-10 bg-white/30"></div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default Cart;
