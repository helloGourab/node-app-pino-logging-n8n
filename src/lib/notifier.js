import axios from 'axios';
import { logger } from '../config/logger.js';

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;
const N8N_API_KEY = process.env.X_N8N_API_KEY || '';

export const notifyN8N = (err, req) => {
    if (!N8N_WEBHOOK_URL) return;

    // Fire and forget: No 'await' here.
    // We use a self-contained promise chain so it doesn't hang the request.
    axios.post(N8N_WEBHOOK_URL, {
        event: "SERVER_ERROR_500",
        service: "ai-heal-backend",
        message: err.message,
        requestId: req.id,
        traceId: req.traceId,
        path: req.originalUrl,
        method: req.method,
        timestamp: new Date().toISOString()
    }, {
        headers: { 'X-N8N-API-KEY': N8N_API_KEY },
        timeout: 2000 // Don't let a slow n8n hang your socket
    }).catch(e => {
        // Log it locally, but don't rethrow
        logger.error({ msg: "N8N_NOTIFY_FAILED", error: e.message });
    });
};