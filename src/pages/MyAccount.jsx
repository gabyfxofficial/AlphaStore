import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Clipboard, Tag } from "lucide-react";
import AccountDetails from "./AccountDetails";
import OrderHistory from "./OrderHistory";
import CardAccount from "./CardAccount";

function MyAccount() {
  const [activeTab, setActiveTab] = useState("account");

  const tabs = [
    { key: "account", label: "Profile", icon: <User size={20} /> },
    { key: "orders", label: "Orders", icon: <Clipboard size={20} /> },
    { key: "cards", label: "Cards", icon: <Tag size={20} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return <AccountDetails />;
      case "orders":
        return <OrderHistory />;
      case "cards":
        return (
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardAccount />
          </motion.div>
        );
      default:
        return (
          <div className="p-6 text-center text-gray-400">
            Content for {activeTab} coming soon.
          </div>
        );
    }
  };

  return (
    <motion.div
      className="min-h-screen p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.header
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-[0_0_10px_rgba(59,130,246,0.7)]">
            My Account
          </h1>
          <motion.div
            className="mt-4 h-1 w-48 mx-auto bg-gradient-to-r from-blue-500 to-blue-300 rounded-full shadow-[0_0_15px_5px_rgba(59,130,246,0.5)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1 }}
          ></motion.div>
        </motion.header>

        {/* Mobile Dropdown */}
        <motion.div
          className="mb-8 sm:hidden relative"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="block w-full p-3 pr-10 bg-gray-800 border border-gray-700 text-white rounded-lg appearance-none shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            {tabs.map((tab) => (
              <option key={tab.key} value={tab.key}>
                {tab.label}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Horizontal Navigation for larger screens */}
        <motion.nav
          className="mb-8 hidden sm:block"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ul className="flex flex-wrap justify-center gap-6">
            {tabs.map((tab, index) => (
              <motion.li
                key={tab.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <motion.button
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-2 border-b-2 ${
                    activeTab === tab.key
                      ? "border-blue-500 text-white drop-shadow-lg"
                      : "border-transparent text-gray-500 hover:text-white"
                  } transition-colors duration-300`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </motion.button>
              </motion.li>
            ))}
          </ul>
        </motion.nav>

        {/* Content */}
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {renderContent()}
        </motion.main>
      </div>
    </motion.div>
  );
}

export default MyAccount;
