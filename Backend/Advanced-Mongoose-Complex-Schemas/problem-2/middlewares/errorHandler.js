const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation Error",
      details: err.errors,
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({ error: "Duplicate Email Not Allowed" });
  }

  res.status(500).json({ error: err.message });
};

module.exports = errorHandler;
