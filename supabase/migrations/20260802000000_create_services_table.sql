CREATE TABLE public.services (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  short_description text NOT NULL,
  description text NOT NULL,
  icon_name text NOT NULL,
  benefits jsonb DEFAULT '[]'::jsonb NOT NULL,
  status text DEFAULT 'published' NOT NULL,
  display_order integer DEFAULT 0 NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable public read access so the website can see them
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON public.services FOR SELECT USING (true);
