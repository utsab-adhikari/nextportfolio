"use client"
import "./globals.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/mycomponents/AppSidebar";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Toaster } from "react-hot-toast";
import Footer from "@/mycomponents/Footer";

export default function Layout({ children }) {
  const pathname = usePathname();
  const [isIndex, setIsIndex] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (pathname === '/') {
      setIsIndex(true);
    } else {
      setIsIndex(false);
    }
  }, [pathname]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <SidebarProvider>
          <div className="flex flex-1 w-full">
            <AppSidebar />
            <SidebarTrigger className="fixed z-30 block md:hidden top-2 left-2" />

            {!isIndex && (
              <button className="fixed top-10 z-30 md:top-2 left-2 md:left-64 cursor-pointer hover:text-gray-500" onClick={() => router.back()}>
                <IoMdArrowRoundBack size={24} />
              </button>
            )}

            <div className="flex flex-1 flex-col">
              <main className="flex flex-1 w-full min-h-screen">
                <Toaster position="bottom-right" />
                <div className="w-full">{children}</div>
              </main>
              <Footer />
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}
