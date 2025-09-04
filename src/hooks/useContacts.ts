import { useState, useEffect } from 'react';
import { ContactService, Contact as ContactType } from '@/services/contactService';

export interface Contact {
  _id: string
  name: string
  email: string
  message: string
  createdAt: Date
}

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await ContactService.getAllContacts();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const addContact = async (contact: Omit<Contact, '_id' | 'createdAt'>) => {
    try {
      const data = await ContactService.createContact(contact);
      setContacts(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Error adding contact:', error);
      return null;
    }
  };

  const exportContacts = async () => {
    try {
      const csvData = await ContactService.exportContactsAsCSV();
      
      // Create download link
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `contacts-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      return true;
    } catch (error) {
      console.error('Error exporting contacts:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return {
    contacts,
    loading,
    addContact,
    exportContacts,
    refetch: fetchContacts
  };
};