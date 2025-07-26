"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("/api/request");
        if (res.data.success) {
          setRequests(res.data.requests);
        } else {
          setError(res.data.message || "Failed to load requests.");
        }
      } catch (err) {
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div className="px-4 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white mb-8">Pending Requests</h1>
      {loading ? (
        <div className="flex flex-col items-center mt-20">
          <div className="animate-spin rounded-full border-4 border-blue-600 border-t-transparent h-12 w-12 mb-3" />
          <p className="text-white text-lg">Loading requests...</p>
        </div>
      ) : error ? (
        <p className="text-red-400 text-lg">{error}</p>
      ) : requests.length === 0 ? (
        <p className="text-gray-400 text-lg">No pending requests found.</p>
      ) : (
        <div className="w-full max-w-2xl space-y-6">
          {requests.map((user) => (
            <div
              key={user._id}
              className="w-full bg-gray-900 border border-gray-800 rounded-2xl shadow-lg flex items-center p-5"
            >
              <img
                src={user.image || "/avatar-placeholder.png"}
                alt={user.name}
                className="w-16 h-16 rounded-full border-2 border-blue-500 object-cover mr-5 shadow"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-white">
                  {user.name}
                </h2>
                <p className="text-gray-400 text-sm">{user.email}</p>
                <span className="mt-2 inline-block px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-xs font-semibold">
                  Status: Pending
                </span>
              </div>
              <button className="flex-1 bg-green-400 py-2 rounded-md text-black font-semibold  hover:bg-green-300 cursor-pointer">
                Accept
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
