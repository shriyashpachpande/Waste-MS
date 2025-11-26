const rateLimit = require('express-rate-limit');
module.exports = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 8,
  message: "Too many requests, try again later.",
});
