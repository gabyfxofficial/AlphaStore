import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import {
  Layers,
  BadgeCheck,
  Package,
  CheckCircle,
  ShoppingCart,
  Heart,
  Truck,
  RotateCw,
} from "lucide-react";
import { motion } from "framer-motion";
import ProductExtras from "../components/ProductExtras";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ ...product, selectedSize, quantity });
  };

  const handleAddToWishlist = () => {
    addToWishlist({ ...product, selectedSize });
  };

  if (!product) {
    return (
      <p className="text-center text-gray-300 text-xl animate-pulse mt-20">
        Loading...
      </p>
    );
  }

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        transition={{ duration: 1 }}
      >
        <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-4 rounded-2xl shadow-xl flex justify-center">
          <motion.img
            src={product.image}
            alt={product.title}
            className="max-h-[380px] object-contain transition duration-500 hover:scale-105"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>

        <motion.div
          className="text-center lg:text-left"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-100 mb-3">{product.title}</h2>
          <p className="text-3xl font-bold text-red-500 mb-5">${product.price}</p>

          {!["jewelery", "electronics"].includes(product.category) && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2 mb-2">
                <Layers size={20} className="text-[#2563eb]" /> Sizes
              </h3>
              <div className="flex gap-2 justify-center lg:justify-start flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-3 py-1 rounded-md border-2 transition duration-300 ${
                      selectedSize === size
                        ? "bg-[#2563eb] border-[#2563eb] text-white"
                        : "border-gray-500 text-gray-300 hover:border-[#2563eb]"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2 mb-2">
              <BadgeCheck size={20} className="text-[#2563eb]" /> Quantity
            </h3>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-24 px-3 py-2 bg-gray-800 border border-gray-600 rounded-xl text-white"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-6">
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#2563eb] to-[#1e40af] text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition duration-300 hover:scale-105"
            >
              <ShoppingCart size={20} /> Add to Cart
            </button>
            <button
              onClick={handleAddToWishlist}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-300 hover:scale-105"
            >
              <Heart size={20} /> Add to Wishlist
            </button>
          </div>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6 text-gray-300 mt-6">
            <div className="flex items-center gap-2">
              <Truck size={20} className="text-[#2563eb]" /> Free Shipping
            </div>
            <div className="flex items-center gap-2">
              <RotateCw size={20} className="text-[#2563eb]" /> 30-Day Returns
            </div>
          </div>

          <div className="text-gray-200 space-y-2 mt-4">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <Package size={20} className="text-[#2563eb]" /> Material:{" "}
              <span className="font-semibold">100% Cotton</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <CheckCircle size={20} className="text-green-500" /> Availability:{" "}
              <span className="font-semibold">In Stock</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <ProductExtras product={product} />
    </div>
  );
}

export default ProductDetails;
