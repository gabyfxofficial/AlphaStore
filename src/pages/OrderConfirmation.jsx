import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clipboard } from "lucide-react";

function OrderConfirmation() {
  // Example order ID; replace with actual order ID as needed.
  const orderId = "ORD-1742334739835";

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        className="max-w-2xl bg-gray-800 p-12 rounded-lg shadow-lg border border-gray-700 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-[0_0_10px_rgba(59,130,246,0.7)] mb-6">
          Order Confirmed
        </motion.h1>
        <div className="mt-6 h-1 w-48 mx-auto bg-gradient-to-r from-blue-500 to-blue-300 rounded-full shadow-[0_0_15px_5px_rgba(59,130,246,0.5)]"></div>
        <p className="text-lg mt-6 mb-8">
          Thank you for your order! Your order has been placed successfully. You
          will receive an email confirmation shortly.
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <Link
            onClick={scrollToTop}
            to="/"
            className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-blue-600/50 border border-white/20 bg-gradient-to-r from-blue-600 to-indigo-600"
          >
            <span className="relative z-10 flex items-center gap-2">
              <ArrowLeft size={18} />
              Back to Home
            </span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
              <div className="relative h-full w-10 bg-white/30"></div>
            </div>
          </Link>
          <Link
            onClick={scrollToTop}
            to={`/my-account`}
            className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-blue-600/50 border border-white/20 bg-gradient-to-r from-blue-600 to-indigo-600"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Clipboard size={18} />
              View Order
            </span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
              <div className="relative h-full w-10 bg-white/30"></div>
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default OrderConfirmation;
