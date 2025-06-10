import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { ThemeRegistry } from '@/theme/ThemeRegistry';
import { ColorModeProvider } from '@/hooks/useColorMode';
import { I18nProvider } from '@/i18n/I18nProvider';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: {
    template: '%s | Admin Panel',
    default: 'Admin Panel',
  },
  description: 'Powerful admin dashboard for managing your e-commerce store.',
  keywords: ['admin', 'dashboard', 'ecommerce', 'management', 'store'],
  authors: [{ name: 'Your Company Name' }],
  robots: 'noindex, nofollow', // Since this is an admin panel
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2196f3',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics - Only load in production */}
        {process.env.NODE_ENV === 'production' && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                    send_page_view: true
                  });
                `,
              }}
            />
          </>
        )}

        {/* Meta Pixel - Only load in production */}
        {process.env.NODE_ENV === 'production' && (
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
      </head>
      <body className={inter.className}>
        <ThemeRegistry>
          <ColorModeProvider>
            <I18nProvider>
              {children}
            </I18nProvider>
          </ColorModeProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}