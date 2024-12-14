export function errorHandler(err, req, res, next) {
  console.error('Error:', {
    name: err.name,
    message: err.message,
    stack: err.stack,
  });

  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
  });
}