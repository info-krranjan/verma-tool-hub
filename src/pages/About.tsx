import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Users, Clock, MapPin, Wrench, Shield } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Verma Hardware</h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90">
            Your trusted partner in hardware solutions for over 25 years
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Story</h2>
          </div>
          
          <div className="prose prose-lg mx-auto text-muted-foreground">
            <p className="text-lg leading-relaxed mb-6">
              Founded in 1999 by Mr. Rajesh Verma, Verma Hardware began as a small family business 
              with a simple mission: to provide quality hardware products and exceptional service 
              to our local community. What started as a modest shop has grown into a trusted 
              destination for professionals and DIY enthusiasts alike.
            </p>
            
            <p className="text-lg leading-relaxed mb-6">
              Over the years, we've built strong relationships with leading manufacturers and 
              suppliers, ensuring that our customers always have access to the latest and most 
              reliable products. From basic hand tools to specialized construction equipment, 
              we've carefully curated our inventory to meet the diverse needs of our customers.
            </p>
            
            <p className="text-lg leading-relaxed">
              Today, Verma Hardware is proudly managed by the second generation, continuing the 
              tradition of excellence while embracing modern technology to serve our customers 
              better. Our commitment remains the same: providing quality products, expert advice, 
              and unmatched customer service.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="bg-accent p-3 rounded-full w-fit mx-auto mb-4">
                  <Wrench className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Quality First</h3>
                <p className="text-muted-foreground">
                  We source only the best products from trusted manufacturers, ensuring 
                  durability and reliability in every purchase.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="bg-accent p-3 rounded-full w-fit mx-auto mb-4">
                  <Users className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Customer Service</h3>
                <p className="text-muted-foreground">
                  Our knowledgeable staff provides expert guidance to help you find 
                  the right solutions for your projects.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="bg-accent p-3 rounded-full w-fit mx-auto mb-4">
                  <Shield className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Trust & Integrity</h3>
                <p className="text-muted-foreground">
                  Honest pricing, genuine products, and transparent business practices 
                  have earned us our customers' trust.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Journey</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary p-4 rounded-full w-fit mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">25+</div>
              <div className="text-muted-foreground">Years of Experience</div>
            </div>

            <div className="text-center">
              <div className="bg-primary p-4 rounded-full w-fit mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">10,000+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>

            <div className="text-center">
              <div className="bg-primary p-4 rounded-full w-fit mx-auto mb-4">
                <Award className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">500+</div>
              <div className="text-muted-foreground">Quality Products</div>
            </div>

            <div className="text-center">
              <div className="bg-primary p-4 rounded-full w-fit mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">1</div>
              <div className="text-muted-foreground">Trusted Location</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Visit Our Store</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Come see our extensive inventory and meet our knowledgeable staff
          </p>
          
          <div className="bg-card p-8 rounded-lg shadow-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Location</h3>
                <p className="text-muted-foreground">
                  123 Main Street<br />
                  Hardware District<br />
                  City 12345
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Contact</h3>
                <p className="text-muted-foreground">
                  Phone: +91 9876543210<br />
                  Email: info@vermahardware.com<br />
                  Hours: Mon-Sat 9AM-7PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;