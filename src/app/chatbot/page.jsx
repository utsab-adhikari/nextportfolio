"use client";

import React, { useEffect, useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark";
import { IoSend, IoInformationCircleOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    setChatHistory([
      {
        sender: "agent",
        text: "Hello! I'm UtsabBot, your virtual assistant. Ask me anything about Utsab, and I'll do my best to provide information.",
      },
    ]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message.trim();
    setChatHistory((prev) => [...prev, { sender: "user", text: userMessage }]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/v1/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setChatHistory((prev) => [
        ...prev,
        { sender: "agent", text: data.message },
      ]);
    } catch (err) {
      console.error("Chatbot API error:", err);
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "agent",
          text: "⚠️ Error: Unable to fetch response. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, loading]);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const renderAgentMessage = (text) => {
    const parts = text.split(/```/g);
    return parts.map((part, i) => {
      const isCode = i % 2 !== 0;
      return isCode ? (
        <div key={i} className="relative my-2 rounded-md overflow-hidden">
          <SyntaxHighlighter
            language="javascript"
            style={oneDark}
            customStyle={{
              padding: "1rem",
              borderRadius: "0.5rem",
              background: "#1e1e1e",
              fontSize: "0.875rem",
            }}
          >
            {part.trim()}
          </SyntaxHighlighter>
          <button
            onClick={() => copyToClipboard(part.trim())}
            className="absolute top-2 right-2 px-2 py-1 text-xs bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors duration-200"
          >
            Copy
          </button>
        </div>
      ) : (
        <div
          key={i}
          className="text-gray-200 whitespace-pre-line text-sm leading-relaxed"
        >
          <p>
            {part.split(/(https?:\/\/[^\s)]+[^.,;:)\s])/g).map((chunk, index) =>
              /^https?:\/\//.test(chunk) ? (
                <a
                  key={index}
                  href={chunk}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline hover:text-blue-300 transition"
                >
                  {getFriendlyLinkName(chunk)}
                </a>
              ) : (
                <span key={index}>{chunk}</span>
              )
            )}
          </p>

          {part.trim() && (
            <button
              onClick={() => copyToClipboard(part.trim())}
              className="mt-2 text-xs text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center gap-1"
              title="Copy text"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
              Copy Text
            </button>
          )}
        </div>
      );
    });
  };

  const getFriendlyLinkName = (url) => {
    try {
      const u = new URL(url);
      if (u.hostname.includes("blog-utsab")) return "📝 BloggApp by Utsab";
      if (u.hostname.includes("project-manager-by-utsab"))
        return "📋 Project Manager Tool";
      if (u.hostname.includes("github.com")) return "GitHub - utsab-adhikari";
      return u.hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white font-sans antialiased">
      <div className=" fixed top-2 right-2 shadow-md">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-green-400 transition-colors duration-200"
              title="About UtsabBot"
            >
              <IoInformationCircleOutline className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white border-gray-700 rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-green-400 text-lg">
                About Assistant
              </DialogTitle>
              <DialogDescription className="text-gray-300 text-sm">
                This virtual assistant provides information about Utsab. Built
                using React, Next.js, and a custom backend.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 text-gray-400 text-xs">
              <p>Developed for portfolio demonstration.</p>
              <p>&copy; {new Date().getFullYear()} Utsab</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`flex ${
              chat.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[95%] px-5 py-3 rounded-2xl shadow-lg border ${
                chat.sender === "user"
                  ? "bg-green-700 text-white border-green-600"
                  : "bg-gray-850 text-gray-100 border-gray-700"
              } transition-all duration-300 ease-in-out transform hover:scale-[1.01]`}
            >
              <p className="text-xs mb-1 font-semibold text-gray-300">
                {chat.sender === "user" ? "You" : "UtsabBot"}
              </p>
              {chat.sender === "agent" ? (
                <div className="space-y-2">{renderAgentMessage(chat.text)}</div>
              ) : (
                <p className="text-sm leading-relaxed">{chat.text}</p>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[75%] px-5 py-3 rounded-2xl bg-gray-850 text-gray-300 animate-pulse shadow-lg border border-gray-700">
              <p className="text-xs text-gray-400 font-semibold mb-1">
                Assistant
              </p>
              <p>
                Typing<span className="dot-animation">.</span>
                <span className="dot-animation delay-1">.</span>
                <span className="dot-animation delay-2">.</span>
              </p>
            </div>
          </div>
        )}

        <div ref={chatEndRef}></div>
      </div>

      <div className="w-full mx-center">
        <div className="fixed bottom-5 left-0 w-full px-4 z-50">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 sm:gap-3 bg-gray-900 border border-gray-700 shadow-lg rounded-full px-4 py-2 sm:px-6 sm:py-3 max-w-3xl mx-auto"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask me anything about Utsab..."
              className="flex-1 bg-transparent text-white placeholder-gray-400 text-sm sm:text-base outline-none"
              disabled={loading}
            />
            <Button
              type="submit"
              disabled={loading || !message.trim()}
              className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm font-semibold transition disabled:bg-gray-700 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Send <IoSend className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #4a4a4a;
          border-radius: 4px;
          border: 2px solid #1a1a1a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #6b6b6b;
        }
        .dot-animation {
          animation: blink 1s infinite;
        }
        .dot-animation.delay-1 {
          animation-delay: 0.2s;
        }
        .dot-animation.delay-2 {
          animation-delay: 0.4s;
        }
        @keyframes blink {
          0% {
            opacity: 0.2;
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
