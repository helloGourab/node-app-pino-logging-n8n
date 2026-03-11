import express from 'express';
import cors from 'cors';
import connectDB from './lib/mongodb.js';
import userRoute from './routes/user.route.js';
import githubRoute from './routes/github.route.js';
import { pinoMiddleware, logger, cleanStack } from './config/logger.js';
import { notifyN8N } from './lib/notifier.js';

const app = express();

// Initialize Singleton Connection
connectDB();

app.use(pinoMiddleware);
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoute);
app.use('/api/github', githubRoute);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// GLOBAL ERROR HANDLER
app.use(async (err, req, res, next) => {
    // Reverted back to explicit flat strings. No more `err: err` object serialization.
    req.log.error({
        msg: "CRITICAL_SYSTEM_ERROR",
        errorMessage: err.message,
        errorStack: cleanStack(err.stack),
        requestId: req.id,
        traceId: req.traceId
    });

    notifyN8N(err, req);

    res.status(500).json({
        status: "error",
        message: "Internal Server Error",
        requestId: req.id,
        traceId: req.traceId
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    logger.info(`🚀 Server running on http://localhost:${PORT}`);
});