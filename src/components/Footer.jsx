import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Coloana 1: Despre brand */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-4">AlphaStore</h3>
            <p className="text-sm max-w-xs">
              AlphaStore is your one-stop shop for modern fashion. Discover our
              unique collection and elevate your style.
            </p>
          </div>
          {/* Coloana 2: Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-sm">
              Email:{" "}
              <a
                href="mailto:support@alphastore.com"
                className="hover:text-blue-400 transition-colors duration-300"
              >
                support@alphastore.com
              </a>
            </p>
            <p className="text-sm">
              Phone:{" "}
              <a
                href="tel:+40733595622"
                className="hover:text-blue-400 transition-colors duration-300"
              >
                +40 733 595 622
              </a>
            </p>
          </div>
          {/* Coloana 3: About & Terms */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-4">About &amp; Terms</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  onClick={scrollToTop}
                  className="text-sm hover:text-blue-400 transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  onClick={scrollToTop}
                  className="text-sm hover:text-blue-400 transition-colors duration-300"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
          {/* Coloana 4: Social Media */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6 hover:text-red-500 transition-colors duration-300" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6 hover:text-blue-400 transition-colors duration-300" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6 hover:text-pink-400 transition-colors duration-300" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <FaTiktok className="w-6 h-6 hover:text-blue-400 transition-colors duration-300" />
              </a>
            </div>
          </div>
        </div>
        {/* Linie de separare și copyright */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
          <p>&copy; 2025 AlphaStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
