import { useState, useEffect } from 'react';
import { ProductService, Product as ProductType } from '@/services/productService';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { useAuth } from '@/contexts/AuthContext';

export interface Product {
  _id: string
  name: string
  price: number
  description: string
  category: string
  image_url: string
  cloudinary_public_id?: string
  createdAt?: Date
  updatedAt?: Date
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await ProductService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const data = await ProductService.createProduct(product);
      setProducts(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Error adding product:', error);
      return null;
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const data = await ProductService.updateProduct(id, updates);
      if (data) {
        setProducts(prev => prev.map(p => p._id === id ? data : p));
      }
      return data;
    } catch (error) {
      console.error('Error updating product:', error);
      return null;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const success = await ProductService.deleteProduct(id);
      if (success) {
        setProducts(prev => prev.filter(p => p._id !== id));
      }
      return success;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  };

  const uploadProductImage = async (file: File) => {
    try {
      const result = await uploadToCloudinary(file, 'hardware-shop/products');
      return result.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = [...new Set(products.map(p => p.category))];

  return {
    products,
    loading,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    uploadProductImage,
    refetch: fetchProducts
  };
};