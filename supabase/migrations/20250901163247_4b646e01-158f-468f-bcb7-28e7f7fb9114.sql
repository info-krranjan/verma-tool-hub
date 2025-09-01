-- Insert demo user accounts
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES 
-- User demo account
('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'user@verma.com', crypt('user123', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"username":"user_demo","name":"User Demo","role":"user"}', false, 'authenticated'),
-- Admin demo account  
('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'admin@verma.com', crypt('admin123', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"username":"admin_demo","name":"Admin Demo","role":"admin"}', false, 'authenticated'),
-- Super admin demo account
('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', 'superadmin@verma.com', crypt('superadmin123', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"username":"superadmin_demo","name":"Super Admin Demo","role":"superadmin"}', false, 'authenticated')
ON CONFLICT (id) DO NOTHING;

-- Insert corresponding user profiles (will be created by trigger, but let's ensure they exist)
INSERT INTO public.user_profiles (id, user_id, username, name, role) VALUES 
('11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'user_demo', 'User Demo', 'user'),
('22222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'admin_demo', 'Admin Demo', 'admin'),  
('33333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', 'superadmin_demo', 'Super Admin Demo', 'superadmin')
ON CONFLICT (user_id) DO NOTHING;