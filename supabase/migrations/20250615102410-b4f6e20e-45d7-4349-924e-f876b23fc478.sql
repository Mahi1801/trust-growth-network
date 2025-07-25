
-- Create a table to store platform-wide settings
CREATE TABLE public.platform_settings (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row-Level Security for the settings table
ALTER TABLE public.platform_settings ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow admins full access to settings
-- This uses the existing is_admin() function to check the user's role.
CREATE POLICY "Admins can manage platform settings"
ON public.platform_settings
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Create a trigger to automatically update the 'updated_at' timestamp
-- This uses the existing update_updated_at_column() function.
CREATE TRIGGER handle_platform_settings_updated_at
BEFORE UPDATE ON public.platform_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed an initial setting for maintenance mode
INSERT INTO public.platform_settings (key, value, description)
VALUES ('maintenance_mode', '{"enabled": false, "message": "The platform is temporarily down for maintenance. We will be back shortly."}', 'Controls the maintenance mode for the entire platform.');
