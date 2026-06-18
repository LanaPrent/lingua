// routes/adminRoutes.js in order to enable sending csv by email
const express = require("express");
const router = express.Router();


const { getAllMessages, exportMessagesCSV } = require("../controllers/adminController");
const { generateAndSendCsv } = require("../services/csvEmailService");
/* ===========================
   NEW: import adminBasicAuth, for restricting access to admin/messages
   =========================== */
//const { adminBasicAuth } = require("../middleware/adminAuth");
const adminBasicAuth = require("../middleware/adminAuth");

//import adminBlockIP from middleware/userIPBlock.js to block IP
const adminBlockIP = require("../middleware/adminBlockIP");

/**
 * 1. Admin page - show all messages,
 * For restriction of access to admin/messages added adminBasicAuth,  block IP addressin line below
 */
router.get("/admin/messages", adminBlockIP, adminBasicAuth,getAllMessages);

/**
 * 2. Download CSV via browser
 */
router.get("/admin/messages/export", exportMessagesCSV);

/**
 * 3. Send CSV via email
 */
router.get("/admin/messages/email", async (req, res) => {
  try {
    // Fetch all messages from DB
    const conn = require("../config/db");
    conn.query("SELECT * FROM users ORDER BY created_at DESC", async (err, results) => {
      if (err) {
        console.error("DB ERROR:", err);
        return res.status(500).send("Database error");
      }

      // Prepare CSV rows (array of objects)
      const rows = results.map((row) => ({
        ID: row.id,
        Name: row.name,
        Email: row.email,
        Comments: row.comments,
        Created: row.created_at,
      }));

      // Send CSV email
      await generateAndSendCsv(process.env.OWNER_EMAIL || process.env.SMTP_USER, rows, "contact_messages.csv");

      res.send("CSV sent to email successfully.");
    });
  } catch (err) {
    console.error("EMAIL CSV ERROR:", err);
    res.status(500).send("Error sending CSV by email");
  }
});


module.exports = router;

 