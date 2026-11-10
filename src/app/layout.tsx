import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { facts } from "@/data/facts";
import { defaultTheme, site, themeStorageKey } from "@/data/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: facts.name,
  url: site.url,
  jobTitle: facts.role,
  email: facts.links.email,
  sameAs: [facts.links.github, facts.links.linkedin],
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { template: "%s · Hassnain Abbas", default: site.title },
  description: site.description,
  authors: [{ name: site.author }],
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
    images: [
      { url: "/opengraph-image.svg", width: 1200, height: 630 },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0c0d" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme={defaultTheme}
      className="h-full"
      suppressHydrationWarning
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){const k="${themeStorageKey}";let t;try{t=localStorage.getItem(k)}catch(e){}if(t!=="dark"&&t!=="light")t="${defaultTheme}";document.documentElement.dataset.theme=t;document.documentElement.classList.toggle("theme-light",t==="light");window.toggleTheme=function(){const h=document.documentElement;const n=h.dataset.theme==="light"?"dark":"light";try{localStorage.setItem(k,n)}catch(e){}h.dataset.theme=n;h.classList.toggle("theme-light",n==="light");};document.documentElement.addEventListener("click",function(e){const b=e.target&&e.target.closest?e.target.closest(".theme-toggle"):null;if(b)window.toggleTheme();});})();`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <header className="sticky top-0 z-40"></header>
        <main id="main" className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
