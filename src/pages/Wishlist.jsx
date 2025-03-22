import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { ShoppingCart, Trash2, Star } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";

function Wishlist() {
  const dispatch = useDispatch();
  const { wishlist, removeFromWishlist } = useWishlist();

  const handleMoveToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
    removeFromWishlist(item.id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const truncateTitle = (title, maxLength = 25) =>
    title.length > maxLength ? title.substring(0, maxLength) + "..." : title;

  return (
    <motion.div
      className="container mx-auto p-6 sm:p-10 flex flex-col items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-6 sm:p-10 shadow-lg w-full max-w-5xl">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-white drop-shadow-[0_0_10px_rgba(59,130,246,0.7)] text-center"
          variants={cardVariants}
        >
          Your Wishlist
        </motion.h2>
        <div className="mt-4 h-1 w-48 mx-auto bg-gradient-to-r from-blue-500 to-blue-300 rounded-full shadow-[0_0_15px_5px_rgba(59,130,246,0.5)]"></div>
        <div className="mt-8"></div>

        {wishlist.length === 0 ? (
          <motion.p
            className="text-center text-gray-300"
            variants={cardVariants}
          >
            Your wishlist is empty.
          </motion.p>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {wishlist.map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                className="product-card bg-gradient-to-b from-[#121c2a] to-[#0f172a] rounded-3xl shadow-xl overflow-hidden flex flex-col transition duration-300 hover:shadow-2xl hover:scale-[1.02] border border-gray-700"
              >
                <div className="relative h-3/5 overflow-hidden cursor-pointer">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
                </div>
                <div className="flex flex-col justify-between flex-grow px-4 py-2 text-center overflow-hidden">
                  <h3 className="text-lg font-semibold text-gray-100 mb-1 cursor-pointer truncate">
                    {truncateTitle(item.title)}
                  </h3>
                  <div className="flex justify-center items-center gap-2 text-yellow-400 mb-2">
                    <Star size={16} />
                    <span className="text-sm">
                      {item.rating ? item.rating.rate.toFixed(1) : "N/A"}
                    </span>
                  </div>
                  <span className="text-lg font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-2">
                    ${item.price}
                  </span>
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-2 py-1 rounded-full shadow-md hover:scale-105 transition duration-300"
                    >
                      <ShoppingCart size={18} /> Add
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-pink-700 text-white px-2 py-1 rounded-full shadow-md hover:scale-105 transition duration-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Wishlist;
