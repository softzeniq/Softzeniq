-- Supabase Schema for SoftZeniq CMS

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    icon_name TEXT NOT NULL,
    title TEXT NOT NULL,
    short_description TEXT NOT NULL,
    description TEXT NOT NULL,
    benefits JSONB NOT NULL DEFAULT '[]'::jsonb,
    display_order INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    client TEXT NOT NULL,
    summary TEXT NOT NULL,
    result TEXT NOT NULL,
    tags JSONB NOT NULL DEFAULT '[]'::jsonb,
    gradient TEXT NOT NULL,
    thumbnail_url TEXT,
    gallery_urls JSONB DEFAULT '[]'::jsonb,
    featured BOOLEAN DEFAULT false,
    display_order INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Settings Table
CREATE TABLE IF NOT EXISTS public.settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Basic setup for Settings (Optional initial values)
INSERT INTO public.settings (key, value) VALUES
('company_info', '{"name": "SoftZeniq IT", "phone": "", "email": "", "whatsapp": "", "address": ""}'::jsonb),
('social_links', '{"facebook": "", "twitter": "", "linkedin": "", "instagram": ""}'::jsonb),
('seo', '{"meta_pixel": "", "google_analytics": ""}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- 4. Set up Row Level Security (RLS)

-- Services RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on published services" ON public.services FOR SELECT USING (status = 'published');
CREATE POLICY "Allow authenticated users full access on services" ON public.services FOR ALL USING (auth.role() = 'authenticated');

-- Projects RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on published projects" ON public.projects FOR SELECT USING (status = 'published');
CREATE POLICY "Allow authenticated users full access on projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');

-- Settings RLS
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users full access on settings" ON public.settings FOR ALL USING (auth.role() = 'authenticated');

-- 5. Storage for Media Library
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true) ON CONFLICT DO NOTHING;

-- Storage RLS
CREATE POLICY "Allow public read access on media bucket" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Allow authenticated users full access on media bucket" ON storage.objects FOR ALL USING (bucket_id = 'media' AND auth.role() = 'authenticated');
