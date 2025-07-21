const express = require("express");
const next = require("next");
const http = require("http");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3001;

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = new Server(httpServer, {
    cors: {
      origin: "*", // Allow all origins (only for dev)
      methods: ["GET", "POST"],
    },
  });

  // Connected users map (socket.id -> { id, name })
  const users = new Map();

  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    socket.on("login", (user) => {
      users.set(socket.id, { id: user.id, name: user.name });
      console.log(`🟢 ${user.name} (${user.id}) logged in`);
      io.emit("users", Array.from(users.values()));
    });

    socket.on("chat-message", (msg) => {
      io.emit("chat-message", msg);
    });

    socket.on("call-user", (data) => {
      io.to(data.to).emit("call-made", {
        signal: data.signal,
        from: socket.id,
        name: data.name,
      });
    });

    socket.on("make-answer", (data) => {
      io.to(data.to).emit("answer-made", {
        signal: data.signal,
        from: socket.id,
      });
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
      users.delete(socket.id);
      io.emit("users", Array.from(users.values()));
    });
  });

  // Let Next.js handle everything else (API + app routes)
  server.use((req, res) => handle(req, res));

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
