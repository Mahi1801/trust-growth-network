
-- Create the campaigns table to store corporate campaign data
CREATE TABLE public.campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    corporate_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    funding_goal NUMERIC NOT NULL CHECK (funding_goal > 0),
    amount_raised NUMERIC NOT NULL DEFAULT 0 CHECK (amount_raised >= 0),
    target_audience TEXT,
    status TEXT NOT NULL DEFAULT 'draft',
    impact_score INT
);

-- Add a comment explaining the purpose of the table
COMMENT ON TABLE public.campaigns IS 'Stores social impact campaigns created by corporate partners.';

-- Create a trigger to automatically update the 'updated_at' column on modification
CREATE TRIGGER update_campaigns_updated_at
BEFORE UPDATE ON public.campaigns
FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- Enable Row Level Security for the campaigns table
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow corporates to manage their own campaigns
CREATE POLICY "Corporates can manage their own campaigns"
ON public.campaigns
FOR ALL
USING (corporate_id = auth.uid())
WITH CHECK (corporate_id = auth.uid());

-- RLS Policy: Allow admins to manage all campaigns
CREATE POLICY "Admins can manage all campaigns"
ON public.campaigns
FOR ALL
USING (public.is_admin());

