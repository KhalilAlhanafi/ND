import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "../globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import CustomCursor from "@/components/CustomCursor";
import PageLoader from "@/components/PageLoader";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-general-sans", // using the same variable name for compatibility
  display: "swap",
});

export const metadata: Metadata = {
  title: "ND Natural Products",
  description: "Skincare, unrefined. From the earth, to the skin.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${fraunces.variable} ${inter.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <PageLoader />
          <CustomCursor />
          <SmoothScrolling>
            {children}
          </SmoothScrolling>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
