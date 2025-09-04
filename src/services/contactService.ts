import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

export class ContactService {
  private static async getContactsCollection() {
    const db = await getDatabase();
    return db.collection('contacts');
  }

  static async getAllContacts(): Promise<Contact[]> {
    try {
      const contacts = await this.getContactsCollection();
      const result = await contacts
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

      return result.map(contact => ({
        _id: contact._id.toString(),
        name: contact.name,
        email: contact.email,
        message: contact.message,
        createdAt: contact.createdAt,
      }));
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
      throw error;
    }
  }

  static async createContact(contactData: {
    name: string;
    email: string;
    message: string;
  }): Promise<Contact> {
    try {
      const contacts = await this.getContactsCollection();
      
      const newContact = {
        ...contactData,
        createdAt: new Date(),
      };

      const result = await contacts.insertOne(newContact);

      return {
        _id: result.insertedId.toString(),
        ...newContact,
      };
    } catch (error) {
      console.error('Failed to create contact:', error);
      throw error;
    }
  }

  static async deleteContact(id: string): Promise<boolean> {
    try {
      const contacts = await this.getContactsCollection();
      const result = await contacts.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Failed to delete contact:', error);
      throw error;
    }
  }

  static async exportContactsAsCSV(): Promise<string> {
    try {
      const contacts = await this.getAllContacts();
      
      if (contacts.length === 0) {
        return 'name,email,message,createdAt\n';
      }

      const headers = 'name,email,message,createdAt\n';
      const rows = contacts.map(contact => 
        `"${contact.name}","${contact.email}","${contact.message.replace(/"/g, '""')}","${contact.createdAt.toISOString()}"`
      ).join('\n');

      return headers + rows;
    } catch (error) {
      console.error('Failed to export contacts:', error);
      throw error;
    }
  }
}