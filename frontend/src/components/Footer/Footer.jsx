import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-gray-100 font-poppins rounded-lg mt-5 text-black">
      <div className="mx-auto py-10 px-5 sm:px-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Us Section */}
        <div>
          <h2 className="text-xl font-semibold text-black mb-4">
            About PROGAD
          </h2>
          <p>
            Welcome to PROGAD, your go-to destination for premium headphones and
            audio products. Founded in 2023, our mission is to deliver the best
            quality sound experience to all customers. With a wide range of
            audio accessories, we cater to everyone—music lovers, audiophiles,
            and everyday users alike.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h2 className="text-xl font-semibold text-black mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="/"
                className="hover:text-[#ff7f11] transition-colors duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/products"
                className="hover:text-[#ff7f11] transition-colors duration-300"
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-[#ff7f11] transition-colors duration-300"
              >
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-xl font-semibold text-black mb-4">Contact</h2>
          <p>Feel free to reach out to us:</p>
          <ul className="mt-2 space-y-2">
            <li>
              <span className="font-semibold">Email:</span>{" "}
              <a
                href="mailto:support@progad.com"
                className="hover:text-teal-400 transition-colors duration-300"
              >
                support@progad.com
              </a>
            </li>
            <li>
              <span className="font-semibold">Phone:</span>{" "}
              <a
                href="tel:+123456789"
                className="hover:text-teal-400 transition-colors duration-300"
              >
                +91 9188773788
              </a>
            </li>
            <li>
              <span className="font-semibold">Location:</span> Kasaragod,
              Kerala, INDIA
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="container mx-auto py-3 px-5 sm:px-10 flex flex-col sm:flex-row justify-between items-center">
          {/* Social Media */}
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-400 transition-colors duration-300"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-400 transition-colors duration-300"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-400 transition-colors duration-300"
            >
              Instagram
            </a>
          </div>

          {/* Footer Text */}
          <p className="mt-4 sm:mt-0 text-sm text-gray-400">
            © {new Date().getFullYear()} PROGAD. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
