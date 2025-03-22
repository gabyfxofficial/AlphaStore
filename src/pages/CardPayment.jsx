import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CardPayment() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Validate card number: remove spaces, must be 16 digits.
  const validateCardNumber = (number) => {
    const sanitized = number.replace(/\s+/g, "");
    return /^\d{16}$/.test(sanitized);
  };

  // Validate expiration date (format: MM/YY)
  const validateExpirationDate = (date) => {
    return /^(0[1-9]|1[0-2])\/\d{2}$/.test(date);
  };

  // Validate CVV: exactly 3 digits
  const validateCVV = (cvv) => {
    return /^\d{3}$/.test(cvv);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setError("");

    if (!validateCardNumber(cardNumber)) {
      setError("Invalid card number. Please enter 16 digits.");
      return;
    }
    if (cardHolder.trim() === "") {
      setError("Card holder name is required.");
      return;
    }
    if (!validateExpirationDate(expirationDate)) {
      setError("Invalid expiration date. Format should be MM/YY.");
      return;
    }
    if (!validateCVV(cvv)) {
      setError("Invalid CVV. Please enter 3 digits.");
      return;
    }

    // Payment processing logic goes here.
    // On success, navigate to Order Confirmation page.
    navigate("/order-confirmation");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <form
        onSubmit={handlePayment}
        className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">
          Card Payment
        </h1>

        {error && (
          <div className="mb-4 text-red-500 text-center font-semibold">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="cardNumber"
            className="block text-sm font-medium mb-1"
          >
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
            required
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="cardHolder"
            className="block text-sm font-medium mb-1"
          >
            Card Holder Name
          </label>
          <input
            type="text"
            id="cardHolder"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            placeholder="John Doe"
            required
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="expirationDate"
              className="block text-sm font-medium mb-1"
            >
              Expiration Date
            </label>
            <input
              type="text"
              id="expirationDate"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              placeholder="MM/YY"
              required
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium mb-1">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="123"
              required
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg font-semibold text-xl"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
}

export default CardPayment;
