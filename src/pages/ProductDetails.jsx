import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import {
  Star,
  Truck,
  BadgeCheck,
  RotateCw,
  Layers,
  ShoppingCart,
  Package,
  CheckCircle,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  // Array de recenzii pentru demonstrație
  const reviews = [
    {
      id: 1,
      author: "John Doe",
      rating: 4,
      comment: "Great product, very comfortable and fits perfectly.",
      date: "2025-01-10",
    },
    {
      id: 2,
      author: "Jane Smith",
      rating: 5,
      comment: "I absolutely love this! Excellent quality.",
      date: "2025-02-15",
    },
    {
      id: 3,
      author: "Alex Johnson",
      rating: 3,
      comment: "It’s good, but the sizing is a bit off.",
      date: "2025-03-05",
    },
  ];

  // Scroll to top la montarea componentei
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return (
      <p className="text-center text-gray-300 text-xl animate-pulse mt-20">
        Loading...
      </p>
    );
  }

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const handleAddToCart = () => {
    addToCart({ ...product, selectedSize, quantity });
    alert("Added to Cart!");
  };

  const handleAddToWishlist = () => {
    addToWishlist({ ...product, selectedSize });
    alert("Added to Wishlist!");
  };

  // Funcție pentru afișarea rândurilor de descriere în funcție de categorie
  const descriptionRows = () => {
    switch (product.category) {
      case "men's clothing":
        return [
          {
            feature: "Fit",
            value: "Regular fit",
            details: "Ideal for everyday casual wear",
          },
          {
            feature: "Material",
            value: "100% Cotton",
            details: "Soft, breathable, and durable",
          },
          {
            feature: "Style",
            value: "Casual",
            details: "Versatile look for daily use",
          },
          {
            feature: "Care",
            value: "Machine wash cold",
            details: "Easy maintenance",
          },
          {
            feature: "Origin",
            value: "Made in Italy",
            details: "High-quality craftsmanship",
          },
        ];
      case "women's clothing":
        return [
          {
            feature: "Fit",
            value: "Slim fit",
            details: "Tailored to accentuate curves",
          },
          {
            feature: "Material",
            value: "Premium Blend",
            details: "Comfortable and durable",
          },
          {
            feature: "Style",
            value: "Elegant",
            details: "Suitable for formal occasions",
          },
          {
            feature: "Care",
            value: "Hand wash recommended",
            details: "Maintain fabric quality",
          },
          {
            feature: "Origin",
            value: "Designed in France",
            details: "Exquisite design details",
          },
        ];
      case "jewelery":
        return [
          {
            feature: "Material",
            value: "Sterling Silver",
            details: "High-quality and hypoallergenic",
          },
          {
            feature: "Craftsmanship",
            value: "Handcrafted",
            details: "Unique, artisanal design",
          },
          {
            feature: "Occasion",
            value: "Formal",
            details: "Perfect for weddings and events",
          },
          {
            feature: "Care",
            value: "Regular polishing",
            details: "Maintain its shine",
          },
          {
            feature: "Origin",
            value: "Made in the USA",
            details: "Exclusively designed",
          },
        ];
      case "electronics":
        return [
          {
            feature: "Brand",
            value: "Acme",
            details: "Leading-edge technology",
          },
          {
            feature: "Warranty",
            value: "1 Year",
            details: "Manufacturer warranty",
          },
          {
            feature: "Features",
            value: "Latest tech",
            details: "Innovative design and performance",
          },
          {
            feature: "Power",
            value: "Battery included",
            details: "Long-lasting battery life",
          },
          {
            feature: "Connectivity",
            value: "Wi-Fi, Bluetooth",
            details: "Multiple connectivity options",
          },
        ];
      default:
        return [
          {
            feature: "Category",
            value: product.category,
            details: "General product information",
          },
          {
            feature: "Description",
            value: product.description,
            details: "Detailed overview",
          },
        ];
    }
  };

  // Variants pentru animații
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const rowVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
      {/* Secțiunea principală a produsului */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        transition={{ duration: 1 }}
      >
        {/* Imaginea produsului */}
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

        {/* Detaliile produsului */}
        <motion.div
          className="text-center lg:text-left"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-100 mb-3">
            {product.title}
          </h2>
          <div className="flex justify-center lg:justify-start items-center gap-2 text-yellow-400 mb-4">
            <Star /> {product.rating?.rate || "N/A"} (
            {product.rating?.count || "0"} reviews)
          </div>
          <p className="text-3xl font-bold text-red-500 mb-5">
            ${product.price}
          </p>
          <div className="space-y-4">
            {/* Afișează secțiunea de mărimi dacă produsul nu este bijuterie sau electronică */}
            {!(
              product.category === "jewelery" ||
              product.category === "electronics"
            ) && (
              <div>
                <h3 className="text-lg font-semibold text-gray-200 flex items-center justify-center lg:justify-start gap-2 mb-2">
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

            {/* Secțiunea de cantitate */}
            <div>
              <h3 className="text-lg font-semibold text-gray-200 flex items-center justify-center lg:justify-start gap-2 mb-2">
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

            {/* Detalii suplimentare */}
            <div className="text-gray-200 space-y-2 mt-4">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <Package size={20} className="text-[#2563eb]" /> Material:{" "}
                <span className="font-semibold">100% Cotton</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <CheckCircle size={20} className="text-green-500" />{" "}
                Availability: <span className="font-semibold">In Stock</span>
              </div>
            </div>

            {/* Butoanele de acțiune */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-6">
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#2563eb] to-[#1e40af] hover:from-[#1e40af] hover:to-[#1e40af] text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition duration-300 hover:scale-105"
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>
              <button
                onClick={handleAddToWishlist}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-300 hover:scale-105"
              >
                <Heart size={20} /> Add to Wishlist
              </button>
            </div>

            {/* Shipping & Returns */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6 text-gray-300 mt-6">
              <div className="flex items-center gap-2">
                <Truck size={20} className="text-[#2563eb]" /> Free Shipping
              </div>
              <div className="flex items-center gap-2">
                <RotateCw size={20} className="text-[#2563eb]" /> 30-Day Returns
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Informații suplimentare despre produs */}
      <motion.div
        className="mt-10 flex justify-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="w-full max-w-4xl p-6 bg-gray-800 rounded-lg shadow-md border border-gray-700">
          <h3 className="text-2xl font-bold mb-4 text-center text-gray-100">
            Additional Product Information
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-4 py-2 border-b text-center">Feature</th>
                  <th className="px-4 py-2 border-b text-center">Value</th>
                  <th className="px-4 py-2 border-b text-center">Details</th>
                </tr>
              </thead>
              <tbody>
                {descriptionRows().map((row, index) => (
                  <motion.tr
                    key={index}
                    className="border-b"
                    initial="hidden"
                    animate="visible"
                    variants={rowVariants}
                    transition={{
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
                    <td className="px-4 py-2 text-center">{row.feature}</td>
                    <td className="px-4 py-2 text-center">{row.value}</td>
                    <td className="px-4 py-2 text-center">{row.details}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Descriere detaliată a produsului */}
      <motion.div
        className="mt-10 p-6 bg-gray-900 rounded-lg shadow-md border border-gray-700"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        transition={{ duration: 1, delay: 0.7 }}
      >
        <h3 className="text-2xl font-bold mb-4 text-center text-gray-100">
          Product Description
        </h3>
        <p className="text-gray-300 text-lg leading-relaxed text-center">
          {product.description}
        </p>
      </motion.div>

      {/* Recenzii ale clienților */}
      <motion.div
        className="mt-10 p-6 bg-gray-800 rounded-lg shadow-md border border-gray-700"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        transition={{ duration: 1, delay: 0.9 }}
      >
        <h3 className="text-2xl font-bold mb-4 text-center text-gray-100">
          Customer Reviews
        </h3>
        <div className="space-y-4">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              className="p-4 bg-gray-900 rounded-lg shadow-sm border border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 * review.id, duration: 0.5 }}
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold text-white">{review.author}</div>
                <div className="flex items-center text-yellow-400">
                  <Star size={16} />
                  <span className="ml-1">{review.rating}</span>
                </div>
              </div>
              <p className="text-gray-300 text-lg mt-2">{review.comment}</p>
              <div className="text-gray-500 text-sm mt-2 text-right">
                {review.date}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default ProductDetails;
