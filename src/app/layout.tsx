import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import { PwaRegister } from "@/components/pwa-register";
import { PwaInstallPrompt } from "@/components/pwa-install-prompt";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xenios - Istanbul Digital Guest Directory & Concierge",
  description: "ComusV2 Istanbul Digital In-Room Directory, QR Check-in, City Experiences & Gemini AI Concierge",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#f8f6f0"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased selection:bg-amber-200">
        <PwaRegister />
        <PwaInstallPrompt />
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
