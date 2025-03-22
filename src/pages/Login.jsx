import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import { motion } from "framer-motion";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const data = await loginUser(username, password);

    if (data && data.token) {
      localStorage.setItem("authToken", data.token);
      alert("Login successful!");
      navigate("/");
    } else {
      setError("Invalid credentials");
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
          Login
        </motion.h2>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-red-500 text-center mb-4"
          >
            {error}
          </motion.p>
        )}
        <form onSubmit={handleLogin} className="space-y-6">
          <motion.input
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-md bg-[#162a52] text-white placeholder-gray-400 border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            required
          />
          <motion.input
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md bg-[#162a52] text-white placeholder-gray-400 border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            required
          />
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          >
            Login
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-4"
        >
          <Link
            to="/forgot-password"
            className="text-blue-300 hover:text-blue-400"
          >
            Forgot Password?
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Login;
