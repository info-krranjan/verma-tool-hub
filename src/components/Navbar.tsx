import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Wrench, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'superadmin':
      case 'admin':
        return '/admin-dashboard';
      case 'user':
        return '/user-dashboard';
      default:
        return '/';
    }
  };

  return (
    <nav className="bg-gradient-hero shadow-elegant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-accent p-2 rounded-lg">
              <Wrench className="h-6 w-6 text-accent-foreground" />
            </div>
            <span className="text-xl font-bold text-primary-foreground">
              Verma Hardware
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-primary-foreground hover:text-accent transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-primary-foreground hover:text-accent transition-colors duration-200"
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className="text-primary-foreground hover:text-accent transition-colors duration-200"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-primary-foreground hover:text-accent transition-colors duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to={getDashboardPath()}>
                  <Button variant="secondary" size="sm" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{user.name || user.username}</span>
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="secondary" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;