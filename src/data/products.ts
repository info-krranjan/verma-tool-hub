import hammerImg from '@/assets/hammer.jpg';
import screwdriverImg from '@/assets/screwdriver-set.jpg';
import drillImg from '@/assets/drill.jpg';
import paintBrushImg from '@/assets/paint-brush.jpg';
import ledBulbImg from '@/assets/led-bulb.jpg';
import measuringTapeImg from '@/assets/measuring-tape.jpg';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Hammer',
    price: 250,
    description: 'Heavy-duty steel hammer for construction and repair work',
    category: 'Tools',
    image: hammerImg
  },
  {
    id: '2',
    name: 'Screwdriver Set',
    price: 500,
    description: '6-piece magnetic screwdriver set with various sizes',
    category: 'Tools',
    image: screwdriverImg
  },
  {
    id: '3',
    name: 'Electric Drill',
    price: 3500,
    description: '500W drill machine for all your drilling needs',
    category: 'Power Tools',
    image: drillImg
  },
  {
    id: '4',
    name: 'Paint Brush',
    price: 150,
    description: '2-inch synthetic bristle brush for smooth painting',
    category: 'Painting',
    image: paintBrushImg
  },
  {
    id: '5',
    name: 'White Cement (5kg)',
    price: 400,
    description: 'Premium white cement for construction work',
    category: 'Construction',
    image: '/placeholder.svg'
  },
  {
    id: '6',
    name: 'Wall Putty (10kg)',
    price: 650,
    description: 'Smooth finish putty for wall preparation',
    category: 'Construction',
    image: '/placeholder.svg'
  },
  {
    id: '7',
    name: 'PVC Pipe (1m)',
    price: 120,
    description: '1-inch PVC pipe for plumbing applications',
    category: 'Plumbing',
    image: '/placeholder.svg'
  },
  {
    id: '8',
    name: 'Water Tap',
    price: 300,
    description: 'Brass chrome-plated tap for kitchen and bathroom',
    category: 'Plumbing',
    image: '/placeholder.svg'
  },
  {
    id: '9',
    name: 'Ceiling Fan',
    price: 2000,
    description: '3-blade energy-saving ceiling fan',
    category: 'Electrical',
    image: '/placeholder.svg'
  },
  {
    id: '10',
    name: 'LED Bulb (12W)',
    price: 180,
    description: 'Bright white LED bulb for energy saving',
    category: 'Electrical',
    image: ledBulbImg
  },
  {
    id: '11',
    name: 'Extension Board',
    price: 450,
    description: '4-socket extension board with surge protection',
    category: 'Electrical',
    image: '/placeholder.svg'
  },
  {
    id: '12',
    name: 'Measuring Tape (5m)',
    price: 200,
    description: 'Durable steel measuring tape for accurate measurements',
    category: 'Tools',
    image: measuringTapeImg
  },
  {
    id: '13',
    name: 'Adjustable Spanner',
    price: 350,
    description: 'Steel spanner with comfortable grip',
    category: 'Tools',
    image: '/placeholder-spanner.jpg'
  },
  {
    id: '14',
    name: 'Hand Saw',
    price: 400,
    description: 'Wooden handle sharp saw for cutting wood',
    category: 'Tools',
    image: '/placeholder-saw.jpg'
  },
  {
    id: '15',
    name: 'Ladder (6ft)',
    price: 2800,
    description: 'Foldable aluminum ladder for height work',
    category: 'Tools',
    image: '/placeholder-ladder.jpg'
  },
  {
    id: '16',
    name: 'Safety Gloves',
    price: 180,
    description: 'Rubber-coated protective gloves for safety',
    category: 'Safety',
    image: '/placeholder-gloves.jpg'
  },
  {
    id: '17',
    name: 'Safety Helmet',
    price: 600,
    description: 'Strong ABS material helmet for head protection',
    category: 'Safety',
    image: '/placeholder-helmet.jpg'
  },
  {
    id: '18',
    name: 'Paint Roller',
    price: 250,
    description: '9-inch roller for smooth wall painting',
    category: 'Painting',
    image: '/placeholder-roller.jpg'
  },
  {
    id: '19',
    name: 'Sandpaper Pack',
    price: 120,
    description: 'Pack of 10 sandpaper sheets for surface preparation',
    category: 'Painting',
    image: '/placeholder-sandpaper.jpg'
  },
  {
    id: '20',
    name: 'Garden Hose Pipe (10m)',
    price: 700,
    description: 'Flexible water pipe for gardening needs',
    category: 'Gardening',
    image: '/placeholder-hose.jpg'
  }
];

// Initialize products in localStorage
export const initializeProducts = () => {
  const storedProducts = localStorage.getItem('products');
  if (!storedProducts) {
    localStorage.setItem('products', JSON.stringify(sampleProducts));
  }
};

export const getProducts = (): Product[] => {
  const products = localStorage.getItem('products');
  return products ? JSON.parse(products) : sampleProducts;
};

export const getCategories = (): string[] => {
  const products = getProducts();
  return [...new Set(products.map(p => p.category))];
};