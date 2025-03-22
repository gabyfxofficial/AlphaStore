import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();
    setMessage(null);

    // Simulăm procesul de resetare a parolei
    if (email === "user@example.com") {
      setMessage("A password reset link has been sent to your email.");
      setTimeout(() => navigate("/login"), 3000); // După 3 secunde, redirecționează utilizatorul înapoi pe pagina de login
    } else {
      setMessage("Email not found. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-8 rounded-lg bg-[#1c2541] shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 text-white">
          Forgot Password
        </h2>
        {message && (
          <p className="text-center mb-4 text-yellow-500">{message}</p>
        )}
        <form onSubmit={handleResetPassword} className="space-y-6">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md bg-[#162a52] text-white placeholder-gray-400 border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          >
            Send Reset Link
          </button>
        </form>
        {/* 🔹 Button Back to Login */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-blue-400 hover:text-blue-500 focus:outline-none"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
