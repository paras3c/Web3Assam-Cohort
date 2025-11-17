module.exports = function errorHandler(err, req, res, next) {
  console.error(" Error:", err.stack || err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    error: "Internal Server Error",
    message: err.message || "Something went wrong."
  });
};
