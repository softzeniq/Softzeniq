import { Navbar } from "@/components/shared/Navbar";
import type { Metadata } from "next";
import "./globals.css";

import Footer from "@/components/shared/Footer";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { supabase } from "@/lib/supabase";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await supabase
    .from("site_settings")
    .select("favicon")
    .eq("id", 1)
    .single();

  const customFavicon = settings?.favicon || null;

  return {
    metadataBase: new URL("https://softzeniqit.xyz"),
    title: {
      default: "SoftZeniq | Build. Scale. Transform.",
      template: "%s | SoftZeniq",
    },
    description:
      "Premium IT solutions and software agency. We build and scale custom web apps, mobile apps, bespoke software, UI/UX, and SEO strategy for startups and brands worldwide.",
    keywords: [
      "software agency",
      "web development",
      "mobile app development",
      "UI/UX design",
      "custom software",
      "SEO optimization",
      "SoftZeniq",
      "tech agency",
    ],
    authors: [{ name: "SoftZeniq Team", url: "https://softzeniqit.xyz" }],
    creator: "SoftZeniq",
    publisher: "SoftZeniq",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://softzeniqit.xyz",
      title: "SoftZeniq | Premium Web & Software Development Agency",
      description:
        "Premium IT solutions and software agency. We build and scale custom web apps, mobile apps, bespoke software, UI/UX, and SEO strategy for startups and brands worldwide.",
      siteName: "SoftZeniq IT",
      images: [
        {
          url: "/images/logo2.png",
          width: 1200,
          height: 630,
          alt: "SoftZeniq - Build. Scale. Transform.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "SoftZeniq | Premium Web & Software Development Agency",
      description:
        "Premium IT solutions and software agency. We build and scale custom web apps, mobile apps, bespoke software, UI/UX, and SEO strategy for startups and brands worldwide.",
      images: ["/images/logo2.png"],
      creator: "@softzeniq",
    },
    icons: {
      icon: customFavicon 
        ? [{ url: customFavicon, sizes: "any" }]
        : [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/images/logo.png", type: "image/png", sizes: "192x192" },
          ],
      shortcut: customFavicon || "/favicon.ico",
      apple: [{ url: customFavicon || "/images/logo.png", sizes: "180x180", type: "image/png" }],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: settings } = await supabase
    .from("site_settings")
    .select("header_logo, footer_logo")
    .eq("id", 1)
    .single();

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} `}>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <Navbar customLogoUrl={settings?.header_logo} />

        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1436596694895589');
fbq('track', 'PageView');
`}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1436596694895589&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {children}
        <Footer customLogoUrl={settings?.footer_logo} />
        <WhatsAppButton />
        <ScrollToTop />
      </body>
    </html>
  );
}
