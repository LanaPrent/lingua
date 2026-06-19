const express = require("express");
const router = express.Router();

const csrfProtection = require("../middleware/csrf");

const badWordFilter = require("../middleware/badWordFilter");

const {
    submitContactForm
} = require("../controllers/contactController");

const honeypotGuard = require("../middleware/honeypotGuard");


router.post(
    "/submit",
    csrfProtection,
    honeypotGuard,
    badWordFilter,
    submitContactForm
);


module.exports = router;

