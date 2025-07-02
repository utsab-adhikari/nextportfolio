import AdminNavbar from "@/mycomponents/AdminNavbar";

export const metadata = {
  title: 'Admin Panel',
  description: 'Admin panel for managing tasks, schedules, chats, and settings.',
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <main className="">
        {children}
      </main>
    </div>
  );
}
