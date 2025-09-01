import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, Wrench, Shield, Award, Users } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import LoadingSpinner from '@/components/LoadingSpinner';
import hardwareShopBg from '@/assets/hardware-shop-bg.jpg';

const Home = () => {
  const { products, loading } = useProducts();
  const featuredProducts = products.slice(0, 8);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-hero text-primary-foreground py-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${hardwareShopBg})` }}
      >
        <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              Your Trusted Hardware Partner
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/95 drop-shadow-md">
              Quality tools, construction materials, and expert advice for all your projects
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-3 shadow-lg">
                  Browse Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary shadow-lg"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-muted-foreground">
              Discover our most popular and reliable hardware solutions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/products">
              <Button size="lg" className="px-8 py-3">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Verma Hardware?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="bg-accent p-3 rounded-full w-fit mx-auto mb-4">
                  <Wrench className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Tools</h3>
                <p className="text-muted-foreground">
                  Premium quality tools from trusted brands for professional and DIY projects
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="bg-accent p-3 rounded-full w-fit mx-auto mb-4">
                  <Shield className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Warranty</h3>
                <p className="text-muted-foreground">
                  All products come with manufacturer warranty and our quality guarantee
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="bg-accent p-3 rounded-full w-fit mx-auto mb-4">
                  <Award className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">25+ Years</h3>
                <p className="text-muted-foreground">
                  Over 25 years of experience serving the community with reliable hardware
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="bg-accent p-3 rounded-full w-fit mx-auto mb-4">
                  <Users className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Advice</h3>
                <p className="text-muted-foreground">
                  Our knowledgeable staff provides expert guidance for your projects
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Welcome to Verma Hardware
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Established in 1999, Verma Hardware has been the go-to destination for quality 
            hardware supplies in our community. From professional contractors to weekend DIY 
            enthusiasts, we serve everyone with the same dedication to quality and service. 
            Our extensive inventory includes everything from basic hand tools to specialized 
            construction equipment, all sourced from trusted manufacturers.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;