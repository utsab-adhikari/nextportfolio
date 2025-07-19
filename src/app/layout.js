"use client";
import "./globals.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/mycomponents/AppSidebar";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Toaster } from "react-hot-toast";
import Footer from "@/mycomponents/Footer";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import Script from "next/script";

export default function Layout({ children }) {
  const pathname = usePathname();
  const [isIndex, setIsIndex] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsIndex(pathname === "/");
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-1ZMEDGLMSL`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1ZMEDGLMSL', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Global Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          .font-noto-devanagari {
            font-family: 'Noto Sans Devanagari', sans-serif;
          }
          .font-inter {
            font-family: 'Inter', sans-serif;
          }
        `}</style>
      </head>

      <body className="flex min-h-screen flex-col bg-slate-900 text-white font-sans">
        <SidebarProvider>
          <div className="flex flex-1 w-full">
            <AppSidebar />
            <SidebarTrigger className="fixed z-30 block md:hidden top-2 left-2" />

            {!isIndex && (
              <button
                className="fixed top-10 z-30 text-white md:top-2 left-2 md:left-64 cursor-pointer hover:text-gray-400"
                onClick={() => router.back()}
              >
                <IoMdArrowRoundBack size={24} />
              </button>
            )}

            <div className="flex flex-1 flex-col">
              <main className="flex flex-1 w-full min-h-screen">
                <Toaster position="bottom-right" />
                <div className="w-full">{children}</div>
              </main>

              {!isIndex || pathname === "/chatbot" && (
                <div className="bg-slate-900">
                  <Link
                    className="block md:hidden mx-auto py-1 my-2 px-4 border border-indigo-600 text-indigo-500 font-semibold rounded-full flex items-center text-center gap-2 w-fit"
                    href="/"
                  >
                    <FaHome />
                    Home
                  </Link>
                </div>
              )}
              <Footer />
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
