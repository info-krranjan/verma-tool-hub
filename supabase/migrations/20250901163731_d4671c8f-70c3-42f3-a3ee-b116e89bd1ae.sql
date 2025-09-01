-- Create demo users using auth.admin API approach
-- We'll use the built-in auth functions to create users properly

-- Create user demo account
SELECT auth.create_user(
  'user@verma.com',
  'user123',
  '{"username": "user_demo", "name": "User Demo", "role": "user"}'::jsonb,
  true  -- email_confirmed
);

-- Create admin demo account  
SELECT auth.create_user(
  'admin@verma.com', 
  'admin123',
  '{"username": "admin_demo", "name": "Admin Demo", "role": "admin"}'::jsonb,
  true  -- email_confirmed
);

-- Create superadmin demo account
SELECT auth.create_user(
  'superadmin@verma.com',
  'superadmin123', 
  '{"username": "superadmin_demo", "name": "Super Admin Demo", "role": "superadmin"}'::jsonb,
  true  -- email_confirmed
);