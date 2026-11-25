-- Tables for Contact Inquiries and Newsletter Subscribers

CREATE TABLE IF NOT EXISTS public.inquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  project_type text NOT NULL,
  budget text,
  message text NOT NULL,
  status text DEFAULT 'new' NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Public visitors can submit leads/subscriptions, only authenticated admins can read/manage them
CREATE POLICY "Allow public insert on inquiries"
  ON public.inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow authenticated full access on inquiries"
  ON public.inquiries FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public insert on newsletter_subscribers"
  ON public.newsletter_subscribers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow authenticated full access on newsletter_subscribers"
  ON public.newsletter_subscribers FOR ALL
  USING (auth.role() = 'authenticated');
