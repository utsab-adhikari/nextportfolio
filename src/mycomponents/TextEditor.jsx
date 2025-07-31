"use client";
import { useState, useRef, useEffect } from "react";

export default function TextEditor({ value, onChange }) {
  const [content, setContent] = useState(value || "");
  const editorRef = useRef(null);

  useEffect(() => {
    setContent(value || "");
    if (editorRef.current) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    setContent(editorRef.current.innerHTML);
    onChange(editorRef.current.innerHTML);
  };

  const handleInput = () => {
    setContent(editorRef.current.innerHTML);
    onChange(editorRef.current.innerHTML);
  };

  return (
    <div className="border border-slate-700 rounded p-2 bg-slate-900">
      {/* Toolbar */}
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => execCommand("bold")}
          className="px-3 py-1 bg-slate-800 text-gray-300 rounded hover:bg-slate-700 hover:text-white transition"
        >
          <b>B</b>
        </button>
        <button
          type="button"
          onClick={() => execCommand("italic")}
          className="px-3 py-1 bg-slate-800 text-gray-300 italic rounded hover:bg-slate-700 hover:text-white transition"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => execCommand("insertOrderedList")}
          className="px-3 py-1 bg-slate-800 text-gray-300 rounded hover:bg-slate-700 hover:text-white transition"
        >
          1.
        </button>
      </div>

      {/* Editable Area */}
      <div
        ref={editorRef}
        contentEditable
        onBlur={handleInput}
        className="min-h-[120px] bg-slate-950 border border-slate-700 p-2 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </div>
  );
}
