// services/csvEmailService.js   - version 3
/**
 * Generate CSV from data and send via email.
 * This file uses emailService.js for sending.
 */

const { stringify } = require("csv-stringify/sync");
const { sendCsvEmail } = require("./emailService");

/**
 * Generate CSV from rows (array of objects) and send by email.
 *
 * @param {string} recipientEmail - who will receive the CSV
 * @param {Array} rows - array of objects
 * @param {string} filename - CSV filename
 */
async function generateAndSendCsv(recipientEmail, rows, filename = "report.csv") {
  // 1️⃣ Generate CSV string
   const csv = stringify(rows, { header: true });

  // 2️⃣ Send via email
  await sendCsvEmail(recipientEmail, csv, filename);

  console.log(`CSV sent to ${recipientEmail} successfully!`);
}

module.exports = { generateAndSendCsv };
