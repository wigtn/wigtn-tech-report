import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://research.wigtn.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "WIGTN Research",
    template: "%s | WIGTN Research",
  },
  description:
    "Research papers, model reports and engineering notes with the protocols, failure modes and artifacts behind each claim.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "WIGTN Research",
    description:
      "Methods, measurements and failure modes from AI systems built by WIGTN.",
    url: siteUrl,
    siteName: "WIGTN Research",
    type: "website",
  },
};

const researchOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "WIGTN",
  url: "https://wigtn.com",
  sameAs: ["https://github.com/wigtn", "https://huggingface.co/Wigtn"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(researchOrganization) }}
        />
      </head>
      <body className="bg-[#F7F6F2] font-sans text-[#1E1E28] antialiased">
        {children}
      </body>
    </html>
  );
}
