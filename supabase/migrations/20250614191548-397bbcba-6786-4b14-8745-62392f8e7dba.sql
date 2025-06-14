
-- Add new fields to campaigns to track more impact metrics
ALTER TABLE public.campaigns
ADD COLUMN sector TEXT,
ADD COLUMN projected_sroi NUMERIC,
ADD COLUMN lives_impacted INTEGER,
ADD COLUMN communities_reached INTEGER,
ADD COLUMN region TEXT;

-- Create a table for CSR compliance items
CREATE TABLE public.compliance_items (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    status TEXT NOT NULL, -- e.g., 'Met', 'Pending'
    details TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS to compliance_items
ALTER TABLE public.compliance_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own compliance items"
  ON public.compliance_items FOR ALL
  USING ( auth.uid() = user_id );

-- Create a table to manage connections between corporates and NGOs
CREATE TABLE public.connections (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    corporate_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    ngo_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending', -- e.g., 'pending', 'accepted', 'rejected'
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (corporate_id, ngo_id)
);

-- Add RLS to connections
ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their connections" ON public.connections
FOR SELECT USING (auth.uid() = corporate_id OR auth.uid() = ngo_id);

CREATE POLICY "Corporates can create connections" ON public.connections
FOR INSERT WITH CHECK (auth.uid() = corporate_id AND (SELECT user_type from public.profiles where id = auth.uid()) = 'corporate');

CREATE POLICY "NGOs can update connections" ON public.connections
FOR UPDATE USING (auth.uid() = ngo_id AND (SELECT user_type from public.profiles where id = auth.uid()) = 'ngo');

CREATE POLICY "Corporates can delete connections" ON public.connections
FOR DELETE USING (auth.uid() = corporate_id AND (SELECT user_type from public.profiles where id = auth.uid()) = 'corporate');
