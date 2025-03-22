import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Truck,
  Calendar,
  CheckCircle,
  DollarSign,
  Package,
  Circle,
  Headphones,
  MessageSquare,
  Star,
  ArrowLeft,
  Shield,
} from "lucide-react";

function OrderView() {
  const { orderId } = useParams();
  const orders = useSelector((state) => state.orderHistory.orders);
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return <div className="text-center text-white mt-10">Order not found.</div>;
  }

  // Convert the order date and estimate delivery date (+5 days)
  const orderDate = new Date(order.date);
  const estimatedDelivery = new Date(orderDate);
  estimatedDelivery.setDate(orderDate.getDate() + 5);
  const estimatedDeliveryStr = estimatedDelivery.toLocaleDateString();

  // Define the progress steps for the order
  const steps = [
    { label: "Processing", icon: CheckCircle },
    { label: "Shipped", icon: Truck },
    { label: "Delivered", icon: CheckCircle },
  ];
  const currentStepIndex = steps.findIndex(
    (step) => step.label.toLowerCase() === order.status.toLowerCase()
  );

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center p-4 sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header using default background */}
      <h1 className="text-4xl sm:text-5xl font-bold text-center text-white drop-shadow-[0_0_10px_rgba(59,130,246,0.7)]">
        Order Details
      </h1>
      <div className="mt-4 h-1 w-48 mx-auto bg-gradient-to-r from-blue-500 to-blue-300 rounded-full shadow-[0_0_15px_5px_rgba(59,130,246,0.5)]"></div>

      <div className="rounded-lg shadow-2xl w-full max-w-4xl p-6 space-y-8 mt-8">
        {/* Order Summary */}
        <div className="border-b border-gray-700 pb-4">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4 flex items-center gap-2">
            <Package size={24} className="text-blue-400" />
            Order Summary
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-400" />
              <span>
                <strong>Order ID:</strong> {order.id}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-yellow-400" />
              <span>
                <strong>Date:</strong> {order.date}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign size={18} className="text-green-400" />
              <span>
                <strong>Total:</strong> ${order.total}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={18} className="text-blue-300" />
              <span>
                <strong>Status:</strong> {order.status}
              </span>
            </div>
          </div>
        </div>

        {/* Order Progress Timeline */}
        <div className="border-b border-gray-700 pb-4">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4 flex items-center gap-2">
            Order Progress
          </h2>
          <div className="relative flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = index <= currentStepIndex ? step.icon : Circle;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center relative z-10"
                >
                  <Icon
                    size={28}
                    className={
                      index <= currentStepIndex
                        ? "text-green-400"
                        : "text-gray-500"
                    }
                  />
                  <span className="mt-2 text-sm text-gray-300">
                    {step.label}
                  </span>
                </div>
              );
            })}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-600 z-0"></div>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="border-b border-gray-700 pb-4">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4 flex items-center gap-2">
            <Truck size={24} className="text-blue-400" />
            Delivery Details
          </h2>
          <div className="space-y-2 text-gray-300 text-sm sm:text-base">
            <p className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-400" />
              <span>
                <strong>Name:</strong> {order.deliveryDetails.fullName}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-400" />
              <span>
                <strong>Email:</strong> {order.deliveryDetails.email}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-400" />
              <span>
                <strong>Phone:</strong> {order.deliveryDetails.phone}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-400" />
              <span>
                <strong>Address:</strong> {order.deliveryDetails.address},{" "}
                {order.deliveryDetails.city}, {order.deliveryDetails.zip}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Truck size={16} className="text-blue-400" />
              <span>
                <strong>Delivery Method:</strong>{" "}
                {order.deliveryDetails.deliveryMethod}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Truck size={16} className="text-blue-400" />
              <span>
                <strong>Payment Method:</strong>{" "}
                {order.deliveryDetails.paymentMethod}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Truck size={16} className="text-blue-400" />
              <span>
                <strong>Estimated Delivery:</strong> {estimatedDeliveryStr}
              </span>
            </p>
          </div>
        </div>

        {/* Order Guarantee Section */}
        <div className="border-b border-gray-700 pb-4">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4 flex items-center gap-1">
            <Shield size={24} className="text-blue-400" />
            <span>Order Guarantee</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base">
            Your order is guaranteed to arrive on time. If there's any delay,
            our support team will assist you promptly.
          </p>
        </div>

        {/* Products Section */}
        <div className="border-b border-gray-700 pb-4">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4 flex items-center gap-2">
            <Package size={24} className="text-blue-400" />
            Products
          </h2>
          {order.items && order.items.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-700 p-4 rounded-lg flex flex-col sm:flex-row items-center gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-contain rounded"
                  />
                  <div className="text-gray-300 text-sm sm:text-base">
                    <h3 className="font-bold">{item.title}</h3>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-300 text-sm sm:text-base">
              No products found in this order.
            </p>
          )}
        </div>

        {/* Customer Support Section */}
        <div className="border-t border-gray-700 pt-4">
          <h2 className="text-2xl font-semibold text-gray-100 mb-2 flex items-center gap-2">
            <Headphones size={24} className="text-blue-400" />
            Customer Support
          </h2>
          <p className="text-gray-300 text-sm sm:text-base">
            For any inquiries regarding your order, please contact our support
            at{" "}
            <a
              href="mailto:support@alphastore.com"
              className="text-blue-400 underline"
            >
              support@alphastore.com
            </a>{" "}
            or call us at <strong>+40 733 595 622</strong>.
          </p>
        </div>

        {/* Feedback Section */}
        <div className="border-t border-gray-700 pt-4">
          <h2 className="text-2xl font-semibold text-gray-100 mb-2 flex items-center gap-2">
            <MessageSquare size={24} className="text-blue-400" />
            Feedback
          </h2>
          <p className="text-gray-300 text-sm sm:text-base">
            We value your feedback! Please share your experience with your order
            to help us improve our services.
          </p>
        </div>
      </div>
      {/* Redesigned Back to Orders Button using Home page style with updated icon */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Link
          to="/my-account"
          className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-blue-600/50 border border-white/20 bg-gradient-to-r from-blue-600 to-indigo-600"
        >
          <span className="text-lg flex items-center gap-2 relative z-10">
            <ArrowLeft className="w-5 h-5" /> Back to Orders
          </span>
          <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
            <div className="relative h-full w-10 bg-white/30"></div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default OrderView;
