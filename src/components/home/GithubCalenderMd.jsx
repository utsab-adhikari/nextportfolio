"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaCalendarAlt, FaChartLine, FaSyncAlt, FaInfoCircle } from "react-icons/fa";

export default function GitHubCalendarFull() {
  const [weeks, setWeeks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ currentStreak: 0, maxStreak: 0, activeDays: 0 });
  const [timePeriodDescription, setTimePeriodDescription] = useState("past year"); // Dynamic description

  // Function to fetch and process GitHub contributions data
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null); // Clear any previous errors

      // Fetch data from the specified API endpoint
      const response = await fetch("/api/v1/github"); // Changed from /api/v1/github/md to /api/v1/github
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setWeeks(data.weeks || []);
      setTotal(data.total || 0);

      // Calculate additional stats
      const contributions = data.weeks.flatMap(week =>
        week.contributionDays.map(day => day.contributionCount)
      );

      let currentStreak = 0;
      let maxStreak = 0;
      let activeDaysCount = 0; // Count of days with contributions

      // Calculate current streak from the end
      if (contributions.length > 0) {
        for (let i = contributions.length - 1; i >= 0; i--) {
          if (contributions[i] > 0) {
            currentStreak++;
          } else {
            // If the last day has no contribution, current streak is 0
            if (i === contributions.length - 1) {
              currentStreak = 0;
            }
            break;
          }
        }
      }

      // Calculate max streak and active days
      let tempStreak = 0;
      for (const count of contributions) {
        if (count > 0) {
          tempStreak++;
          activeDaysCount++;
        } else {
          maxStreak = Math.max(maxStreak, tempStreak);
          tempStreak = 0;
        }
      }
      maxStreak = Math.max(maxStreak, tempStreak); // Account for streak ending at the end of the year

      setStats({
        currentStreak,
        maxStreak,
        activeDays: contributions.length > 0 ? Math.round((activeDaysCount / contributions.length) * 100) : 0
      });

      // Determine the time period description dynamically based on available data
      if (data.weeks && data.weeks.length > 0) {
        const firstDayOfFirstWeek = data.weeks[0]?.contributionDays[0];
        const lastWeek = data.weeks[data.weeks.length - 1];
        const lastDayOfLastWeek = lastWeek?.contributionDays[lastWeek.contributionDays.length - 1]; // Safely get the last day

        if (firstDayOfFirstWeek && lastDayOfLastWeek) {
          const firstDate = new Date(firstDayOfFirstWeek.date);
          const lastDate = new Date(lastDayOfLastWeek.date);
          const diffTime = Math.abs(lastDate - firstDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          const diffMonths = Math.round(diffDays / 30.44); // Average days in a month

          if (diffMonths <= 6 && diffMonths > 0) { // If 6 months or less, show specific months
            setTimePeriodDescription(`past ${diffMonths} month${diffMonths === 1 ? '' : 's'}`);
          } else if (diffMonths > 6) {
            setTimePeriodDescription("past year");
          } else {
            setTimePeriodDescription("recent activity"); // Fallback for very short periods or malformed dates
          }
        } else {
          setTimePeriodDescription("recent activity"); // Fallback if data is malformed
        }
      } else {
        setTimePeriodDescription("recent activity");
      }

      setLoading(false);
    } catch (err) {
      console.error("Failed to load GitHub contributions:", err);
      setError("Failed to load GitHub contributions. Please try again later.");
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Find the highest contribution count for color intensity scaling
  // Ensures maxContributions is at least 1 to prevent division by zero or negative infinity
  const maxContributions = Math.max(
    1,
    ...weeks.flatMap(week =>
      week.contributionDays.map(day => day.contributionCount)
    )
  );

  // Generate month labels dynamically based on the available data
  const getMonthLabels = () => {
    if (!weeks || weeks.length === 0) return [];

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthsInView = new Set();
    const monthPositions = [];

    weeks.forEach((week, weekIndex) => {
      week.contributionDays.forEach(day => {
        // Ensure day is not undefined and has a date property before accessing it
        if (day && day.date) {
          const date = new Date(day.date);
          const month = date.getMonth();
          const year = date.getFullYear();
          const monthKey = `${month}-${year}`;

          if (!monthsInView.has(monthKey)) {
            monthsInView.add(monthKey);
            monthPositions.push({
              name: monthNames[month],
              weekIndex: weekIndex,
              month: month,
              year: year
            });
          }
        }
      });
    });

    // Sort by date to ensure correct order
    monthPositions.sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.month - b.month;
    });

    return monthPositions;
  };

  const monthLabels = getMonthLabels();

  // Loading state UI
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 p-4 font-inter">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <FaGithub className="text-white w-16 h-16 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-gray-200 mb-4">
            Loading GitHub Contributions
          </h2>
          <p className="text-gray-400 mb-8">
            Fetching your coding activity...
          </p>
          <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto">
            <motion.div
              className="h-full bg-green-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  // Error state UI
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 p-4 font-inter">
        <div className="text-center max-w-2xl">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-200 mb-2">Data Loading Error</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={fetchData} // Use fetchData to retry
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-medium px-5 py-2.5 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            <FaSyncAlt className="w-5 h-5" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 p-4 md:p-8 font-inter overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full"> {/* Ensure main content stays within bounds */}
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="flex justify-center mb-4">
            <FaGithub className="text-white w-12 h-12" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            GitHub Contributions
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            Visual representation of your coding activity over the {timePeriodDescription}.
            Each square represents a day, with color intensity showing your contribution level.
          </p>
        </motion.header>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <FaCalendarAlt className="text-green-400 w-6 h-6" />
              <h3 className="text-lg font-semibold">Total Contributions</h3>
            </div>
            <p className="text-3xl font-bold text-green-400">{total}</p>
            <p className="text-sm text-gray-400 mt-1">in the {timePeriodDescription}</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <FaChartLine className="text-blue-400 w-6 h-6" />
              <h3 className="text-lg font-semibold">Current Streak</h3>
            </div>
            <p className="text-3xl font-bold text-blue-400">{stats.currentStreak} days</p>
            <p className="text-sm text-gray-400 mt-1">consecutive contributions</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-yellow-400 rounded-full p-1 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-900" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Max Streak</h3>
            </div>
            <p className="text-3xl font-bold text-yellow-400">{stats.maxStreak} days</p>
            <p className="text-sm text-gray-400 mt-1">longest streak achieved</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-purple-500 rounded-full w-6 h-6 flex items-center justify-center">
                <span className="text-xs font-bold text-white">%</span>
              </div>
              <h3 className="text-lg font-semibold">Active Days</h3>
            </div>
            <p className="text-3xl font-bold text-purple-400">{stats.activeDays}%</p>
            <p className="text-sm text-gray-400 mt-1">days with contributions</p>
          </div>
        </motion.div>

        {/* Visualization Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mb-10 shadow-xl"
        >
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Explanation Panel */}
            <div className="lg:w-1/2">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FaInfoCircle className="text-green-400" />
                Understanding Contribution Graph
              </h2>

              <div className="space-y-4">
                <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700">
                  <h3 className="font-semibold text-green-300 mb-2">Color Intensity</h3>
                  <p className="text-sm text-gray-300">
                    The color intensity of each square represents the number of contributions on that day:
                  </p>
                  <div className="flex items-center mt-3 gap-2">
                    <div className="flex rounded-md overflow-hidden">
                      {[0, 1, 2, 3, 4].map((level) => {
                        const intensity = level / 4;
                        const color = `rgba(46, 160, 67, ${0.2 + intensity * 0.8})`;
                        return (
                          <div
                            key={level}
                            className="w-5 h-5 border border-gray-700"
                            style={{ backgroundColor: color }}
                          />
                        );
                      })}
                    </div>
                    <div className="text-xs text-gray-400 flex justify-between w-20">
                      <span>Less</span>
                      <span>More</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700">
                  <h3 className="font-semibold text-blue-300 mb-2">Pattern Insights</h3>
                  <p className="text-sm text-gray-300">
                    Your contribution patterns reveal your coding habits. Consistent contributions indicate
                    strong development practices, while gaps may represent breaks or focus on non-code work.
                  </p>
                </div>

                <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700">
                  <h3 className="font-semibold text-purple-300 mb-2">Contribution Types</h3>
                  <p className="text-sm text-gray-300">
                    Contributions include code commits, pull requests, issues, and code reviews. Each action
                    counts toward your daily total, reflecting your overall GitHub activity.
                  </p>
                </div>

                <button
                  onClick={fetchData} // Use fetchData to refresh
                  className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-medium px-5 py-2.5 rounded-lg transition-colors duration-300 mt-4 shadow-lg hover:shadow-xl"
                >
                  <FaSyncAlt className="w-5 h-5" />
                  <span>Refresh Data</span>
                </button>
              </div>
            </div>

            {/* Calendar Visualization */}
            <div className="lg:w-1/2 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">
                  Contribution Calendar
                </h2>
                <div className="text-sm text-gray-400">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
              </div>

              <div className="bg-gray-900/50 w-fit max-h-91 p-4 md:p-6 rounded-xl flex-grow flex flex-col overflow-hidden border border-gray-700 shadow-inner">
                {/* Month labels - Adjusted for better visual alignment with weeks */}
                <div className="flex gap-1 mb-2">
                  {/* Placeholder for day labels alignment */}
                  <div className="w-6 hidden sm:block"></div>
                  {/* Dynamic month labels based on data */}
                  {monthLabels.length > 0 && (
                    <div className="flex flex-grow justify-between overflow-hidden">
                      {monthLabels.map((monthInfo, index) => {
                        // Calculate width based on weeks from this month's start to next month's start
                        let width = 0;
                        if (index < monthLabels.length - 1) {
                          width = (monthLabels[index + 1].weekIndex - monthInfo.weekIndex) * (16 + 4); // 16px width + 4px gap
                        } else {
                          // For the last month, calculate width to the end of the calendar
                          width = (weeks.length - monthInfo.weekIndex) * (16 + 4);
                        }

                        return (
                          <div key={`${monthInfo.name}-${monthInfo.year}`}
                            className="text-xs text-gray-400 text-left flex-shrink-0"
                            style={{ minWidth: `${width}px` }}
                          >
                            {monthInfo.name}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="flex flex-grow ">
                  {/* Day labels */}
                  <div className="flex flex-col gap-1 mr-2 flex-shrink-0">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                      <div key={i} className={`text-xs text-gray-400 h-4 flex items-center justify-center ${i % 2 === 0 ? '' : 'opacity-0'}`}>
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Grid - Horizontal scrollable */}
                  <div className="flex gap-1 overflow-x-auto pb-4 flex-grow justify-end">
                    {weeks.map((week, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-1 flex-shrink-0">
                        {week.contributionDays.map((day, dayIndex) => {
                          // Calculate color intensity based on contributions
                          const intensity = Math.min(day.contributionCount / maxContributions, 1);
                          const color = `rgba(46, 160, 67, ${0.2 + intensity * 0.8})`;

                          // Get the day of the week (0 for Sunday, 6 for Saturday)
                          const date = day && day.date ? new Date(day.date) : null; // Safely create Date object
                          const dayOfWeek = date ? date.getDay() : 0; // Default to Sunday if date is invalid

                          return (
                            <motion.div
                              key={dayIndex}
                              className="w-4 h-4 rounded-sm border border-gray-800"
                              style={{
                                backgroundColor: color,
                                // Adjust top margin for days that are not Sunday (first day of the week)
                                marginTop: dayIndex === 0 && dayOfWeek !== 0 ? `${dayOfWeek * (16 + 4)}px` : '0px' // 16px height + 4px gap
                              }}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                                transition: {
                                  delay: (weekIndex * 0.01) + (dayIndex * 0.002),
                                  duration: 0.3
                                }
                              }}
                              whileHover={{
                                scale: 1.5,
                                zIndex: 10,
                                boxShadow: "0 0 10px rgba(46, 160, 67, 0.5)"
                              }}
                              title={day && day.date ? `${day.date}: ${day.contributionCount} contribution${day.contributionCount === 1 ? '' : 's'}` : 'No data'}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-6 flex items-center justify-center">
                  <div className="flex items-center gap-4 bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700 shadow-md">
                    <span className="text-xs text-gray-400">Less</span>
                    <div className="flex rounded-md overflow-hidden">
                      {[0, 1, 2, 3, 4].map((level) => {
                        const intensity = level / 4;
                        const color = `rgba(46, 160, 67, ${0.2 + intensity * 0.8})`;
                        return (
                          <div
                            key={level}
                            className="w-4 h-4 border border-gray-700"
                            style={{ backgroundColor: color }}
                          />
                        );
                      })}
                    </div>
                    <span className="text-xs text-gray-400">More</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center text-gray-500 text-sm pt-6 border-t border-gray-800/50"
        >
          <p className="mb-2">
            Data fetched live from the{' '}
            <a
              href="https://docs.github.com/en/rest/activity/events"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 underline"
            >
              GitHub API
            </a>
          </p>
          <p>
            Contribution graph shows activity over the {timePeriodDescription} • Updates automatically
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
