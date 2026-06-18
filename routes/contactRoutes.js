const express = require("express");
const router = express.Router();

const csrfProtection = require("../middleware/csrf");

const badWordFilter = require("../middleware/badWordFilter");

const {
    submitContactForm
} = require("../controllers/contactController");

router.post(
    "/submit",
    csrfProtection,
    badWordFilter,
    submitContactForm
);

module.exports = router;

