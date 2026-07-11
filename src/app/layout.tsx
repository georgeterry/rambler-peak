import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import { site, organizationJsonLd } from '@/lib/seo';
import { CartProvider } from '@/lib/cart';
import { Header } from '@/components/shell/Header';
import { Footer } from '@/components/shell/Footer';
import { CartDrawer } from '@/components/commerce/CartDrawer';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_GB',
    url: site.url,
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: 'summary_large_image', title: site.name, description: site.description },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#1E242B',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={poppins.variable}>
      <body className="bg-rp-white text-rp-charcoal min-h-screen flex flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-rp-blue focus:text-rp-white focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>
        <CartProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </body>
    </html>
  );
}
