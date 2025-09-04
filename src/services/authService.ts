import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key';
const JWT_EXPIRES_IN = '7d';

export interface User {
  _id: string;
  email: string;
  username: string;
  name?: string;
  role: 'user' | 'admin' | 'superadmin';
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

export class AuthService {
  private static async getUsersCollection() {
    const db = await getDatabase();
    return db.collection('users');
  }

  static async signup(data: {
    email: string;
    password: string;
    username: string;
    name?: string;
  }): Promise<AuthResponse> {
    try {
      const users = await this.getUsersCollection();
      
      // Check if user already exists
      const existingUser = await users.findOne({
        $or: [{ email: data.email }, { username: data.username }]
      });
      
      if (existingUser) {
        return {
          success: false,
          message: 'User with this email or username already exists'
        };
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 12);
      
      // Create user
      const newUser = {
        email: data.email,
        username: data.username,
        name: data.name,
        password: hashedPassword,
        role: 'user' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await users.insertOne(newUser);
      
      // Generate JWT token
      const token = jwt.sign(
        { userId: result.insertedId.toString(), email: data.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      // Return user without password
      const userResponse: User = {
        _id: result.insertedId.toString(),
        email: newUser.email,
        username: newUser.username,
        name: newUser.name,
        role: newUser.role,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      };

      return {
        success: true,
        message: 'User created successfully',
        user: userResponse,
        token
      };
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        message: 'Failed to create user'
      };
    }
  }

  static async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const users = await this.getUsersCollection();
      
      // Find user by email
      const user = await users.findOne({ email });
      
      if (!user) {
        return {
          success: false,
          message: 'Invalid email or password'
        };
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        return {
          success: false,
          message: 'Invalid email or password'
        };
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id.toString(), email: user.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      // Return user without password
      const userResponse: User = {
        _id: user._id.toString(),
        email: user.email,
        username: user.username,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      return {
        success: true,
        message: 'Login successful',
        user: userResponse,
        token
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Failed to login'
      };
    }
  }

  static async verifyToken(token: string): Promise<User | null> {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
      const users = await this.getUsersCollection();
      
      const user = await users.findOne({ _id: new ObjectId(decoded.userId) });
      
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
      console.error('Token verification error:', error);
      return null;
    }
  }

  static async createAdmin(data: {
    email: string;
    password: string;
    username: string;
    name?: string;
  }): Promise<AuthResponse> {
    try {
      const users = await this.getUsersCollection();
      
      // Check if user already exists
      const existingUser = await users.findOne({
        $or: [{ email: data.email }, { username: data.username }]
      });
      
      if (existingUser) {
        return {
          success: false,
          message: 'User with this email or username already exists'
        };
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 12);
      
      // Create admin user
      const newUser = {
        email: data.email,
        username: data.username,
        name: data.name,
        password: hashedPassword,
        role: 'admin' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await users.insertOne(newUser);
      
      // Return user without password
      const userResponse: User = {
        _id: result.insertedId.toString(),
        email: newUser.email,
        username: newUser.username,
        name: newUser.name,
        role: newUser.role,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      };

      return {
        success: true,
        message: 'Admin user created successfully',
        user: userResponse
      };
    } catch (error) {
      console.error('Create admin error:', error);
      return {
        success: false,
        message: 'Failed to create admin user'
      };
    }
  }
}