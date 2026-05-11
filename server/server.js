import dotenv from 'dotenv';
import connectDB from './config/database.js';
import app from './app.js';

import { createServer } from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

// Load env
dotenv.config();

// Connect DB
connectDB();

// Create HTTP server
const httpServer = createServer(app);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200
}));
// Socket.io setup
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  },
});

// Auth middleware for sockets
io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error("Authentication error: No token"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.data.user = decoded;
    next();
  } catch (err) {
    next(new Error("Authentication error: Invalid token"));
  }
});

// Connection
io.on("connection", (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  socket.on("disconnect", (reason) => {
    console.log(`❌ User disconnected: ${socket.id} (${reason})`);
  });
});

// Export app for testing
export default app;

// Start server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}
// ⚠️ IMPORTANT: inject io into posts route
import postRoutes from "./routes/postRoutes.js";
app.use("/api/posts", postRoutes(io));

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🔌 Socket.io ready`);
});
