// src/components/ProductExtras.jsx
import { motion } from "framer-motion";
import { Star } from "lucide-react";

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

function ProductExtras({ product }) {
  const rowVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const descriptionRows = () => {
    switch (product.category) {
      case "men's clothing":
        return [
          { feature: "Fit", value: "Regular fit", details: "Ideal for everyday wear" },
          { feature: "Material", value: "100% Cotton", details: "Soft and breathable" },
          { feature: "Style", value: "Casual", details: "Daily use style" },
          { feature: "Care", value: "Machine wash", details: "Easy to clean" },
          { feature: "Origin", value: "Italy", details: "High quality" },
        ];
      case "women's clothing":
        return [
          { feature: "Fit", value: "Slim fit", details: "Accentuates curves" },
          { feature: "Material", value: "Premium Blend", details: "Comfort & durability" },
          { feature: "Style", value: "Elegant", details: "Formal use" },
          { feature: "Care", value: "Hand wash", details: "Better fabric protection" },
          { feature: "Origin", value: "France", details: "Design excellence" },
        ];
      default:
        return [
          { feature: "Category", value: product.category, details: "General info" },
          { feature: "Description", value: product.description, details: "Product overview" },
        ];
    }
  };

  return (
    <>
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
                  transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
                >
                  <td className="px-4 py-2 text-center">{row.feature}</td>
                  <td className="px-4 py-2 text-center">{row.value}</td>
                  <td className="px-4 py-2 text-center">{row.details}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div
        className="mt-10 p-6 bg-gray-900 rounded-lg shadow-md border border-gray-700"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        transition={{ duration: 1, delay: 0.7 }}
      >
        <h3 className="text-2xl font-bold mb-4 text-center text-gray-100">Product Description</h3>
        <p className="text-gray-300 text-lg leading-relaxed text-center">{product.description}</p>
      </motion.div>

      <motion.div
        className="mt-10 p-6 bg-gray-800 rounded-lg shadow-md border border-gray-700"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        transition={{ duration: 1, delay: 0.9 }}
      >
        <h3 className="text-2xl font-bold mb-4 text-center text-gray-100">Customer Reviews</h3>
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
              <div className="text-gray-500 text-sm mt-2 text-right">{review.date}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}

export default ProductExtras;
