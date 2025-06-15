
-- Create ENUM types for crisis status and severity.
CREATE TYPE public.crisis_status AS ENUM ('active', 'monitoring', 'resolved', 'archived');
CREATE TYPE public.crisis_severity AS ENUM ('low', 'medium', 'high', 'critical');

-- Create the crises table.
CREATE TABLE public.crises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  status public.crisis_status NOT NULL DEFAULT 'active',
  severity public.crisis_severity NOT NULL DEFAULT 'medium',
  location TEXT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX ON public.crises (status);
CREATE INDEX ON public.crises (severity);
CREATE INDEX ON public.crises (created_by);

-- Enable Row-Level Security.
ALTER TABLE public.crises ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Admins can manage crises.
CREATE POLICY "Admins can manage crises"
ON public.crises FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Authenticated users can view all crises.
CREATE POLICY "Authenticated users can view crises"
ON public.crises FOR SELECT
USING (auth.role() = 'authenticated');

-- Trigger to update the updated_at column on changes.
CREATE TRIGGER handle_updated_at_crises
BEFORE UPDATE ON public.crises
FOR EACH ROW
EXECUTE PROCEDURE public.update_updated_at_column();
