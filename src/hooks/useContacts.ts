import { useState, useEffect } from 'react';
import { supabase, Contact } from '@/lib/supabase';

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching contacts:', error);
        return;
      }

      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const addContact = async (contact: Omit<Contact, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([contact])
        .select()
        .single();

      if (error) {
        console.error('Error adding contact:', error);
        return null;
      }

      setContacts(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Error adding contact:', error);
      return null;
    }
  };

  const exportContacts = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session?.access_token) {
        throw new Error('Not authenticated');
      }

      const response = await supabase.functions.invoke('export-contacts', {
        headers: {
          Authorization: `Bearer ${session.session.access_token}`
        }
      });

      if (response.error) {
        throw response.error;
      }

      // Create download link
      const blob = new Blob([response.data], { type: 'text/csv' });
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