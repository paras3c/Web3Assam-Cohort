const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = function validateUser(req, res, next) {
  const { name, email } = req.body ?? {};

  
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({ error: "Name is required and must be a non-empty string." });
  }

  if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
    return res.status(400).json({ error: "A valid email is required." });
  }
  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();

  next();
};
