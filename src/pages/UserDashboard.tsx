import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Eye, Package, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';

const UserDashboard = () => {
  const { user } = useAuth();
  const [viewedProducts, setViewedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (user) {
      const viewed = JSON.parse(localStorage.getItem(`viewedProducts_${user.id}`) || '[]');
      setViewedProducts(viewed);
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-hero text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <div className="bg-primary-foreground/20 p-3 rounded-full">
              <User className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user.name || user.username}!</h1>
              <p className="text-primary-foreground/80">Manage your profile and browse your activity</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Profile Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <p className="font-medium">{user.name || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Username</label>
                    <p className="font-medium">{user.username}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="font-medium">{user.email || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Role</label>
                    <Badge variant="secondary" className="capitalize">{user.role}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="h-5 w-5" />
                    <span>Your Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Products Viewed</span>
                      <Badge variant="outline">{viewedProducts.length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Account Type</span>
                      <Badge className="capitalize">{user.role}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Member Since</span>
                      <span className="text-sm">2024</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-5 w-5" />
                      <span>Recently Viewed Products</span>
                    </div>
                    <Link to="/products">
                      <Button variant="ghost" size="sm">
                        Browse All
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {viewedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {viewedProducts.slice(0, 4).map((product) => (
                        <Link key={product.id} to={`/product/${product.id}`}>
                          <Card className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardContent className="p-4">
                              <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
                                  <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.src = '/placeholder.svg';
                                    }}
                                  />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-medium text-sm">{product.name}</h3>
                                  <p className="text-xs text-muted-foreground">{product.category}</p>
                                  <p className="text-sm font-bold text-accent">₹{product.price}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">No products viewed yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Start browsing our products to see them here
                      </p>
                      <Link to="/products">
                        <Button>
                          Browse Products
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link to="/products">
                      <Button variant="outline" className="w-full">
                        <Package className="mr-2 h-4 w-4" />
                        Browse Products
                      </Button>
                    </Link>
                    <Link to="/contact">
                      <Button variant="outline" className="w-full">
                        <Clock className="mr-2 h-4 w-4" />
                        Contact Support
                      </Button>
                    </Link>
                    <Link to="/about">
                      <Button variant="outline" className="w-full">
                        <User className="mr-2 h-4 w-4" />
                        About Us
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;