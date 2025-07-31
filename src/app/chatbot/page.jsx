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
        text: "Hello! I'm UtsabBot, your AI assistant. I can help you with information about Utsab, his projects, and skills. What would you like to know?",
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
        <div key={i} className="relative my-2 rounded-lg overflow-hidden code-block">
          <SyntaxHighlighter
            language="javascript"
            style={oneDark}
            customStyle={{
              padding: "0.75rem",
              borderRadius: "0.5rem",
              background: "#1f2937",
              fontSize: "0.75rem",
            }}
          >
            {part.trim()}
          </SyntaxHighlighter>
          <button
            onClick={() => copyToClipboard(part.trim())}
            className="copy-btn absolute top-2 right-2 px-2 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-600 transition-opacity duration-200 opacity-0"
          >
            <i className="fas fa-copy mr-1"></i>Copy
          </button>
        </div>
      ) : (
        <div
          key={i}
          className="text-gray-100 whitespace-pre-line text-sm leading-relaxed"
        >
          <p>
            {part.split(/(https?:\/\/[^\s)]+[^.,;:)\s])/g).map((chunk, index) =>
              /^https?:\/\//.test(chunk) ? (
                <a
                  key={index}
                  href={chunk}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
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
    <div className="flex flex-col min-h-screen max-w-full mx-auto bg-slate-950 text-gray-100 font-sans antialiased">
      {/* Header */}
      <header className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 p-3 sm:p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
            <i className="fas fa-robot text-white text-sm sm:text-base"></i>
          </div>
          <div>
            <h1 className="font-bold text-base sm:text-lg">UtsabBot</h1>
            <p className="text-xs text-gray-400 hidden sm:block">AI Assistant</p>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-green-400 transition-colors p-2 rounded-full"
              title="About UtsabBot"
            >
              <IoInformationCircleOutline className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[90vw] max-w-md bg-gray-800 text-gray-300 border border-gray-700 rounded-xl p-4 sm:p-6">
            <DialogHeader>
              <div className="flex justify-between items-center">
                <DialogTitle className="text-lg sm:text-xl font-bold text-green-400">
                  About UtsabBot
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white"
                  onClick={() => document.getElementById("close-modal")?.click()}
                >
                  <i className="fas fa-times text-sm sm:text-base"></i>
                </Button>
              </div>
              <DialogDescription className="text-xs sm:text-sm text-gray-300">
                This AI assistant is designed to provide information about Utsab, including his skills, projects, and professional background.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 text-xs sm:text-sm text-gray-300">
              <div className="bg-gray-900 rounded-lg p-3 sm:p-4">
                <h3 className="font-medium text-green-400 mb-2">Capabilities</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Answer questions about Utsab's experience</li>
                  <li>Explain technical concepts</li>
                  <li>Provide code examples</li>
                  <li>Share project details</li>
                </ul>
              </div>
              <div className="pt-2 text-xs text-gray-500">
                <p>Version 1.0.0</p>
                <p>&copy; {new Date().getFullYear()} Utsab. All rights reserved.</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-3 sm:space-y-4 chat-container">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`flex ${
              chat.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[90%] xs:max-w-[85%] sm:max-w-[75%] px-3 sm:px-4 py-2 sm:py-3 rounded-xl ${
                chat.sender === "user"
                  ? "bg-gradient-to-r from-green-600 to-green-700 text-white"
                  : "bg-gray-800 border border-gray-700"
              } message-transition`}
            >
              <div
                className={`flex items-center space-x-2 mb-1 ${
                  chat.sender === "user" ? "justify-end" : ""
                }`}
              >
                {chat.sender === "user" ? (
                  <>
                    <span className="text-xs font-medium text-green-100">You</span>
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <i className="fas fa-user text-xs"></i>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
                      <i className="fas fa-robot text-xs text-white"></i>
                    </div>
                    <span className="text-xs font-medium text-gray-300">UtsabBot</span>
                  </>
                )}
              </div>
              {chat.sender === "agent" ? (
                <div className="space-y-2 max-w-[96%]">{renderAgentMessage(chat.text)}</div>
              ) : (
                <p className="text-xs sm:text-sm leading-relaxed">{chat.text}</p>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[90%] xs:max-w-[85%] sm:max-w-[75%] px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-gray-800 border border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
                  <i className="fas fa-robot text-xs text-white"></i>
                </div>
                <div className="typing-indicator text-xs sm:text-sm text-gray-400">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef}></div>
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700 p-3 sm:p-4">
        <form
          onSubmit={handleSubmit}
          className="flex items-center space-x-2 max-w-full sm:max-w-3xl mx-auto"
        >
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask me anything about Utsab..."
              className="w-full bg-gray-800 border border-gray-700 rounded-full py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={loading}
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => setMessage("")}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 ${
                message.trim() ? "" : "hidden"
              }`}
            >
              <i className="fas fa-times text-sm"></i>
            </button>
          </div>
          <Button
            type="submit"
            disabled={loading || !message.trim()}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IoSend className="h-4 w-4" />
          </Button>
        </form>
        <div className="text-xs text-gray-500 mt-2 text-center">
          UtsabBot may produce inaccurate information.
        </div>
      </div>

      <style jsx>{`
        .chat-container {
          scrollbar-width: thin;
          scrollbar-color: #4b5563 #1f2937;
        }
        .chat-container::-webkit-scrollbar {
          width: 6px;
        }
        .chat-container::-webkit-scrollbar-track {
          background: #1f2937;
        }
        .chat-container::-webkit-scrollbar-thumb {
          background-color: #4b5563;
          border-radius: 6px;
        }
        .message-transition {
          transition: all 0.3s ease-out;
        }
        .code-block:hover .copy-btn {
          opacity: 1;
        }
        .copy-btn {
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .typing-indicator span {
          animation: blink 1.4s infinite both;
        }
        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-indicator span:nth-child(3) {
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