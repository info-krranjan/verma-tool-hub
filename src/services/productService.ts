import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image_url: string;
  cloudinary_public_id?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class ProductService {
  private static async getProductsCollection() {
    const db = await getDatabase();
    return db.collection('products');
  }

  static async getAllProducts(): Promise<Product[]> {
    try {
      const products = await this.getProductsCollection();
      const result = await products
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

      return result.map(product => ({
        _id: product._id.toString(),
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        image_url: product.image_url,
        cloudinary_public_id: product.cloudinary_public_id,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      }));
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error;
    }
  }

  static async getProductById(id: string): Promise<Product | null> {
    try {
      const products = await this.getProductsCollection();
      const product = await products.findOne({ _id: new ObjectId(id) });

      if (!product) {
        return null;
      }

      return {
        _id: product._id.toString(),
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        image_url: product.image_url,
        cloudinary_public_id: product.cloudinary_public_id,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      };
    } catch (error) {
      console.error('Failed to fetch product:', error);
      throw error;
    }
  }

  static async createProduct(productData: {
    name: string;
    price: number;
    description: string;
    category: string;
    image_url: string;
    cloudinary_public_id?: string;
  }): Promise<Product> {
    try {
      const products = await this.getProductsCollection();
      
      const newProduct = {
        ...productData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await products.insertOne(newProduct);

      return {
        _id: result.insertedId.toString(),
        ...newProduct,
      };
    } catch (error) {
      console.error('Failed to create product:', error);
      throw error;
    }
  }

  static async updateProduct(
    id: string,
    updates: Partial<Omit<Product, '_id' | 'createdAt'>>
  ): Promise<Product | null> {
    try {
      const products = await this.getProductsCollection();
      
      const updatedData = {
        ...updates,
        updatedAt: new Date(),
      };

      const result = await products.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updatedData },
        { returnDocument: 'after' }
      );

      if (!result) {
        return null;
      }

      return {
        _id: result._id.toString(),
        name: result.name,
        price: result.price,
        description: result.description,
        category: result.category,
        image_url: result.image_url,
        cloudinary_public_id: result.cloudinary_public_id,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      };
    } catch (error) {
      console.error('Failed to update product:', error);
      throw error;
    }
  }

  static async deleteProduct(id: string): Promise<boolean> {
    try {
      const products = await this.getProductsCollection();
      const result = await products.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Failed to delete product:', error);
      throw error;
    }
  }

  static async getCategories(): Promise<string[]> {
    try {
      const products = await this.getProductsCollection();
      const categories = await products.distinct('category');
      return categories;
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      throw error;
    }
  }
}