export default function generateReport(tracker) {
  return `
    <h2>${escapeHtml(tracker.title)}</h2>
    <p><b>Date:</b> ${new Date(tracker.date).toISOString().slice(0, 10)}</p>
    <p><b>Description:</b> ${escapeHtml(tracker.description)}</p>
    <ul>
      ${tracker.tasks
        .map(
          (task) =>
            `<li>${task.completed ? "✅" : "❌"} <b>${escapeHtml(task.name)}</b>
            ${task.notes ? `<div style="margin-left:1rem;padding:0.25rem 0">${task.notes}</div>` : ""}
            </li>`
        )
        .join("")}
    </ul>
    <h3>General Notes</h3>
    <div>${tracker.editorContent || "<i>No notes submitted</i>"}</div>
  `;
}

// Escape text for HTML except for notes (which are HTML from Jodit)
function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/[&<>"']/g, function (m) {
    return (
      {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[m] || m
    );
  });
}