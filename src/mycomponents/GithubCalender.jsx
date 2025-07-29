"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const calendarVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

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
    <motion.div
      className="p-4 bg-slate-900/50 backdrop-blur-lg rounded-xl"
      initial="hidden"
      animate="visible"
      variants={calendarVariants}
    >
      <h2 className="text-xl text-center font-bold mb-2 gradient-text">GitHub Contributions</h2>
      <p className="text-sm text-gray-400 mb-4">
        Total contributions in the last year: <span className="font-semibold text-green-400">{total}</span>
      </p>
      <div className="flex gap-1 overflow-x-auto">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.contributionDays.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className="w-4 h-4 rounded-sm transition-transform hover:scale-125"
                style={{ backgroundColor: day.color || "#ebedf0" }}
                title={`${day.date} — ${day.contributionCount} contributions`}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-gray-400">
        Data fetched from{" "}
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="underline text-indigo-400 hover:text-indigo-300">
          GitHub API
        </a>
      </p>
    </motion.div>
  );
}