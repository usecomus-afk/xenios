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
  themeColor: "#000000"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              #mobile-opening-splash {
                display: none;
              }
              @media (max-width: 767px) {
                #mobile-opening-splash {
                  display: flex !important;
                  position: fixed !important;
                  top: 0 !important;
                  left: 0 !important;
                  right: 0 !important;
                  bottom: 0 !important;
                  width: 100vw !important;
                  height: 100dvh !important;
                  height: 100vh !important;
                  z-index: 2147483647 !important;
                  background-color: #000000 !important;
                  align-items: center !important;
                  justify-content: center !important;
                  overflow: hidden !important;
                  user-select: none !important;
                  -webkit-user-select: none !important;
                  touch-action: none !important;
                }
                #mobile-opening-video {
                  width: 100% !important;
                  height: 100% !important;
                  object-fit: cover !important;
                  display: block !important;
                  background-color: #000000 !important;
                }
              }
              @media (min-width: 768px) {
                #mobile-opening-splash {
                  display: none !important;
                }
              }
            `
          }}
        />
      </head>
      <body className="antialiased selection:bg-amber-200">
        {/* Instant 0-millisecond Mobile Opening Splash Video */}
        <div id="mobile-opening-splash">
          <video
            id="mobile-opening-video"
            src="/xenios1618.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
          />
          <div
            style={{
              position: "absolute",
              bottom: "24px",
              left: 0,
              right: 0,
              textAlign: "center",
              pointerEvents: "none",
              zIndex: 10
            }}
          >
            <div
              style={{
                fontFamily: "monospace",
                fontSize: "10px",
                letterSpacing: "0.3em",
                color: "rgba(252, 211, 77, 0.9)",
                fontWeight: "bold",
                textTransform: "uppercase"
              }}
            >
              XENIOS ISTANBUL
            </div>
            <div
              style={{
                fontFamily: "serif",
                fontStyle: "italic",
                fontSize: "9px",
                color: "rgba(255, 255, 255, 0.7)",
                marginTop: "2px"
              }}
            >
              Digital Guest Directory & Concierge
            </div>
          </div>
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var isDesktop = window.innerWidth >= 768;
                  var hasSeen = sessionStorage.getItem('xenios_intro_seen_v4');
                  var splash = document.getElementById('mobile-opening-splash');
                  var video = document.getElementById('mobile-opening-video');

                  if (isDesktop || hasSeen) {
                    if (splash) splash.style.display = 'none';
                  } else {
                    if (video) {
                      video.play().catch(function() {});
                      var dismissed = false;
                      var dismiss = function() {
                        if (dismissed) return;
                        dismissed = true;
                        if (splash) {
                          splash.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
                          splash.style.opacity = '0';
                          splash.style.transform = 'scale(1.05)';
                          splash.style.pointerEvents = 'none';
                          sessionStorage.setItem('xenios_intro_seen_v4', '1');
                          setTimeout(function() {
                            splash.style.display = 'none';
                          }, 500);
                        }
                      };
                      video.onended = dismiss;
                      video.onerror = dismiss;
                      video.onclick = dismiss;
                      if (splash) splash.onclick = dismiss;
                    }
                  }
                } catch(e) {}
              })();
            `
          }}
        />

        <PwaRegister />
        <PwaInstallPrompt />
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
