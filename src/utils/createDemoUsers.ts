// Utility to create demo users
export const createDemoUsers = async () => {
  try {
    const response = await fetch('https://plgrtfhylvzmlknelfhq.supabase.co/functions/v1/create-demo-users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsZ3J0Zmh5bHZ6bWxrbmVsZmhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2MzI0MDEsImV4cCI6MjA3MjIwODQwMX0.-ZStG6pB-XAii1khUToMCODcUc98B71m1GN61WavBYw'
      },
      body: JSON.stringify({})
    });

    const result = await response.json();
    console.log('Demo users created:', result);
    return result;
  } catch (error) {
    console.error('Error creating demo users:', error);
    return null;
  }
};