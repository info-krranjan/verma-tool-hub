import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    console.log('Creating demo users...');

    const demoUsers = [
      {
        email: 'user@verma.com',
        password: 'user123',
        user_metadata: {
          username: 'user_demo',
          name: 'User Demo',
          role: 'user'
        }
      },
      {
        email: 'admin@verma.com', 
        password: 'admin123',
        user_metadata: {
          username: 'admin_demo',
          name: 'Admin Demo', 
          role: 'admin'
        }
      },
      {
        email: 'superadmin@verma.com',
        password: 'superadmin123',
        user_metadata: {
          username: 'superadmin_demo',
          name: 'Super Admin Demo',
          role: 'superadmin'
        }
      }
    ];

    const createdUsers = [];

    for (const userData of demoUsers) {
      try {
        const { data: user, error } = await supabaseClient.auth.admin.createUser({
          email: userData.email,
          password: userData.password,
          user_metadata: userData.user_metadata,
          email_confirm: true
        });

        if (error) {
          console.log(`User ${userData.email} may already exist:`, error.message);
        } else {
          console.log(`Created user: ${userData.email}`);
          createdUsers.push(user);
        }
      } catch (err) {
        console.log(`Error creating user ${userData.email}:`, err);
      }
    }

    return new Response(
      JSON.stringify({
        message: 'Demo users creation completed',
        created: createdUsers.length,
        total: demoUsers.length
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error in create-demo-users function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }, 
        status: 500 
      }
    )
  }
})