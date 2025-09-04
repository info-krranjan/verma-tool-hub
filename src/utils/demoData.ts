import { ProductService } from '@/services/productService';

// Demo products data for MongoDB
const demoProducts = [
  {
    name: "Professional Drill Set",
    price: 2499,
    description: "High-quality drill set with multiple bits for various materials. Perfect for professional and DIY projects.",
    category: "Power Tools",
    image_url: "/images/drill.jpg"
  },
  {
    name: "Hammer Tool Kit",
    price: 899,
    description: "Durable hammer set with different weights and ergonomic handles for efficient work.",
    category: "Hand Tools", 
    image_url: "/images/hammer.jpg"
  },
  {
    name: "LED Bulb Pack",
    price: 299,
    description: "Energy-efficient LED bulbs with long lifespan. Available in various wattages and color temperatures.",
    category: "Electrical",
    image_url: "/images/led-bulb.jpg"
  },
  {
    name: "Measuring Tape Set",
    price: 199,
    description: "Accurate measuring tapes in different lengths for construction and carpentry work.",
    category: "Measuring Tools",
    image_url: "/images/measuring-tape.jpg"
  },
  {
    name: "Paint Brush Collection",
    price: 349,
    description: "Professional paint brushes for interior and exterior painting. Various sizes included.",
    category: "Painting",
    image_url: "/images/paint-brush.jpg"
  },
  {
    name: "Screwdriver Set",
    price: 599,
    description: "Complete screwdriver set with Phillips, flathead, and Torx bits. Magnetic tips included.",
    category: "Hand Tools",
    image_url: "/images/screwdriver-set.jpg"
  }
];

export const initializeDemoData = async () => {
  try {
    // Check if products already exist
    const existingProducts = await ProductService.getAllProducts();
    
    if (existingProducts.length === 0) {
      console.log('Initializing demo products...');
      
      // Add demo products
      for (const product of demoProducts) {
        await ProductService.createProduct(product);
      }
      
      console.log('Demo products initialized successfully');
    } else {
      console.log('Products already exist, skipping demo data initialization');
    }
  } catch (error) {
    console.error('Failed to initialize demo data:', error);
  }
};