-- Location: supabase/migrations/20241028125946_mate_cu_succes_auth_payments.sql
-- Schema Analysis: Fresh project - no existing tables detected
-- Integration Type: Complete authentication and payment system
-- Dependencies: None - creates full schema from scratch

-- 1. Types and Enums
CREATE TYPE public.user_role AS ENUM ('admin', 'student', 'parent', 'teacher');
CREATE TYPE public.subscription_status AS ENUM ('active', 'expired', 'cancelled', 'pending');
CREATE TYPE public.subscription_type AS ENUM ('bac_2025', 'evaluare_nationala', 'premium_cursuri', 'fise_complete');
CREATE TYPE public.payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE public.grade_level AS ENUM ('clasa_5', 'clasa_6', 'clasa_7', 'clasa_8', 'clasa_9', 'clasa_10', 'clasa_11', 'clasa_12');

-- 2. Core Tables - User Management
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role public.user_role DEFAULT 'student'::public.user_role,
    grade_level public.grade_level,
    preferences JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Subscription Management
CREATE TABLE public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    subscription_type public.subscription_type NOT NULL,
    status public.subscription_status DEFAULT 'pending'::public.subscription_status,
    start_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMPTZ,
    price DECIMAL(10,2) NOT NULL,
    features JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Payment Transactions
CREATE TABLE public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE SET NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'RON',
    status public.payment_status DEFAULT 'pending'::public.payment_status,
    netopia_transaction_id TEXT,
    netopia_order_id TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. User Progress Tracking
CREATE TABLE public.user_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    worksheet_id TEXT NOT NULL,
    completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
    last_accessed TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    score INTEGER,
    time_spent_minutes INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 6. Saved Worksheets
CREATE TABLE public.saved_worksheets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    worksheet_id TEXT NOT NULL,
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    grade_level public.grade_level NOT NULL,
    saved_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 7. Essential Indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX idx_payments_user_id ON public.payments(user_id);
CREATE INDEX idx_payments_status ON public.payments(status);
CREATE INDEX idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX idx_saved_worksheets_user_id ON public.saved_worksheets(user_id);
CREATE UNIQUE INDEX idx_user_progress_unique ON public.user_progress(user_id, worksheet_id);
CREATE UNIQUE INDEX idx_saved_worksheets_unique ON public.saved_worksheets(user_id, worksheet_id);

-- 8. Functions - User Profile Management
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'student'::public.user_role)
  );
  RETURN NEW;
END;
$$;

-- 9. Utility Functions
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;

-- 10. Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_worksheets ENABLE ROW LEVEL SECURITY;

-- 11. RLS Policies - Pattern 1: Core User Tables
CREATE POLICY "users_manage_own_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Pattern 2: Simple User Ownership
CREATE POLICY "users_manage_own_subscriptions"
ON public.subscriptions
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_payments"
ON public.payments
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_progress"
ON public.user_progress
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_saved_worksheets"
ON public.saved_worksheets
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 12. Triggers
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON public.user_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 13. Mock Data for Testing
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    student_uuid UUID := gen_random_uuid();
    parent_uuid UUID := gen_random_uuid();
    subscription_uuid UUID := gen_random_uuid();
BEGIN
    -- Create complete auth.users records
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@matecusucces.ro', crypt('admin123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Administrator MCS", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (student_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'elev@matecusucces.ro', crypt('elev123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Popescu Ion", "role": "student"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (parent_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'parinte@matecusucces.ro', crypt('parinte123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Popescu Maria", "role": "parent"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create subscription and payment data
    INSERT INTO public.subscriptions (id, user_id, subscription_type, status, end_date, price) VALUES
        (subscription_uuid, student_uuid, 'bac_2025'::public.subscription_type, 'active'::public.subscription_status, 
         CURRENT_TIMESTAMP + INTERVAL '365 days', 199.99);

    INSERT INTO public.payments (user_id, subscription_id, amount, status, netopia_transaction_id) VALUES
        (student_uuid, subscription_uuid, 199.99, 'completed'::public.payment_status, 'TXN_' || generate_random_uuid());

    -- Create sample progress and saved worksheets
    INSERT INTO public.user_progress (user_id, worksheet_id, completion_percentage, score) VALUES
        (student_uuid, 'functii_clasa_12', 85, 17),
        (student_uuid, 'limite_derivate', 92, 19);

    INSERT INTO public.saved_worksheets (user_id, worksheet_id, title, subject, grade_level) VALUES
        (student_uuid, 'functii_clasa_12', 'Funcții - Clasa XII', 'Matematică', 'clasa_12'::public.grade_level),
        (student_uuid, 'limite_derivate', 'Limite și Derivate', 'Matematică', 'clasa_12'::public.grade_level);

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error: %', SQLERRM;
END $$;