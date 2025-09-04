import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { User } from './authService';

export class UserService {
  private static async getUsersCollection() {
    const db = await getDatabase();
    return db.collection('users');
  }

  static async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.getUsersCollection();
      const result = await users
        .find({}, { projection: { password: 0 } })
        .sort({ createdAt: -1 })
        .toArray();

      return result.map(user => ({
        _id: user._id.toString(),
        email: user.email,
        username: user.username,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }));
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw error;
    }
  }

  static async getUserById(id: string): Promise<User | null> {
    try {
      const users = await this.getUsersCollection();
      const user = await users.findOne(
        { _id: new ObjectId(id) },
        { projection: { password: 0 } }
      );

      if (!user) {
        return null;
      }

      return {
        _id: user._id.toString(),
        email: user.email,
        username: user.username,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw error;
    }
  }

  static async updateUser(
    id: string,
    updates: Partial<Omit<User, '_id' | 'createdAt'>>
  ): Promise<User | null> {
    try {
      const users = await this.getUsersCollection();
      
      const updatedData = {
        ...updates,
        updatedAt: new Date(),
      };

      const result = await users.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updatedData },
        { returnDocument: 'after', projection: { password: 0 } }
      );

      if (!result) {
        return null;
      }

      return {
        _id: result._id.toString(),
        email: result.email,
        username: result.username,
        name: result.name,
        role: result.role,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      };
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  }

  static async deleteUser(id: string): Promise<boolean> {
    try {
      const users = await this.getUsersCollection();
      const result = await users.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Failed to delete user:', error);
      throw error;
    }
  }

  static async updateUserRole(id: string, role: 'user' | 'admin' | 'superadmin'): Promise<User | null> {
    try {
      const users = await this.getUsersCollection();
      
      const result = await users.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { role, updatedAt: new Date() } },
        { returnDocument: 'after', projection: { password: 0 } }
      );

      if (!result) {
        return null;
      }

      return {
        _id: result._id.toString(),
        email: result.email,
        username: result.username,
        name: result.name,
        role: result.role,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      };
    } catch (error) {
      console.error('Failed to update user role:', error);
      throw error;
    }
  }
}