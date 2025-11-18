-- Free Resources schema: table, RLS, and download counter

-- 1) Types
DO $$ BEGIN
  CREATE TYPE public.resource_type AS ENUM ('worksheet','video','interactive','test','other');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 2) Table
CREATE TABLE IF NOT EXISTS public.resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  type public.resource_type NOT NULL DEFAULT 'worksheet',
  grade TEXT NOT NULL, -- e.g. '5'..'12' to match UI
  subject TEXT NOT NULL,
  thumbnail_url TEXT,
  file_path TEXT,       -- path inside storage bucket
  download_url TEXT,    -- public URL for file
  duration_minutes INTEGER, -- for videos
  pages INTEGER,            -- for worksheets/tests
  rating NUMERIC(3,1) DEFAULT 5.0,
  downloads INTEGER DEFAULT 0,
  topics TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT TRUE,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3) Triggers
CREATE OR REPLACE FUNCTION public.resources_set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS trg_resources_updated_at ON public.resources;
CREATE TRIGGER trg_resources_updated_at
  BEFORE UPDATE ON public.resources
  FOR EACH ROW EXECUTE FUNCTION public.resources_set_updated_at();

-- 4) RLS
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- Anyone (even anon) can read published resources
DROP POLICY IF EXISTS resources_select ON public.resources;
CREATE POLICY resources_select
ON public.resources
FOR SELECT
TO public
USING (published IS TRUE);

-- Only admins can insert/update/delete
DROP POLICY IF EXISTS resources_admin_write ON public.resources;
CREATE POLICY resources_admin_write
ON public.resources
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role = 'admin'::public.user_role
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role = 'admin'::public.user_role
  )
);

-- 5) Convenience function to bump downloads
CREATE OR REPLACE FUNCTION public.increment_resource_downloads(res_id UUID)
RETURNS TABLE(id UUID, downloads INTEGER) AS $$
BEGIN
  UPDATE public.resources
  SET downloads = downloads + 1
  WHERE public.resources.id = res_id
  RETURNING public.resources.id, public.resources.downloads
  INTO id, downloads;
  RETURN NEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6) Indexes
CREATE INDEX IF NOT EXISTS idx_resources_published ON public.resources(published);
CREATE INDEX IF NOT EXISTS idx_resources_created_at ON public.resources(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_resources_downloads ON public.resources(downloads DESC);
