
-- Initial schema migration for the ICE Alarm application

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the contact_submissions table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'new'
);

-- Add Row Level Security to contact_submissions
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for contact_submissions
CREATE POLICY "Contact submissions are viewable by admins"
  ON public.contact_submissions FOR SELECT
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

CREATE POLICY "Contact submissions can be created by anyone"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Contact submissions are editable by admins"
  ON public.contact_submissions FOR UPDATE
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

-- Create the emergency_contacts table
CREATE TABLE IF NOT EXISTS public.emergency_contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  relationship TEXT,
  phone TEXT,
  email TEXT,
  is_primary BOOLEAN DEFAULT FALSE,
  notification_preferences JSONB DEFAULT '{"sms": true, "email": true, "call": false}'::JSONB,
  notes TEXT
);

-- Add Row Level Security to emergency_contacts
ALTER TABLE public.emergency_contacts ENABLE ROW LEVEL SECURITY;

-- Create policies for emergency_contacts
CREATE POLICY "Users can view their own emergency contacts"
  ON public.emergency_contacts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own emergency contacts"
  ON public.emergency_contacts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own emergency contacts"
  ON public.emergency_contacts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own emergency contacts"
  ON public.emergency_contacts FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp automatically
CREATE OR REPLACE FUNCTION public.update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to emergency_contacts table
CREATE TRIGGER update_emergency_contacts_updated_at
BEFORE UPDATE ON public.emergency_contacts
FOR EACH ROW
EXECUTE FUNCTION public.update_modified_column();

-- Create medical_info table
CREATE TABLE IF NOT EXISTS public.medical_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  allergies JSONB DEFAULT '[]'::JSONB,
  conditions JSONB DEFAULT '[]'::JSONB,
  medications JSONB DEFAULT '[]'::JSONB,
  blood_type TEXT,
  notes TEXT
);

-- Add Row Level Security to medical_info
ALTER TABLE public.medical_info ENABLE ROW LEVEL SECURITY;

-- Create policies for medical_info
CREATE POLICY "Users can view their own medical info"
  ON public.medical_info FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own medical info"
  ON public.medical_info FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own medical info"
  ON public.medical_info FOR UPDATE
  USING (auth.uid() = user_id);

-- Apply trigger to medical_info table
CREATE TRIGGER update_medical_info_updated_at
BEFORE UPDATE ON public.medical_info
FOR EACH ROW
EXECUTE FUNCTION public.update_modified_column();

-- Create device_registrations table
CREATE TABLE IF NOT EXISTS public.device_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  device_id TEXT NOT NULL,
  device_type TEXT NOT NULL,
  device_name TEXT,
  status TEXT DEFAULT 'active',
  last_active TIMESTAMP WITH TIME ZONE,
  settings JSONB DEFAULT '{}'::JSONB
);

-- Add Row Level Security to device_registrations
ALTER TABLE public.device_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for device_registrations
CREATE POLICY "Users can view their own device registrations"
  ON public.device_registrations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own device registrations"
  ON public.device_registrations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own device registrations"
  ON public.device_registrations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own device registrations"
  ON public.device_registrations FOR DELETE
  USING (auth.uid() = user_id);

-- Apply trigger to device_registrations table
CREATE TRIGGER update_device_registrations_updated_at
BEFORE UPDATE ON public.device_registrations
FOR EACH ROW
EXECUTE FUNCTION public.update_modified_column();

-- Create table for health metrics
CREATE TABLE IF NOT EXISTS public.health_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  device_id UUID REFERENCES public.device_registrations(id),
  metric_type TEXT NOT NULL,
  metric_value NUMERIC NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT
);

-- Add Row Level Security to health_metrics
ALTER TABLE public.health_metrics ENABLE ROW LEVEL SECURITY;

-- Create policies for health_metrics
CREATE POLICY "Users can view their own health metrics"
  ON public.health_metrics FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own health metrics"
  ON public.health_metrics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_emergency_contacts_user_id ON public.emergency_contacts(user_id);
CREATE INDEX idx_medical_info_user_id ON public.medical_info(user_id);
CREATE INDEX idx_device_registrations_user_id ON public.device_registrations(user_id);
CREATE INDEX idx_device_registrations_device_id ON public.device_registrations(device_id);
CREATE INDEX idx_health_metrics_user_id ON public.health_metrics(user_id);
CREATE INDEX idx_health_metrics_recorded_at ON public.health_metrics(recorded_at);
