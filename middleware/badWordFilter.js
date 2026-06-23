const badWords = [
  "spam",
  "scam",
  "hack",
  "bitcoin",
  "viagra",
  "casino"
];

function badWordFilter(req, res, next) {
  try {
    const raw = req.body || {};

    // Convert everything to safe string
    const text = JSON.stringify(raw).toLowerCase();

    const found = badWords.some(word => text.includes(word));

    if (found) {
      return res.status(400).json({
        success: false,
        message: "Inappropriate content has been detected, your message is not acceptable."
      });
    }

    next();
  } catch (err) {
    console.error("badWordFilter error:", err);
    next(); // never break request flow
  }
}

module.exports = badWordFilter;


