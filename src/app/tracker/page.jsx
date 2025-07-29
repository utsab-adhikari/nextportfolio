"use client";

import Loader from "@/mycomponents/Loader";
import { useSession } from "next-auth/react";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// --- MiniEditor Component ---
function MiniEditor({
  value,
  onChange,
  placeholder = "Write here...",
  disabled,
}) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const execCommand = useCallback(
    (cmd) => {
      if (disabled) return;
      document.execCommand(cmd, false, null);
      onChange(editorRef.current.innerHTML);
      editorRef.current.focus();
    },
    [onChange, disabled]
  );

  const toggleNumberedList = useCallback(() => {
    if (disabled) return;
    document.execCommand("insertOrderedList");
    onChange(editorRef.current.innerHTML);
    editorRef.current.focus();
  }, [onChange, disabled]);

  const handleInput = useCallback(() => {
    onChange(editorRef.current.innerHTML);
  }, [onChange]);

  return (
    <div className="mini-editor">
      <div className="toolbar">
        <button
          type="button"
          title="Bold"
          onClick={() => execCommand("bold")}
          disabled={disabled}
        >
          <b>B</b>
        </button>
        <button
          type="button"
          title="Italic"
          onClick={() => execCommand("italic")}
          disabled={disabled}
        >
          <i>I</i>
        </button>
        <button
          type="button"
          title="Numbered List"
          onClick={toggleNumberedList}
          disabled={disabled}
        >
          1.
        </button>
      </div>
      <div
        ref={editorRef}
        className={`editable-content${disabled ? " disabled" : ""}`}
        contentEditable={!disabled}
        spellCheck={false}
        data-placeholder={placeholder}
        onInput={handleInput}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
      />
      <style jsx>{`
        .mini-editor {
          background: #2b2b2b;
          border: 1px solid #444;
          border-radius: 8px;
          padding: 10px;
          margin-bottom: 8px;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
        }
        .toolbar {
          display: flex;
          gap: 6px;
          margin-bottom: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid #3a3a3a;
        }
        .toolbar button {
          background: #3a3a3a;
          color: #ffe066;
          border: none;
          border-radius: 5px;
          font-size: 0.9rem;
          width: 32px;
          height: 32px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.2s ease, color 0.2s ease;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
        }
        .toolbar button:hover:enabled {
          background: #4a4a4a;
          color: #ffed8a;
        }
        .toolbar button:active:enabled {
          background: #5a5a5a;
        }
        .toolbar button:disabled {
          background: #333;
          color: #888;
          cursor: not-allowed;
        }
        .editable-content {
          min-height: 48px;
          max-height: 120px;
          overflow-y: auto;
          width: 100%;
          color: #e0e0e0;
          font-size: 1rem;
          line-height: 1.5;
          outline: none;
          padding: 6px 0;
          word-wrap: break-word;
          background: #222;
          border-radius: 4px;
        }
        .editable-content.disabled {
          background: #222;
          color: #888;
          pointer-events: none;
        }
        .editable-content:empty:before {
          content: attr(data-placeholder);
          color: #888;
          font-style: italic;
          pointer-events: none;
        }
        .editable-content b,
        .editable-content strong {
          font-weight: bold;
          color: #fff;
        }
        .editable-content i,
        .editable-content em {
          font-style: italic;
          color: #f0f0f0;
        }
        .editable-content ol {
          padding-left: 25px;
          margin-top: 5px;
          margin-bottom: 5px;
        }
        .editable-content li {
          margin-bottom: 4px;
        }
      `}</style>
    </div>
  );
}

const DEFAULT_TASKS = [
  "Exam Preparation",
  "GSOC Preparation",
  "Project and Contribution",
  "Programming Concept",
  "Extra",
];

function isEditableNow() {
  const now = new Date();
  const hour = now.getHours();
  return hour >= 3 && hour < 22;
}

