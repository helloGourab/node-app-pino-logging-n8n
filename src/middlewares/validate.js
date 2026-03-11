export const validate = (schema) => (req, res, next) => {
    // 1. Run the validation against the body
    const result = schema.safeParse(req.body);

    // 2. If it fails, log it and kill the request
    if (!result.success) {
        req.log.warn({
            msg: "VALIDATION_FAILED",
            errors: result.error.format(), // Cleanly formatted error object
            input: req.body
        });

        return res.status(400).json({
            status: "error",
            message: "Invalid request data",
            details: result.error.errors
        });
    }

    // 3. If it passes, overwrite req.body with the cleaned data and move on
    req.body = result.data;
    next();
};