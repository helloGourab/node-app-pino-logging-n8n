import pino from 'pino';
import pinoHttp from 'pino-http';
import { v4 as uuidv4 } from 'uuid';

const basePath = process.cwd();

export const cleanStack = (stack) => {
    if (!stack) return "";

    // Replaces absolute paths (and file:// prefixes) with a simple '.'
    const pathRegex = new RegExp(`(file://)?${basePath}`, 'g');
    return stack.replace(pathRegex, '.');
};

export const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
});

export const pinoMiddleware = pinoHttp({
    logger,
    redact: ['req.headers.cookie', 'req.headers.authorization'],
    genReqId: (req) => req.headers['x-request-id'] || uuidv4(),
    customProps: (req) => {
        if (!req.traceId) {
            req.traceId = uuidv4();
        }
        return { traceId: req.traceId };
    },
    customLogLevel: (req, res, err) => {
        if (res.statusCode >= 500 || err) return 'error';
        if (res.statusCode >= 400) return 'warn';
        return 'info';
    }
});