"use client";
import { useEffect, useState } from "react";

export default function GitHubCalendar() {
  const [weeks, setWeeks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/github")
      .then((res) => res.json())
      .then((data) => {
        setWeeks(data.weeks || []);
        setTotal(data.total || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-400">
        Loading GitHub contributions...
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl text-center font-bold mb-2 text-indigo-800">
        GitHub Contributions
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Total contributions in the last year:{" "}
        <span className="font-semibold text-green-600">{total}</span>
      </p>

      {/* GitHub-style grid */}
      <div className="flex gap-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.contributionDays.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className="w-3 h-3 rounded-sm"
                style={{
                  backgroundColor: day.color || "#ebedf0",
                }}
                title={`${day.date} — ${day.contributionCount} contributions`}
              ></div>
            ))}
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-gray-400">
        Data fetched live from{" "}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-500"
        >
          GitHub API
        </a>
      </p>
    </div>
  );
}
