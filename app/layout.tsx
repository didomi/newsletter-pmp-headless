import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from 'next/script'
import { NextUIProvider } from "@nextui-org/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Didomi Demo",
  description: "Newsletter Guest User",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script type="text/javascript" src="https://sdk.privacy-center.org/v2/loader.js" />
      <Script id="banner-config">
        {`window.didomiConfig = {
      apiKey: '8a2fa26d-5c21-4119-a611-931141d24911',
      app: { apiKey: '8a2fa26d-5c21-4119-a611-931141d24911' },
      components: {
        version: 2,
        helpersEnabled: true, 
        componentsEnabled: true,
      },
      user: { shouldReadTokenFromLocalStorage: true },
      widgets: [],
    }`}
      </Script>

      <body className={inter.className}>
        <NextUIProvider>{children}</NextUIProvider>
      </body>

    </html>
  );
}