const badWords = [
  "spam",
  "scam",
  "hack",
  "bitcoin",
  "viagra",
  "casino"
];

const badWords = [
  "spam",
  "scam",
  "hack",
  "bitcoin",
  "viagra",
  "casino"
];

function badWordFilter(req, res, next) {
  const text = JSON.stringify(req.body || {}).toLowerCase();

  const found = badWords.some(word => text.includes(word));

  if (found) {
    return res.status(400).json({
      success: false,
      message: "Inappropriate content detected"
    });
  }

  next();
}

module.exports = badWordFilter;

