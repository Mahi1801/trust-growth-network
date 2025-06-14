
-- Add status, created_at, and updated_at columns to the profiles table if they don't exist
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active' NOT NULL;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now() NOT NULL;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now() NOT NULL;

-- Create a trigger function to automatically update updated_at on row modification
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists, then create it to avoid errors on re-running
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- Enable Row Level Security on the profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create a function to check if the current user is an admin
-- SECURITY DEFINER allows it to bypass RLS within the function itself, preventing recursion
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'admin'
  );
$$;

-- Remove old policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Users can view and update their own profile." ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage all profiles." ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile." ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile." ON public.profiles;


-- Policy: Allow users to view and manage their own profile
CREATE POLICY "Users can view and update their own profile." ON public.profiles
FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Policy: Allow admins to view and manage all profiles
CREATE POLICY "Admins can manage all profiles." ON public.profiles
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

