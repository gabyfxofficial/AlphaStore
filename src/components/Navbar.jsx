import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Menu,
  X,
  Home,
  ShoppingBag,
  ShoppingCart,
  Heart,
  User,
} from "lucide-react";
import "../styles/global.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#081a3b] shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-3xl font-bold text-white"
        >
          Alpha<span className="text-blue-400">Store</span>
        </Link>

        <div className="hidden md:flex space-x-4">
          <NavButton to="/" text="Home" icon={<Home size={18} />} />
          <NavButton
            to="/products"
            text="Products"
            icon={<ShoppingBag size={18} />}
          />
          <NavButton to="/cart" text="Cart" icon={<ShoppingCart size={18} />} />
          <NavButton
            to="/wishlist"
            text="Wishlist"
            icon={<Heart size={18} />}
          />
          <NavButton
            to="/my-account"
            text="Account"
            icon={<User size={18} />}
          />
          {/* Logout button removed */}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 w-full h-full bg-[#081a3b]/90 backdrop-blur-md flex flex-col items-center justify-center text-xl transition-all duration-300 ${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-4xl text-white transition-transform hover:rotate-180"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 mt-6 bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text shadow-md">
          Navigation
        </h2>

        <div className="w-full max-w-xs flex flex-col space-y-4">
          <NavButton
            to="/"
            text="Home"
            icon={<Home size={24} />}
            onClick={() => setIsOpen(false)}
          />
          <Separator />
          <NavButton
            to="/products"
            text="Products"
            icon={<ShoppingBag size={24} />}
            onClick={() => setIsOpen(false)}
          />
          <Separator />
          <NavButton
            to="/cart"
            text="Cart"
            icon={<ShoppingCart size={24} />}
            onClick={() => setIsOpen(false)}
          />
          <Separator />
          <NavButton
            to="/wishlist"
            text="Wishlist"
            icon={<Heart size={24} />}
            onClick={() => setIsOpen(false)}
          />
          <Separator />
          <NavButton
            to="/my-account"
            text="Account"
            icon={<User size={24} />}
            onClick={() => setIsOpen(false)}
          />
          {/* Last separator removed */}
        </div>
      </div>
    </nav>
  );
}

function NavButton({ to, text, icon, onClick }) {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link
      to={to}
      className="relative px-6 py-3 w-full flex items-center gap-4 text-white rounded-lg shadow-md transition-all duration-300 hover:scale-105 bg-[#0d2b5f] hover:bg-blue-500"
      onClick={handleClick}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}

function Separator() {
  return (
    <div className="border-t border-blue-400 w-full opacity-50 transition-all duration-300 hover:opacity-100"></div>
  );
}

export default Navbar;
