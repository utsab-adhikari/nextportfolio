import { Calendar, Home, Inbox, LogIn, Search, Settings } from "lucide-react";

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
import { IconSignRight } from "@tabler/icons-react";
import { IoMdClose } from "react-icons/io";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "News",
    url: "/news",
    icon: Inbox,
  },
  {
    title: "Login",
    url: "/login",
    icon: LogIn,
  },
  {
    title: "Signup",
    url: "/signup",
    icon: IconSignRight,
  },
  {
    title: "Create",
    url: "/blog/create",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar>
      <SidebarContent  className="bg-stone-900 backdrop-blur-lg text-white">
        <SidebarGroup>
          <div className="absolute p-3 flex justify-end items-center w-full block md:hidden">
            <button
              onClick={() => toggleSidebar()}
              className="text-gray-300 hover:text-white transition"
            >
              <IoMdClose size={24} />
            </button>
          </div>
          <SidebarGroupLabel className="text-stone-700 font-semibold">
            Utsab Adhikari's Portfolio
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center gap-3 px-4 py-2 rounded-md text-white hover:bg-stone-600 hover:text-white transition"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
