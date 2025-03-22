import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Calendar, MapPin, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AccountDetails() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/users/1")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUserInfo(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching account details:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="text-gray-300 flex items-center justify-center">
        Loading account details...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!userInfo) {
    return (
      <div className="text-gray-300">
        No account details found. Please update your profile.
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-sm mx-auto p-6 bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-2xl shadow-2xl text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <img
          src={userInfo.image}
          alt={`${userInfo.firstName} ${userInfo.lastName}`}
          className="w-24 h-24 rounded-full border-4 border-blue-400"
        />
      </div>
      {/* Name */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">
          {userInfo.firstName} {userInfo.lastName}
        </h2>
      </div>
      <hr className="border-gray-600 mb-4" />
      {/* Details */}
      <div className="space-y-3 text-sm">
        <div className="flex items-center">
          <Mail size={18} className="text-blue-400 mr-2" />
          <span>{userInfo.email}</span>
        </div>
        <div className="flex items-center">
          <Phone size={18} className="text-blue-400 mr-2" />
          <span>{userInfo.phone}</span>
        </div>
        {userInfo.birthDate && (
          <div className="flex items-center">
            <Calendar size={18} className="text-blue-400 mr-2" />
            <span>{userInfo.birthDate}</span>
          </div>
        )}
        {userInfo.address && (
          <div className="flex items-center">
            <MapPin size={18} className="text-blue-400 mr-2" />
            <span>
              {userInfo.address.city}
              {userInfo.address.country ? `, ${userInfo.address.country}` : ""}
            </span>
          </div>
        )}
      </div>
      {/* Centered Logout Button */}
      <div className="flex justify-center mt-[10%]">
        <button
          onClick={handleLogout}
          className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md px-4 py-2 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-red-600/50 border border-white/20 bg-gradient-to-r from-red-500 to-red-600 w-[50%]"
        >
          <span className="relative z-10 flex items-center gap-2">
            <LogOut size={18} />
            Logout
          </span>
          <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
            <div className="relative h-full w-10 bg-white/30"></div>
          </div>
        </button>
      </div>
    </motion.div>
  );
}

export default AccountDetails;
