
-- Step 1: Create an Enum for verification status.
CREATE TYPE public.verification_status AS ENUM ('pending', 'approved', 'rejected', 'flagged_for_review');

-- Step 2: Create an Enum for document types.
CREATE TYPE public.document_type AS ENUM ('passport', 'id_card', 'drivers_license', 'utility_bill');

-- Step 3: Create the document_verifications table.
CREATE TABLE public.document_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  document_type public.document_type NOT NULL,
  document_front_url TEXT NOT NULL,
  document_back_url TEXT,
  status public.verification_status NOT NULL DEFAULT 'pending',
  reviewed_by UUID REFERENCES public.profiles(id),
  review_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX ON public.document_verifications (user_id);
CREATE INDEX ON public.document_verifications (status);

-- Step 4: Enable Row-Level Security.
ALTER TABLE public.document_verifications ENABLE ROW LEVEL SECURITY;

-- Step 5: Define RLS policies.
-- Admins can perform all actions on verification records.
CREATE POLICY "Admins can manage document verifications"
ON public.document_verifications FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Users can view their own verification records.
CREATE POLICY "Users can view their own document verifications"
ON public.document_verifications FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own verification records.
CREATE POLICY "Users can create their own document verifications"
ON public.document_verifications FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Step 6: Create a trigger to update the updated_at column
CREATE TRIGGER handle_updated_at
BEFORE UPDATE ON public.document_verifications
FOR EACH ROW
EXECUTE PROCEDURE public.update_updated_at_column();
