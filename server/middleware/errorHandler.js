/**
 * Centralised error-handling middleware.
 * Must be the last middleware registered.
 */
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  // Log the full error server-side
  console.error(`[error] ${err.message}`);

  // Never expose internal details or stack traces to clients
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500
        ? "An unexpected error occurred. Please try again later."
        : err.message,
  });
}

