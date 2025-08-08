import { Home, Inbox, Calendar } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { IoMdClose } from "react-icons/io";
import { GiSkills } from "react-icons/gi";
import { TbMessageChatbot } from "react-icons/tb";
import { FaOm } from "react-icons/fa6";
import { FaExclamationCircle, FaGoogle, FaStroopwafel } from "react-icons/fa";
import { signIn, signOut, useSession } from "next-auth/react";
import { LuLogOut } from "react-icons/lu";
import { IoAnalyticsOutline } from "react-icons/io5";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { FiUser } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { SiGoogledocs } from "react-icons/si";
import { PiReadCvLogoFill } from "react-icons/pi";

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "News", url: "/news", icon: Inbox },
  { title: "Rashifal", url: "/rashifal", icon: FaOm },
  { title: "Chatbot", url: "/chatbot", icon: TbMessageChatbot },
  { title: "Skills", url: "/skills", icon: GiSkills },
  { title: "Resume", url: "/resume", icon: PiReadCvLogoFill },
  { title: "About", url: "/about", icon: FaExclamationCircle },
  { title: "Astro", url: "/astro", icon: FaStroopwafel },
];

const adminItems = [
  { title: "Tracker", url: "/tracker", icon: IoAnalyticsOutline },
  { title: "Plans", url: "/plans", icon: Calendar },
  { title: "Applications", url: "/hireme/applications", icon: SiGoogledocs },
];

export function AppSidebar() {
  const { toggleSidebar } = useSidebar();
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const [isMounted, setIsMounted] = useState(false);
  const isMediumOrAbove = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return (
    <Sidebar>
      <SidebarContent className="bg-slate-900 border-r border-slate-800 backdrop-blur-lg text-slate-200 flex flex-col h-screen w-74 md:w-auto fixed md:static z-40">
        {!isMediumOrAbove && (
          <div className="absolute p-3 flex justify-end items-center w-full md:hidden">
            <button
              onClick={toggleSidebar}
              className="text-slate-400 hover:text-slate-200 transition rounded-lg bg-slate-800 p-1.5 z-10"
              aria-label="Close sidebar"
            >
              <IoMdClose size={18} />
            </button>
          </div>
        )}

        <div className="flex flex-col flex-1 overflow-hidden pt-12 md:pt-0">
          <div className="p-4 mb-2 border-b border-slate-800">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Utsab Adhikari
            </h1>
            <p className="text-xs text-slate-500 mt-1">Developer Portfolio</p>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar pb-4">
            <SidebarGroup className="mt-2">
              <SidebarGroupLabel className="text-slate-600 text-xs uppercase tracking-wider px-4">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition group"
                          onClick={isMediumOrAbove ? undefined : toggleSidebar}
                        >
                          <item.icon className="w-5 h-5 text-cyan-400 transition-transform group-hover:scale-110" />
                          <div className="flex-1">
                            <span className="font-medium">{item.title}</span>
                          </div>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {session?.user?.role === "admin" && (
              <SidebarGroup className="mt-4">
                <SidebarGroupLabel className="text-slate-600 text-xs uppercase tracking-wider px-4">
                  Admin Tools
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {adminItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <Link
                            href={item.url}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition group"
                            onClick={isMediumOrAbove ? undefined : toggleSidebar}
                          >
                            <item.icon className="w-5 h-5 text-violet-400 transition-transform group-hover:scale-110" />
                            <div className="flex-1">
                              <span className="font-medium">{item.title}</span>
                            </div>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </div>

          <div className="mt-auto p-4 border-t border-slate-800">
            <AnimatePresence>
              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3"
                >
                  <Skeleton className="h-10 w-10 rounded-full bg-slate-800" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32 bg-slate-800" />
                    <Skeleton className="h-3 w-24 bg-slate-800" />
                  </div>
                </motion.div>
              ) : session ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-3"
                >
                  <div className="flex items-center gap-3">
                    {session.user?.image ? (
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                        <img
                          src={session.user.image}
                          alt={session.user.name || "User avatar"}
                          width={40}
                          height={40}
                          className="rounded-full border border-slate-700 relative z-1"
                        />
                      </div>
                    ) : (
                      <div className="bg-slate-800 border border-slate-700 rounded-full w-10 h-10 flex items-center justify-center">
                        <FiUser className="text-slate-400" size={18} />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-sm text-slate-200 truncate max-w-[150px]">
                        {session.user?.name || "User"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="flex items-center justify-center gap-2 w-full mt-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition group"
                  >
                    <motion.span
                      whileHover={{ x: -3 }}
                      className="flex items-center gap-2"
                    >
                      <LuLogOut size={16} />
                      <span>Sign Out</span>
                    </motion.span>
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => signIn("google")}
                  className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaGoogle className="text-blue-400 group-hover:animate-pulse" />
                  <span>Sign in with Google</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </SidebarContent>

      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #334155 transparent;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 10px;
          margin: 4px 0;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #334155;
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: content-box;
          transition: background-color 0.3s;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #475569;
        }

        .custom-scrollbar::-webkit-scrollbar-corner {
          background: transparent;
        }
      `}</style>
    </Sidebar>
  );
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}