'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const AdminNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Tasks', href: '/admin/tasks' },
    { name: 'Schedules', href: '/admin/schedules' },
    { name: 'Chats', href: '/admin/chats' },
    { name: 'Settings', href: '/admin/settings' },
  ];

  const handleLogout = () => {
    // You can add your logout logic here (e.g., clearing tokens, calling APIs)
    alert('Logged out!');
    router.push('/'); // Redirect to home after logout
  };

  return (
    <nav className="bg-slate-800 text-white px-6 py-4 shadow-md">
      <div className="flex items-center justify-between">
        {/* Logo or Title */}
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`hover:text-slate-300 ${
                  pathname === item.href ? 'text-slate-300 underline' : ''
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogout}
            className="hidden md:inline-block bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm"
          >
            Logout
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none"
          >
            {isOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block hover:text-slate-300 ${
                pathname === item.href ? 'text-slate-300 underline' : ''
              }`}
              onClick={() => setIsOpen(false)} // Close menu on link click
            >
              {item.name}
            </Link>
          ))}

          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="block bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
