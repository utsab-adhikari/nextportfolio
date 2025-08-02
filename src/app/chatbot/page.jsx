"use client";

import React, { useEffect, useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark";
import { 
  IoSend, 
  IoInformationCircleOutline, 
  IoClose,
  IoCopyOutline,
  IoRefresh
} from "react-icons/io5";
import { 
  FaRobot, 
  FaUserAlt, 
  FaGoogle,
  FaTimes
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-hot-toast";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Example starter questions
  const starterQuestions = [
    "Tell me about Utsab's technical skills",
    "What projects has Utsab worked on?",
    "How can I contact Utsab?",
    "What is Utsab's experience with React?"
  ];

  useEffect(() => {
    setChatHistory([
      {
        id: Date.now(),
        sender: "agent",
        text: "Hello! I'm UtsabBot, your AI assistant. I can help you with information about Utsab, his projects, and skills. What would you like to know?",
        timestamp: new Date().toISOString()
      },
    ]);
  }, []);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    const handleScroll = () => {
      const isAtBottom = 
        chatContainer.scrollHeight - chatContainer.scrollTop <= 
        chatContainer.clientHeight + 100;
      
      setIsScrolledUp(!isAtBottom);
    };

    chatContainer.addEventListener("scroll", handleScroll);
    return () => chatContainer.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBottom = () => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    const userMessage = message.trim();
    const userMessageId = Date.now();
    
    // Add user message to chat history
    setChatHistory(prev => [
      ...prev, 
      { 
        id: userMessageId,
        sender: "user", 
        text: userMessage,
        timestamp: new Date().toISOString()
      }
    ]);
    
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
      setChatHistory(prev => [
        ...prev,
        { 
          id: Date.now(),
          sender: "agent", 
          text: data.message,
          timestamp: new Date().toISOString()
        }
      ]);
    } catch (err) {
      console.error("Chatbot API error:", err);
      setChatHistory(prev => [
        ...prev,
        {
          id: Date.now(),
          sender: "agent",
          text: "⚠️ I'm having trouble connecting right now. Please try again later.",
          timestamp: new Date().toISOString()
        }
      ]);
      toast.error("Failed to get response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy text");
      console.error("Failed to copy:", err);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderAgentMessage = (text) => {
    const parts = text.split(/```/g);
    return parts.map((part, i) => {
      const isCode = i % 2 !== 0;
      return isCode ? (
        <div key={i} className="relative my-3 rounded-lg overflow-hidden code-block group">
          <SyntaxHighlighter
            language="javascript"
            style={oneDark}
            customStyle={{
              padding: "0.75rem",
              borderRadius: "0.5rem",
              background: "#1f2937",
              fontSize: "0.85rem",
            }}
          >
            {part.trim()}
          </SyntaxHighlighter>
          <button
            onClick={() => copyToClipboard(part.trim())}
            className="absolute top-2 right-2 px-2 py-1.5 text-xs bg-slate-800/80 text-slate-200 rounded-lg hover:bg-slate-700 transition-all duration-200 flex items-center gap-1 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
          >
            <IoCopyOutline className="text-sm" />
            Copy
          </button>
        </div>
      ) : (
        <div
          key={i}
          className="text-slate-200 whitespace-pre-line text-sm leading-relaxed"
        >
          <p>
            {part.split(/(https?:\/\/[^\s)]+[^.,;:)\s])/g).map((chunk, index) =>
              /^https?:\/\//.test(chunk) ? (
                <a
                  key={index}
                  href={chunk}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline transition-colors"
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
              className="mt-2 text-xs text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center gap-1 group"
              title="Copy text"
            >
              <IoCopyOutline className="text-sm opacity-70 group-hover:opacity-100" />
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

  const handleNewChat = () => {
    setChatHistory([
      {
        id: Date.now(),
        sender: "agent",
        text: "Hello again! What would you like to know about Utsab?",
        timestamp: new Date().toISOString()
      },
    ]);
  };

  const handleStarterQuestion = (question) => {
    setMessage(question);
    setTimeout(() => {
      document.querySelector("form")?.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }, 100);
  };

  return (
    <div className="flex flex-col min-h-screen max-w-full mx-auto bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Header */}
      <header className="bg-slate-900/90 backdrop-blur-sm border-b border-slate-800 p-3 sm:p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center">
            <FaRobot className="text-white text-base" />
          </div>
          <div>
            <h1 className="font-bold text-base sm:text-lg">UtsabBot</h1>
            <p className="text-xs text-slate-400">AI Assistant</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            onClick={handleNewChat}
            variant="outline"
            size="sm"
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700 text-xs h-8"
          >
            <IoRefresh className="mr-1 text-sm" />
            New Chat
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-cyan-400 transition-colors p-1.5 rounded-full"
                title="About UtsabBot"
              >
                <IoInformationCircleOutline className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md bg-slate-900 text-slate-300 border border-slate-700 rounded-xl p-5">
              <DialogHeader>
                <DialogTitle className="text-lg font-bold text-cyan-400">
                  About UtsabBot
                </DialogTitle>
                <DialogDescription className="text-sm text-slate-400 mt-1">
                  Your AI assistant for information about Utsab Adhikari
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h3 className="font-medium text-cyan-400 mb-2">Capabilities</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Answer questions about Utsab's experience</li>
                    <li>Explain technical concepts</li>
                    <li>Provide code examples</li>
                    <li>Share project details</li>
                    <li>Discuss professional background</li>
                  </ul>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h3 className="font-medium text-cyan-400 mb-2">Limitations</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>May occasionally generate incorrect information</li>
                    <li>Knowledge cutoff: June 2024</li>
                    <li>Cannot browse the internet in real-time</li>
                  </ul>
                </div>
                
                <div className="pt-2 text-xs text-slate-500 text-center">
                  <p>Version 1.1.0 • Powered by GPT-4</p>
                  <p className="mt-1">&copy; {new Date().getFullYear()} Utsab Adhikari</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Chat Container */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 chat-container"
      >
        {chatHistory.length <= 1 && (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6 mt-4">
              <h2 className="text-xl font-bold text-slate-200 mb-2">Welcome to UtsabBot</h2>
              <p className="text-slate-400 max-w-lg mx-auto">
                Ask me anything about Utsab's skills, projects, and experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {starterQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleStarterQuestion(question)}
                  className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-left text-slate-300 transition-all hover:border-cyan-500/30"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {chatHistory.map((chat) => (
          <div
            key={chat.id}
            className={`flex ${chat.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[90%] xs:max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-xl ${
                chat.sender === "user"
                  ? "bg-gradient-to-r from-blue-700 to-indigo-700 text-white"
                  : "bg-slate-800 border border-slate-700"
              } transition-all duration-300`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  {chat.sender === "user" ? (
                    <>
                      <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center">
                        <FaUserAlt className="text-xs text-white" />
                      </div>
                      <span className="text-xs font-medium text-slate-200">You</span>
                    </>
                  ) : (
                    <>
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center">
                        <FaRobot className="text-xs text-white" />
                      </div>
                      <span className="text-xs font-medium text-slate-200">UtsabBot</span>
                    </>
                  )}
                </div>
                <span className="text-xs text-slate-500">
                  {formatTime(chat.timestamp)}
                </span>
              </div>
              
              {chat.sender === "agent" ? (
                <div className="space-y-2 max-w-[96%]">
                  {renderAgentMessage(chat.text)}
                </div>
              ) : (
                <p className="text-sm leading-relaxed">{chat.text}</p>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[90%] xs:max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-xl bg-slate-800 border border-slate-700">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center">
                  <FaRobot className="text-xs text-white" />
                </div>
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef}></div>
      </div>

      {/* Scroll to bottom button */}
      {isScrolledUp && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-20 right-4 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 transition-all shadow-lg"
          aria-label="Scroll to bottom"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}

      {/* Input Area */}
      <div className="sticky bottom-0 bg-slate-900/80 backdrop-blur-sm border-t border-slate-800 p-4">
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto space-y-3"
        >
          <div className="relative">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask me anything about Utsab..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-sm min-h-[56px] max-h-32 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
              disabled={loading}
              autoComplete="off"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              rows={1}
            />
            
            {message.trim() && (
              <button
                type="button"
                onClick={() => setMessage("")}
                className="absolute right-14 top-4 text-slate-500 hover:text-slate-300"
              >
                <FaTimes />
              </button>
            )}
            
            <Button
              type="submit"
              disabled={loading || !message.trim()}
              className="absolute right-3 top-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg w-9 h-9 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              size="icon"
            >
              <IoSend className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-xs text-slate-500 text-center">
            UtsabBot may produce inaccurate information about people, places, or facts.
          </div>
        </form>
      </div>

      <style jsx>{`
        .chat-container {
          scrollbar-width: thin;
          scrollbar-color: #475569 #0f172a;
        }
        .chat-container::-webkit-scrollbar {
          width: 8px;
        }
        .chat-container::-webkit-scrollbar-track {
          background: #0f172a;
        }
        .chat-container::-webkit-scrollbar-thumb {
          background-color: #475569;
          border-radius: 8px;
          border: 2px solid #0f172a;
        }
        .code-block:hover .copy-btn {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;