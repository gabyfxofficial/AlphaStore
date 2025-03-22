import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Calendar, DollarSign, CheckCircle } from "lucide-react";

function OrderHistory() {
  const orders = useSelector((state) => state.orderHistory.orders);
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Variante pentru animații
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  // Filtrarea comenzilor folosind valorile din filtre
  const filteredOrders = orders.filter((order) => {
    let match = true;
    if (filterDate) {
      // Transformăm data comenzii în format "YYYY-MM-DD"
      const orderDateISO = new Date(order.date).toISOString().slice(0, 10);
      match = match && orderDateISO === filterDate;
    }
    if (filterStatus) {
      match =
        match &&
        order.status.toLowerCase().includes(filterStatus.toLowerCase());
    }
    return match;
  });

  // Funcție de resetare a filtrelor
  const resetFilters = () => {
    setFilterDate("");
    setFilterStatus("");
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="w-full max-w-3xl px-4">
        {/* Secțiune modernă de filtre, mică și centrată */}
        <div className="mb-8 p-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="flex flex-col">
              <label className="text-sm text-gray-300 mb-1">Date</label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="p-3 rounded-lg bg-gray-600 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-300 mb-1">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="p-3 rounded-lg bg-gray-600 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">All</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
          {/* Butonul "Reset", mutat 3px mai jos */}
          <button
            onClick={resetFilters}
            className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-colors duration-300 mt-5"
          >
            RESET
          </button>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center text-gray-400">No orders found.</div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <motion.div
                key={order.id}
                className="bg-gray-800 rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8"
                variants={cardVariants}
              >
                {/* Detalii comandă */}
                <div className="flex flex-col items-center text-center">
                  <p className="text-xl text-white font-semibold">
                    Order #{order.id}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center mt-2 space-y-1 sm:space-y-0 sm:space-x-4">
                    <div className="flex items-center text-gray-300">
                      <Calendar className="mr-1" size={16} />
                      <span className="text-sm">Date: {order.date}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <DollarSign className="mr-1" size={16} />
                      <span className="text-sm">Total: ${order.total}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="mr-1" size={16} />
                      <span className="text-sm">Status: {order.status}</span>
                    </div>
                  </div>
                </div>
                {/* Butonul "View Details" */}
                <div className="flex justify-center">
                  <Link
                    to={`/order/${order.id}`}
                    className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-blue-500/30 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-blue-600/50 border border-white/20"
                  >
                    <span className="text-lg relative z-10">View Details</span>
                    <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                      <div className="relative h-full w-10 bg-white/30"></div>
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default OrderHistory;
