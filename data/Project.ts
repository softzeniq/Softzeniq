export type Project = {
  id: string;
  slug: string;
  title: string;
  category: "Web" | "SaaS" | "E-commerce" | "Mobile" | string;
  client: string;
  summary: string;
  result: string;
  tags: string[];
  gradient: string;
  link?: string;
  image_url?: string;
  show_on_home?: boolean;
  created_at?: string;
};

export const projects: Project[] = [
  {
    id: "1",
    slug: "dream-vision",
    title: "Dream Vision",
    category: "Web",
    client: "Dream Vision",
    summary: "Digital commerce and catalog platform for medical equipment.",
    result: "+312% trial-to-paid conversion",
    tags: ["Next.js", "Typescript", "Supabase","TailwindCss"],
    gradient: "from-[oklch(0.6_0.22_250)] to-[oklch(0.55_0.24_290)]",
  },
  {
    id: "2",
    slug: "aurora-store",
    title: "Aurora Apparel",
    category: "E-commerce",
    client: "Aurora",
    summary: "Headless commerce storefront with 1-tap checkout.",
    result: "2.4× revenue in 90 days",
    tags: ["Shopify", "Hydrogen", "Klaviyo"],
    gradient: "from-[oklch(0.6_0.22_295)] to-[oklch(0.55_0.2_330)]",
  },
  {
    id: "3",
    slug: "lumen-marketing",
    title: "Lumen AI",
    category: "Web",
    client: "Lumen",
    summary: "Marketing site & docs for a Series A AI startup.",
    result: "100/100 Lighthouse",
    tags: ["TanStack", "MDX", "Vercel"],
    gradient: "from-[oklch(0.62_0.22_250)] to-[oklch(0.58_0.22_270)]",
  },
  {
    id: "4",
    slug: "pulse-mobile",
    title: "Pulse Fitness",
    category: "Mobile",
    client: "Pulse",
    summary: "iOS & Android workout tracker with social challenges.",
    result: "4.9★ App Store rating",
    tags: ["React Native", "Supabase", "RevenueCat"],
    gradient: "from-[oklch(0.65_0.2_180)] to-[oklch(0.58_0.22_240)]",
  },
  {
    id: "5",
    slug: "ledger-saas",
    title: "Ledger Cloud",
    category: "SaaS",
    client: "Ledger",
    summary: "Accounting automation for indie founders.",
    result: "$1.2M ARR in year 1",
    tags: ["Node", "Postgres", "Plaid"],
    gradient: "from-[oklch(0.58_0.22_270)] to-[oklch(0.62_0.24_310)]",
  },
  {
    id: "6",
    slug: "kindred-store",
    title: "Kindred Goods",
    category: "E-commerce",
    client: "Kindred",
    summary: "Sustainable home brand DTC launch.",
    result: "12k orders in launch month",
    tags: ["Medusa", "Stripe", "Algolia"],
    gradient: "from-[oklch(0.6_0.18_140)] to-[oklch(0.55_0.22_220)]",
  },
];
