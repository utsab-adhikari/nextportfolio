import Link from "next/link";
import React from "react";

const NewsNavbar = ({ pathname }) => {
  const navLinks = [
    { href: "/news", label: "Latest" },
    { href: "/news/saved", label: "Saved" },
    { href: "/news/nagariknews", label: "Nagarik" },
    { href: "/news/thektmpost", label: "KTMPost" },
    { href: "/news/annapurnapost", label: "Annapurna" },
    { href: "/news/wion", label: "WION" },
  ];

  const linkStyle = (href) => {
    const baseClasses = "px-4 py-2 rounded-xl transition-all duration-300 whitespace-nowrap ";
    
    return pathname === href
      ? baseClasses + "bg-indigo-100 text-indigo-700 font-bold shadow-inner"
      : baseClasses + "text-gray-200 hover:bg-indigo-800 hover:text-white";
  };

  return (
    <nav 
      className="sticky top-0 z-50 bg-gradient-to-r from-indigo-900 to-indigo-700 shadow-lg"
      aria-label="News Navigation"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="relative flex items-center justify-between h-16">
          {/* Mobile dropdown button (hidden on desktop) */}
          <div className="md:hidden absolute inset-y-0 left-0 flex items-center">
            <select
              className="block w-full bg-indigo-800 text-white border-0 py-2 pl-3 pr-10 rounded-lg focus:ring-2 focus:ring-white"
              value={pathname}
              onChange={(e) => window.location.href = e.target.value}
              aria-label="Select news category"
            >
              {navLinks.map((link) => (
                <option key={link.href} value={link.href}>
                  {link.label}
                </option>
              ))}
            </select>
          </div>

          {/* Desktop navigation (hidden on mobile) */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="flex space-x-1 md:space-x-2 bg-indigo-800/30 backdrop-blur-sm p-1 rounded-xl">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={linkStyle(link.href)}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NewsNavbar;