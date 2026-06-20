const express = require("express");
const router = express.Router();

const csrfProtection = require("../middleware/csrf");

// Middleware (all safely imported)
const honeypotGuard = require("../middleware/honeypotGuard");
const badWordFilter = require("../middleware/badWordFilter");
const adminBlockIP = require("../middleware/blackListIP");

// Controller
const { submitContactForm } = require("../controllers/contactController");

/**
 * CONTACT FORM ROUTE
 * Order matters:
 * 1. IP block (fast reject)
 * 2. CSRF validation
 * 3. honeypot check
 * 4. content filter
 * 5. actual controller
 */

router.post(
  "/submit",
  adminBlockIP,
  csrfProtection,
  honeypotGuard,
  badWordFilter,
  submitContactForm
);

module.exports = router;

