import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaUniversity } from "react-icons/fa";

function CardAccount() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [showCVV, setShowCVV] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/users/1")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-gray-300">Loading card...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!user || !user.bank) {
    return <div className="text-gray-300">No card data found.</div>;
  }

  return (
    <motion.div
      className="max-w-sm mx-auto p-6 bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-2xl shadow-2xl text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative" style={{ perspective: "1000px" }}>
        <motion.div
          className="relative h-[176px] w-[272px] flex flex-col justify-between px-4 py-4 rounded-3xl gap-4 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 cursor-pointer"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.8 }}
          onClick={() => setFlipped(!flipped)}
        >
          {/* Front Side */}
          <div
            className="absolute inset-0 p-4 flex flex-col justify-between"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Top zone: Icon */}
            <div className="flex justify-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 58 36"
                className="h-8 w-8"
              >
                <circle
                  fillOpacity="0.62"
                  fill="#F9CCD1"
                  r="18"
                  cy="18"
                  cx="18"
                />
                <circle fill="#424242" r="18" cy="18" cx="40" opacity="0.36" />
              </svg>
            </div>
            {/* Central zone: Card Number */}
            <div className="flex justify-center">
              <p className="text-2xl font-medium -mt-2">
                {user.bank.cardNumber}
              </p>
            </div>
            {/* Bottom zone: Card Holder & Valid Date */}
            <div className="flex justify-between items-end">
              <p className="text-lg font-medium">
                {user.firstName} {user.lastName}
              </p>
              <div className="text-right">
                <p className="text-xs">Valid Date</p>
                <p className="text-sm font-medium">{user.bank.cardExpire}</p>
              </div>
            </div>
          </div>
          {/* Back Side */}
          <div
            className="absolute inset-0 p-4 flex flex-col justify-between gap-2"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {/* Top area: "AlphaBank" text with icon */}
            <div className="flex items-center justify-center gap-2">
              <FaUniversity size={20} />
              <p className="text-lg font-bold">AlphaBank</p>
            </div>
            {/* CVV area: text and toggle icon inline */}
            <div className="flex items-center justify-center gap-2">
              <p className="text-lg font-medium">
                CVV: {showCVV ? "123" : "•••"}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCVV(!showCVV);
                }}
                className="cursor-pointer"
              >
                {showCVV ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {/* Bottom stripe: IBAN */}
            <div className="w-full h-8 bg-gray-800 rounded-md flex items-center justify-center">
              <p className="text-xs">{user.bank.iban}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default CardAccount;
