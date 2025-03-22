import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();
    setMessage(null);

    if (email === "user@example.com") {
      setMessage("A password reset link has been sent to your email.");
      setTimeout(() => navigate("/login"), 3000);
    } else {
      setMessage("Email not found. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 rounded-lg bg-[#1c2541] shadow-lg"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-semibold text-center mb-6 text-white"
        >
          Forgot Password
        </motion.h2>

        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-4 text-yellow-500"
          >
            {message}
          </motion.p>
        )}

        <form onSubmit={handleResetPassword} className="space-y-6">
          <motion.input
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md bg-[#162a52] text-white placeholder-gray-400 border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            required
          />
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          >
            Send Reset Link
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-center"
        >
          <button
            onClick={() => navigate("/login")}
            className="text-blue-400 hover:text-blue-500 focus:outline-none"
          >
            Back to Login
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;
