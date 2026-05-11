import express from 'express';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from "./routes/postRoutes.js";
import uploadRoutes from "./routes/upload.js";
import errorHandler from './middlewares/errorMiddleware.js';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// ⚠️ IMPORTANT: pass dummy io when testing
app.use("/api/posts", postRoutes(null));

app.use("/api/upload", uploadRoutes);

// Root
app.get('/', (req, res) => {
  res.send("🔥 ROOT WORKING");
});

// Health
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Server is running!',
    timestamp: new Date(),
    database: 'Connected'
  });
});

// Error handler LAST
app.use(errorHandler);

export default app;