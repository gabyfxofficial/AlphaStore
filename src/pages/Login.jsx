import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";

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
      <div className="w-full max-w-md p-8 rounded-lg bg-[#1c2541] shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 text-white">
          Login
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-md bg-[#162a52] text-white placeholder-gray-400 border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md bg-[#162a52] text-white placeholder-gray-400 border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <Link
            to="/forgot-password"
            className="text-blue-300 hover:text-blue-400"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
