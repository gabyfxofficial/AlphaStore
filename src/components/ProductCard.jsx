import { useDispatch } from "react-redux";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCardClick = () => navigate(`/product/${product.id}`);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    dispatch({ type: "ADD_TO_WISHLIST", payload: product });
  };

  return (
    <div className="product-card bg-gradient-to-b from-[#121c2a] to-[#0f172a] rounded-3xl shadow-xl overflow-hidden flex flex-col transition duration-300 hover:shadow-2xl hover:scale-[1.02] border border-gray-700">
      {/* Imaginea – ocupă 60% din înălțime */}
      <div
        className="relative h-3/5 overflow-hidden cursor-pointer"
        onClick={handleCardClick}
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
      </div>
      {/* Conținutul cardului */}
      <div className="flex flex-col justify-between flex-grow px-4 py-2 text-center overflow-hidden">
        <h3
          className="text-lg font-semibold text-gray-100 mb-1 cursor-pointer truncate"
          onClick={handleCardClick}
        >
          {product.title}
        </h3>
        <div className="flex justify-center items-center gap-2 text-yellow-400 mb-2">
          <Star size={16} />
          <span className="text-sm">
            {product.rating?.rate?.toFixed(1) || "N/A"}
          </span>
        </div>
        <span className="text-lg font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-2">
          ${product.price}
        </span>
        <div className="flex justify-center gap-2">
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-2 py-1 rounded-full shadow-md hover:scale-105 transition duration-300"
          >
            <ShoppingCart size={18} /> Add
          </button>
          <button
            onClick={handleAddToWishlist}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-pink-700 text-white px-2 py-1 rounded-full shadow-md hover:scale-105 transition duration-300"
          >
            <Heart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
