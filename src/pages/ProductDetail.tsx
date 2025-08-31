import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Tag, Package, FileText } from 'lucide-react';
import { getProducts, Product } from '@/data/products';
import { useAuth } from '@/contexts/AuthContext';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      const products = getProducts();
      const foundProduct = products.find(p => p.id === id);
      setProduct(foundProduct || null);
      
      // Track viewed product for logged-in users
      if (foundProduct && user) {
        const viewedProducts = JSON.parse(localStorage.getItem(`viewedProducts_${user.id}`) || '[]');
        const updatedViewed = [foundProduct, ...viewedProducts.filter((p: Product) => p.id !== foundProduct.id)].slice(0, 10);
        localStorage.setItem(`viewedProducts_${user.id}`, JSON.stringify(updatedViewed));
      }
    }
  }, [id, user]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/products">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link to="/products" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
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
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              <div className="text-3xl font-bold text-accent mb-6">
                ₹{product.price}
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <FileText className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-lg font-semibold">Description</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Package className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-lg font-semibold">Product Details</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Product ID:</span>
                    <span className="font-medium">#{product.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Category:</span>
                    <Badge variant="outline">{product.category}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-bold text-accent">₹{product.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Availability:</span>
                    <Badge variant="default" className="bg-green-500 text-white">In Stock</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Tag className="h-5 w-5 mr-2" />
                Need Help?
              </h3>
              <p className="text-muted-foreground mb-4">
                Our experts are here to help you choose the right product for your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/contact" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Contact Us
                  </Button>
                </Link>
                <Button className="flex-1" disabled>
                  Call: +91 9876543210
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;