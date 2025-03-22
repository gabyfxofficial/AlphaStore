import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function BankTransfer() {
  const [bankName, setBankName] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Validates that a text field is not empty.
  const validateTextField = (text) => text.trim() !== "";

  // Validate account number: digits only, length between 8 and 20 (example criteria)
  const validateAccountNumber = (number) => {
    return /^\d{8,20}$/.test(number);
  };

  // Validate routing number: digits only, exactly 9 digits (example criteria)
  const validateRoutingNumber = (number) => {
    return /^\d{9}$/.test(number);
  };

  const handleBankTransfer = (e) => {
    e.preventDefault();
    setError("");

    if (!validateTextField(bankName)) {
      setError("Please enter a valid bank name.");
      return;
    }
    if (!validateTextField(accountHolder)) {
      setError("Please enter the account holder name.");
      return;
    }
    if (!validateAccountNumber(accountNumber)) {
      setError("Invalid account number. It should contain 8 to 20 digits.");
      return;
    }
    if (!validateRoutingNumber(routingNumber)) {
      setError("Invalid routing number. It should contain exactly 9 digits.");
      return;
    }

    // Payment processing logic for bank transfer goes here.
    // On successful payment, navigate to Order Confirmation page.
    navigate("/order-confirmation");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <form
        onSubmit={handleBankTransfer}
        className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">
          Bank Transfer Payment
        </h1>

        {error && (
          <div className="mb-4 text-red-500 text-center font-semibold">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="bankName" className="block text-sm font-medium mb-1">
            Bank Name
          </label>
          <input
            type="text"
            id="bankName"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            placeholder="Enter bank name"
            required
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="accountHolder"
            className="block text-sm font-medium mb-1"
          >
            Account Holder
          </label>
          <input
            type="text"
            id="accountHolder"
            value={accountHolder}
            onChange={(e) => setAccountHolder(e.target.value)}
            placeholder="Enter account holder name"
            required
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="accountNumber"
            className="block text-sm font-medium mb-1"
          >
            Account Number
          </label>
          <input
            type="text"
            id="accountNumber"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="Enter account number"
            required
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="routingNumber"
            className="block text-sm font-medium mb-1"
          >
            Routing Number
          </label>
          <input
            type="text"
            id="routingNumber"
            value={routingNumber}
            onChange={(e) => setRoutingNumber(e.target.value)}
            placeholder="Enter routing number"
            required
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg font-semibold text-xl"
        >
          Submit Payment
        </button>
      </form>
    </div>
  );
}

export default BankTransfer;
