
-- Step 1: Create an Enum for different user roles for better type safety.
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'support');

-- Step 2: Create a table to assign roles to users. A user can have multiple roles.
CREATE TABLE public.user_roles (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Step 3: Create a helper function to check if a user has a specific role.
CREATE OR REPLACE FUNCTION public.check_user_role(p_user_id UUID, p_role public.app_role)
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM user_roles
    WHERE user_id = p_user_id AND role = p_role
  );
END;
$$;

-- Step 4: Update the is_admin function to use the new roles table.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT public.check_user_role(auth.uid(), 'admin');
$$;

-- Step 5: Enable Row-Level Security on the new user_roles table.
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Step 6: Define RLS policies for user_roles.
CREATE POLICY "Admins can manage user roles" ON public.user_roles FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

-- Step 7: Create a table for audit trails to log important actions.
CREATE TABLE public.audit_log (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  actor_id UUID REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  target_id UUID,
  target_type TEXT,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 8: Enable RLS on the audit log table.
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Step 9: Define RLS policy for the audit log. Only admins can view it.
CREATE POLICY "Admins can view audit logs" ON public.audit_log FOR SELECT USING (public.is_admin());

-- Step 10: Grant the 'admin' role to all existing users marked as 'admin' in the profiles table.
-- This is a one-time migration step to populate the new user_roles table.
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM public.profiles
WHERE user_type = 'admin'
ON CONFLICT (user_id, role) DO NOTHING;
