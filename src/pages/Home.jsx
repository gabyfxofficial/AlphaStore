import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

function Home() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center px-4">
      {/* 🔹 Hero Section */}
      <section className="text-center">
        <motion.h1
          className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Welcome to Alpha Store
        </motion.h1>
        <motion.p
          className="text-lg text-gray-300 mt-4 max-w-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Discover the latest trends and upgrade your wardrobe today.
        </motion.p>
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <Link
            to="/products"
            onClick={handleClick}
            className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-blue-600/50 border border-white/20 bg-gradient-to-r from-blue-600 to-indigo-600"
          >
            <span className="text-lg flex items-center gap-2 relative z-10">
              <ShoppingBag className="w-5 h-5" /> Explore Products
            </span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
              <div className="relative h-full w-10 bg-white/30"></div>
            </div>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

export default Home;
