import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MessageCircle, Wrench } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-accent p-2 rounded-lg">
                <Wrench className="h-6 w-6 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold">Verma Hardware</span>
            </div>
            <p className="text-primary-foreground/80 mb-4">
              Your trusted partner for all hardware needs. Quality tools, construction materials, 
              and expert advice for over 25 years.
            </p>
            <div className="space-y-2 text-sm">
              <p>📍 123 Main Street, Hardware District, City 12345</p>
              <p>📞 +91 9876543210</p>
              <p>✉️ info@vermahardware.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block hover:text-accent transition-colors">Home</Link>
              <Link to="/products" className="block hover:text-accent transition-colors">Products</Link>
              <Link to="/about" className="block hover:text-accent transition-colors">About Us</Link>
              <Link to="/contact" className="block hover:text-accent transition-colors">Contact</Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <div className="space-y-2 text-sm">
              <p className="hover:text-accent cursor-pointer transition-colors">Tools</p>
              <p className="hover:text-accent cursor-pointer transition-colors">Power Tools</p>
              <p className="hover:text-accent cursor-pointer transition-colors">Electrical</p>
              <p className="hover:text-accent cursor-pointer transition-colors">Plumbing</p>
              <p className="hover:text-accent cursor-pointer transition-colors">Construction</p>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span className="text-sm">Follow us:</span>
            <a 
              href="https://facebook.com/vermahardware" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a 
              href="https://instagram.com/vermahardware" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a 
              href="https://twitter.com/vermahardware" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href="https://wa.me/919876543210" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
          <p className="text-sm text-primary-foreground/80">
            © 2024 Verma Hardware. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;