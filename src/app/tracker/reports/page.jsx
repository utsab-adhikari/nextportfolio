'use client';

import { useEffect, useState } from 'react';

export default function TrackerReports() {
  const [trackers, setTrackers] = useState([]);

  useEffect(() => {
    fetch('/api/tracker')
      .then(res => res.json())
      .then(data => setTrackers(data));
  }, []);

  return (
    <div className="container">
      <h1>Tracker Reports</h1>
      {trackers.map(tracker => (
        <div key={tracker._id} className="report">
          <h2>{tracker.title} ({tracker.date.slice(0,10)})</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: tracker.reportHtml
                || '<i>No report submitted</i>',
            }}
          />
        </div>
      ))}
      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 40px auto;
          padding: 20px;
          background: #181818;
          color: #eee;
        }
        .report {
          background: #222;
          border-radius: 8px;
          margin-bottom: 28px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,.15);
        }
        h1 {
          text-align: center;
          color: #ffd700;
        }
        h2 {
          color: #ffd700;
        }
        ul {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        li {
          margin-bottom: 1rem;
        }
        i {
          color: #bbb;
        }
      `}</style>
    </div>
  );
}