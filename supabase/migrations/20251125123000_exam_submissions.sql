-- Exam submissions: stores metadata about simulated exam uploads
-- 1) Table
CREATE TABLE IF NOT EXISTS public.exam_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exam_year SMALLINT NOT NULL CHECK (exam_year >= 2000 AND exam_year <= EXTRACT(YEAR FROM CURRENT_DATE)),
  subject TEXT NOT NULL CHECK (char_length(subject) < 100),
  duration_seconds INTEGER NOT NULL CHECK (duration_seconds > 0 AND duration_seconds < 6*3600),
  file_path TEXT NOT NULL, -- storage path (in private bucket)
  file_size_bytes INTEGER NOT NULL CHECK (file_size_bytes > 0 AND file_size_bytes <= 10*1024*1024),
  mime_type TEXT NOT NULL CHECK (mime_type IN ('application/pdf','image/jpeg','image/png')),
  submitted_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- 2) Indexes
CREATE INDEX IF NOT EXISTS idx_exam_submissions_user ON public.exam_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_submissions_year ON public.exam_submissions(exam_year);

-- 3) Enable RLS
ALTER TABLE public.exam_submissions ENABLE ROW LEVEL SECURITY;

-- 4) Policies: users can INSERT/SELECT their own rows
DROP POLICY IF EXISTS exam_submissions_select ON public.exam_submissions;
CREATE POLICY exam_submissions_select
ON public.exam_submissions
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

DROP POLICY IF EXISTS exam_submissions_insert ON public.exam_submissions;
CREATE POLICY exam_submissions_insert
ON public.exam_submissions
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- 5) (Optional future) Admins can review all submissions
DROP POLICY IF EXISTS exam_submissions_admin_all ON public.exam_submissions;
CREATE POLICY exam_submissions_admin_all
ON public.exam_submissions
FOR ALL
TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_profiles up WHERE up.id = auth.uid() AND up.role = 'admin'::public.user_role))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_profiles up WHERE up.id = auth.uid() AND up.role = 'admin'::public.user_role));

-- 6) Storage bucket (private) for exam submissions
INSERT INTO storage.buckets (id, name, public)
SELECT 'exam-submissions', 'exam-submissions', FALSE
WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'exam-submissions');

-- 7) Storage policies: users read/write only their own paths (prefix with their UID)
DROP POLICY IF EXISTS exam_submissions_storage_select ON storage.objects;
CREATE POLICY exam_submissions_storage_select
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'exam-submissions' AND (storage.foldername(name))[1] = auth.uid()::text);

DROP POLICY IF EXISTS exam_submissions_storage_insert ON storage.objects;
CREATE POLICY exam_submissions_storage_insert
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'exam-submissions' AND (storage.foldername(name))[1] = auth.uid()::text);

DROP POLICY IF EXISTS exam_submissions_storage_delete ON storage.objects;
CREATE POLICY exam_submissions_storage_delete
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'exam-submissions' AND (storage.foldername(name))[1] = auth.uid()::text);

-- 8) Helper function to record a submission (SECURITY DEFINER optional later)
CREATE OR REPLACE FUNCTION public.create_exam_submission(
  p_exam_year SMALLINT,
  p_subject TEXT,
  p_duration_seconds INTEGER,
  p_file_path TEXT,
  p_file_size_bytes INTEGER,
  p_mime_type TEXT
) RETURNS public.exam_submissions AS $$
DECLARE
  v_row public.exam_submissions;
BEGIN
  INSERT INTO public.exam_submissions (user_id, exam_year, subject, duration_seconds, file_path, file_size_bytes, mime_type)
  VALUES (auth.uid(), p_exam_year, p_subject, p_duration_seconds, p_file_path, p_file_size_bytes, p_mime_type)
  RETURNING * INTO v_row;
  RETURN v_row;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
