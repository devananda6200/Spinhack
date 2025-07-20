import React from 'react';
import { Button } from './ui/button';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="text-2xl font-bold text-red-600 mb-4">
              NETFLIX DETERGENT
            </div>
            <p className="text-gray-400 mb-4">
              Making every wash a cinematic experience since 2025.
            </p>
            <p className="text-gray-500 text-sm">
              Made with love, bubbles, and binge energy.
            </p>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-red-400 transition-colors">All Genres</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">MoodMatch™ AI</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Smart App</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Sound Library</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-red-400 transition-colors">Terms of Wash</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-red-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Investor Relations</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gray-900 p-8 rounded-lg mb-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">
              Sudscribe to Our Newsletter
            </h3>
            <p className="text-gray-400">
              Get the latest scents, exclusive episodes, and behind-the-scenes content.
            </p>
          </div>
          
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-400 rounded-l-lg focus:outline-none focus:border-red-500"
            />
            <Button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-l-none">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Social Media & Additional Info */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 Netflix Detergent Inc. All rights reserved.
          </div>
          
          {/* Social Icons */}
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
              <span className="sr-only">Facebook</span>
              📘
            </a>
            <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
              <span className="sr-only">Twitter</span>
              🐦
            </a>
            <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
              <span className="sr-only">Instagram</span>
              📸
            </a>
            <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
              <span className="sr-only">YouTube</span>
              📺
            </a>
          </div>
        </div>

        {/* Fun Easter Egg Link */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Trending #1 in Cleanliness on{' '}
            <span className="text-red-400 font-semibold cursor-pointer hover:underline">
              SoapFlix
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;