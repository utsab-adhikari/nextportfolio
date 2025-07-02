import React from "react";

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 hover:scale-105 transition">
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <p className="text-gray-600 mb-4">Manage all registered users.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Manage Users
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:scale-105 transition">
          <h2 className="text-xl font-semibold mb-2">Projects</h2>
          <p className="text-gray-600 mb-4">Add or edit portfolio projects.</p>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Manage Projects
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:scale-105 transition">
          <h2 className="text-xl font-semibold mb-2">Messages</h2>
          <p className="text-gray-600 mb-4">View messages from visitors.</p>
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
            View Messages
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