export default function Tracker() {
  const [trackerId, setTrackerId] = useState(""); // id from backend
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState(
    DEFAULT_TASKS.map((name) => ({ name, completed: false, notes: "" }))
  );
  const [generalNotes, setGeneralNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editable, setEditable] = useState(isEditableNow());

  const { data: session, status } = useSession();

  // Load today's tracker or create if not exists
  useEffect(() => {
    async function loadOrCreateTracker() {
      setLoading(true);
      setMessage("");
      try {
        // Try to GET by today's date (e.g., /api/tracker?date=YYYY-MM-DD)
        const res = await fetch(`/api/tracker?date=${date}`);
        let data;
        if (res.ok) {
          data = await res.json();
          if (data && data._id) {
            setTrackerId(data._id);
            setTitle(data.title || "Edit Later");
            setDescription(data.description || "");
            setTasks(
              data.tasks && data.tasks.length
                ? data.tasks
                : DEFAULT_TASKS.map((name) => ({
                    name,
                    completed: false,
                    notes: "",
                  }))
            );
            setGeneralNotes(data.generalNotes || "");
          } else {
            // Create if not exists
            const createRes = await fetch("/api/tracker", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                title: "",
                date,
                description: "",
                tasks: DEFAULT_TASKS.map((name) => ({
                  name,
                  completed: false,
                  notes: "",
                })),
                generalNotes: "",
              }),
            });
            const created = await createRes.json();
            setTrackerId(created._id);
            setTitle(created.title || "Edit Later");
            setDescription(created.description || "");
            setTasks(
              created.tasks ||
                DEFAULT_TASKS.map((name) => ({
                  name,
                  completed: false,
                  notes: "",
                }))
            );
            setGeneralNotes(created.generalNotes || "");
          }
        } else {
          setMessage("Error loading tracker!");
        }
      } catch (error) {
        setMessage("Network error loading tracker.");
      }
      setLoading(false);
    }
    loadOrCreateTracker();
  }, [date]);

  useEffect(() => {
    const updateEditable = () => setEditable(isEditableNow());
    updateEditable();
    const timer = setInterval(updateEditable, 60000);
    return () => clearInterval(timer);
  }, []);

  // Add a new task to the list
  const addTask = useCallback(() => {
    if (!editable) return;
    if (tasks.length < 10) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { name: "", completed: false, notes: "" },
      ]);
    }
  }, [tasks.length, editable]);

  const toggleTaskCompletion = useCallback(
    (idx) => {
      if (!editable) return;
      setTasks((prevTasks) =>
        prevTasks.map((task, i) =>
          i === idx ? { ...task, completed: !task.completed } : task
        )
      );
    },
    [editable]
  );

  const handleTaskNameChange = useCallback(
    (idx, name) => {
      if (!editable) return;
      setTasks((prevTasks) =>
        prevTasks.map((task, i) => (i === idx ? { ...task, name } : task))
      );
    },
    [editable]
  );

  const handleTaskNotesChange = useCallback(
    (idx, notes) => {
      if (!editable) return;
      setTasks((prevTasks) =>
        prevTasks.map((task, i) => (i === idx ? { ...task, notes } : task))
      );
    },
    [editable]
  );

  // Save tracker (PUT)
  const handleSave = async () => {
    if (!editable || !trackerId) return;
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`/api/tracker/${trackerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          date,
          description,
          tasks,
          generalNotes,
        }),
      });
      if (res.ok) {
        setMessage("Progress saved successfully!");
      } else {
        const errorData = await res.json();
        setMessage(
          `Error saving progress: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      setMessage("Network error or server unreachable. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return <Loader />;
  }

  if (!session || session.user.role !== "admin") {
    return (
      <div className="flex flex-col justify-center items-center py-10 min-h-screen">
        <AiOutlineLoading3Quarters className="animate-spin text-3xl text-indigo-500" />

        <p className="text-md font-semibold text-gray-400 mt-4">Only <b className="text-indigo-600">Utsab Adhikari</b> is allowed for this route</p>
      </div>
    );
  }

  return (
    <div className="container">
      {!editable && (
        <div className="notice">
          <b>Editing is disabled outside 3:00 AM – 10:00 PM.</b>
        </div>
      )}
      <h1>Daily Progress Tracker</h1>
      <p className="subtitle">
        Record your daily achievements and tasks efficiently.
      </p>
      <section>
        <label htmlFor="title-input">Title</label>
        <input
          id="title-input"
          type="text"
          value={title}
          onChange={(e) => editable && setTitle(e.target.value)}
          placeholder="e.g., Week 27 Review, Sprint Planning"
          aria-label="Daily tracker title"
          disabled={!editable}
        />

        <label htmlFor="date-input">Date</label>
        <input
          id="date-input"
          type="date"
          value={date}
          onChange={(e) => editable && setDate(e.target.value)}
          aria-label="Date of the daily tracker entry"
          disabled={!editable}
        />

        <label htmlFor="description-input">Description</label>
        <input
          id="description-input"
          type="text"
          value={description}
          onChange={(e) => editable && setDescription(e.target.value)}
          placeholder="A brief overview of the day's focus"
          aria-label="Short description for the daily tracker"
          disabled={!editable}
        />
      </section>
      <h2>Daily Tasks</h2>
      <p className="section-description">
        Manage your daily tasks, mark them complete, and add specific notes.
      </p>
      <div className="tasks-list">
        {tasks.map((task, idx) => (
          <div key={idx} className="task-block">
            <div className="task-row">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(idx)}
                id={`task-checkbox-${idx}`}
                aria-label={`Mark task ${
                  task.name || `Task ${idx + 1}`
                } as complete`}
                disabled={!editable}
              />
              <label htmlFor={`task-checkbox-${idx}`} className="sr-only">
                Task Completion
              </label>
              <input
                type="text"
                value={task.name}
                onChange={(e) => handleTaskNameChange(idx, e.target.value)}
                placeholder={`Task ${idx + 1} Name`}
                className="task-input"
                aria-label={`Name for task ${idx + 1}`}
                disabled={!editable}
              />
            </div>
            <MiniEditor
              value={task.notes}
              onChange={(notes) => handleTaskNotesChange(idx, notes)}
              placeholder="Add specific notes or details for this task (bold, italic, numbering supported)"
              disabled={!editable}
            />
          </div>
        ))}
      </div>
      {tasks.length < 10 && (
        <button
          type="button"
          className="add-task-btn"
          onClick={addTask}
          disabled={!editable}
        >
          + Add New Task
        </button>
      )}
      <h2>General Notes</h2>
      <p className="section-description">
        Use this space for overall observations, reflections, or future
        planning.
      </p>
      <MiniEditor
        value={generalNotes}
        onChange={setGeneralNotes}
        placeholder="Type your general notes here (bold, italic, numbering supported)"
        disabled={!editable}
      />
      <button
        type="submit"
        onClick={handleSave}
        disabled={loading || !editable || !trackerId}
        className="save-btn"
      >
        {loading ? "Saving..." : "Save Progress"}
      </button>
      {message && (
        <div
          className={`message ${
            message.includes("Error") ? "error" : "success"
          }`}
        >
          {message}
        </div>
      )}
      <style jsx>{`
        .container {
          max-width: 700px;
          margin: 40px auto;
          padding: 30px;
          background: #1a1a1a;
          border-radius: 12px;
          box-shadow: 0 5px 25px rgba(0, 0, 0, 0.5);
          color: #e0e0e0;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }
        .notice {
          background: #ffe4b2;
          color: #663c00;
          border-radius: 6px;
          padding: 10px 16px;
          margin-bottom: 16px;
          text-align: center;
        }
        h1 {
          text-align: center;
          color: #ffe066;
          font-weight: 700;
          margin-bottom: 10px;
          font-size: 2.2em;
        }
        .subtitle {
          text-align: center;
          color: #bbb;
          margin-bottom: 30px;
          font-size: 1.1em;
        }
        h2 {
          text-align: center;
          color: #ffe066;
          font-weight: 600;
          margin-top: 35px;
          margin-bottom: 15px;
          font-size: 1.8em;
        }
        .section-description {
          text-align: center;
          color: #a0a0a0;
          font-size: 0.95em;
          margin-bottom: 25px;
        }
        label {
          display: block;
          margin-top: 25px;
          margin-bottom: 6px;
          font-weight: 600;
          color: #e0e0e0;
          font-size: 1.05em;
        }
        input[type="text"],
        input[type="date"] {
          width: 100%;
          padding: 12px 15px;
          border-radius: 8px;
          border: 1px solid #444;
          background: #252525;
          color: #e0e0e0;
          font-size: 1.05rem;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        input[type="text"]:focus,
        input[type="date"]:focus {
          border-color: #ffe066;
          box-shadow: 0 0 0 2px rgba(255, 224, 102, 0.3);
          outline: none;
        }
        input:disabled {
          background: #222;
          color: #888;
        }
        .tasks-list {
          margin-top: 25px;
        }
        .task-block {
          margin-bottom: 30px;
          background: #202020;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          padding: 15px 20px;
          border: 1px solid #333;
        }
        .task-row {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
        }
        .task-row input[type="checkbox"] {
          width: 20px;
          height: 20px;
          appearance: none;
          background-color: #3a3a3a;
          border: 1px solid #555;
          border-radius: 4px;
          cursor: pointer;
          position: relative;
          flex-shrink: 0;
        }
        .task-row input[type="checkbox"]:checked {
          background-color: #ffe066;
          border-color: #ffe066;
        }
        .task-row input[type="checkbox"]:checked::after {
          content: "✔";
          color: #202020;
          font-size: 14px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .task-input {
          flex: 1;
          padding: 10px 12px;
          border-radius: 6px;
          background: #2b2b2b;
          border: 1px solid #444;
          color: #e0e0e0;
          font-size: 1rem;
          transition: border-color 0.2s ease;
        }
        .task-input:focus {
          border-color: #ffe066;
          outline: none;
        }
        .task-input:disabled {
          background: #222;
          color: #888;
        }
        .add-task-btn {
          background: #2b2b2b;
          color: #ffe066;
          border: 1px solid #ffe066;
          border-radius: 8px;
          margin-top: 10px;
          padding: 10px 25px;
          font-size: 1.05rem;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.3s ease, color 0.3s ease,
            border-color 0.3s ease;
          display: block;
          width: fit-content;
          margin-left: auto;
          margin-right: auto;
        }
        .add-task-btn:hover:enabled {
          background: #ffe066;
          color: #1a1a1a;
          border-color: #ffe066;
        }
        .add-task-btn:disabled {
          background: #333;
          color: #888;
          cursor: not-allowed;
        }
        .save-btn {
          margin-top: 35px;
          padding: 15px 40px;
          background: #ffe066;
          color: #1a1a1a;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 700;
          font-size: 1.15rem;
          transition: background 0.3s ease, transform 0.2s ease;
          display: block;
          width: fit-content;
          margin-left: auto;
          margin-right: auto;
        }
        .save-btn:hover:not(:disabled) {
          background: #ffed8a;
          transform: translateY(-2px);
        }
        .save-btn:disabled {
          background: #444;
          color: #bbb;
          cursor: not-allowed;
          box-shadow: none;
        }
        .message {
          margin-top: 25px;
          padding: 12px 20px;
          border-radius: 8px;
          text-align: center;
          font-weight: 500;
          font-size: 1rem;
          transition: opacity 0.3s ease;
        }
        .message.success {
          background-color: #4caf50;
          color: #fff;
        }
        .message.error {
          background-color: #f44336;
          color: #fff;
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        @media (max-width: 768px) {
          .container {
            margin: 20px auto;
            padding: 20px;
          }
          h1 {
            font-size: 1.8em;
          }
          h2 {
            font-size: 1.5em;
          }
          .save-btn {
            padding: 12px 30px;
            font-size: 1.05rem;
          }
        }
        @media (max-width: 480px) {
          .container {
            border-radius: 0;
            padding: 15px;
            margin: 0;
            min-height: 100vh;
          }
          .task-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .task-input {
            width: 100%;
          }
          .toolbar button {
            width: 28px;
            height: 28px;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
}
