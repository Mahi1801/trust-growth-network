
-- Create a table for public user profiles
CREATE TABLE public.profiles (
  id uuid NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  organization TEXT,
  location TEXT,
  user_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Add comments to the columns for clarity
COMMENT ON TABLE public.profiles IS 'Stores public profile information for each user.';
COMMENT ON COLUMN public.profiles.id IS 'References the user''s ID from the auth.users table.';
COMMENT ON COLUMN public.profiles.user_type IS 'The type of user (e.g., vendor, ngo, corporate, admin).';

-- Enable Row Level Security (RLS) for the profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow authenticated users to read any profile
-- This is often safe for public profile data, but can be restricted if needed.
CREATE POLICY "Public profiles are viewable by authenticated users."
  ON public.profiles FOR SELECT
  USING ( auth.role() = 'authenticated' );

-- RLS Policy: Allow users to create their own profile
CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );

-- RLS Policy: Allow users to update their own profile
CREATE POLICY "Users can update their own profile."
  ON public.profiles FOR UPDATE
  USING ( auth.uid() = id );

-- This trigger function automatically creates a profile entry for a new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER -- This is important for accessing auth.users
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, phone, organization, location, user_type, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    NEW.raw_user_meta_data ->> 'phone',
    NEW.raw_user_meta_data ->> 'organization',
    NEW.raw_user_meta_data ->> 'location',
    NEW.raw_user_meta_data ->> 'user_type',
    NEW.email
  );
  RETURN NEW;
END;
$$;

-- Create the trigger that fires the function on new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

