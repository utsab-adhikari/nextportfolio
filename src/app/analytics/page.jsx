"use client";

import { useEffect, useState } from "react";

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch("/api/analytics");
        if (!res.ok) throw new Error("Failed to fetch analytics");
        const data = await res.json();
        setAnalytics(data.pages ?? []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">
        📊 Analytics Dashboard
      </h1>

      {loading && <p>Loading analytics...</p>}

      {error && (
        <p className="text-red-500 font-semibold">
          Error loading analytics: {error}
        </p>
      )}

      {!loading && !error && analytics.length === 0 && (
        <p>No analytics data available.</p>
      )}

      {!loading && !error && analytics.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700 text-sm">
            <thead className="bg-gray-800">
              <tr>
                <th className="text-left px-4 py-3 border-b border-gray-700">
                  Page
                </th>
                <th className="text-left px-4 py-3 border-b border-gray-700">
                  Views
                </th>
                <th className="text-left px-4 py-3 border-b border-gray-700">
                  Visitors
                </th>
                <th className="text-left px-4 py-3 border-b border-gray-700">
                  Bounce Rate
                </th>
              </tr>
            </thead>
            <tbody>
              {analytics.map((page) => (
                <tr key={page.path} className="hover:bg-gray-800">
                  <td className="px-4 py-2 border-b border-gray-700">
                    {page.path}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-700">
                    {page.visits}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-700">
                    {page.visitors}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-700">
                    {page.bounceRate
                      ? `${(page.bounceRate * 100).toFixed(1)}%`
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
