import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, ArrowRight } from "lucide-react";

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const messagesEndRef = useRef(null);

  // Predefined questions and answers for AlphaStore
  const predefinedQuestions = [
    {
      id: 1,
      question: "What types of products do you offer?",
      answer:
        "We offer a diverse range of products including men's clothing, women's clothing, jewelry, and electronics.",
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer: "We accept credit cards, bank transfers, and cash on delivery.",
    },
    {
      id: 3,
      question: "What is your shipping policy?",
      answer:
        "Orders are processed within 1-2 business days, and standard shipping takes 3-5 business days.",
    },
    {
      id: 4,
      question: "What is your return policy?",
      answer:
        "Returns are accepted within 30 days of purchase, provided the items are in their original condition.",
    },
    {
      id: 5,
      question: "How can I track my order?",
      answer:
        "You can track your order in the 'My Account' section under 'Order History'.",
    },
  ];

  // Disable background scrolling when the chatbox is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Auto-scroll to the latest message in the chat container
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      setMessages([
        {
          user: "Bot",
          text: "Welcome to AlphaStore! How can we help you today?",
        },
      ]);
    }
  };

  const handleQuestionSelect = (item) => {
    if (isWaiting) return;
    setMessages((prev) => [...prev, { user: "Me", text: item.question }]);
    setIsTyping(true);
    setIsWaiting(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { user: "Bot", text: item.answer }]);
      setIsTyping(false);
      setIsWaiting(false);
    }, 2000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full shadow-xl hover:shadow-2xl text-white focus:outline-none transform hover:scale-105 transition-transform duration-300"
        >
          <MessageSquare size={20} className="sm:hidden" />
          <MessageSquare size={32} className="hidden sm:block" />
        </button>
      )}

      {isOpen && (
        <div className="mt-4 w-full max-w-[90vw] sm:max-w-md md:max-w-lg p-3 sm:p-4 bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-600">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Questions
            </h3>
            <button
              onClick={toggleChat}
              className="text-white focus:outline-none transform hover:rotate-90 transition-transform duration-300"
            >
              <X size={18} className="sm:hidden" />
              <X size={28} className="hidden sm:block" />
            </button>
          </div>
          {/* Message area is scrollable */}
          <div className="h-32 sm:h-48 overflow-y-auto space-y-2 mb-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.user === "Bot" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`px-2 py-1 rounded-md max-w-full ${
                    msg.user === "Bot" ? "bg-blue-700" : "bg-green-700"
                  } text-white shadow-sm`}
                >
                  <span className="font-semibold mr-1">
                    {msg.user === "Bot" ? "Bot:" : "Me:"}
                  </span>
                  <span>{msg.text}</span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="px-2 py-1 rounded-md max-w-full bg-blue-700 text-white flex space-x-1 shadow-sm">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce delay-100">.</span>
                  <span className="animate-bounce delay-200">.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {/* Predefined questions */}
          <div>
            <ul className="space-y-2">
              {predefinedQuestions.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleQuestionSelect(item)}
                  className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded-md flex justify-between items-center transition-colors text-sm"
                >
                  <span>{item.question}</span>
                  <ArrowRight size={18} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;
