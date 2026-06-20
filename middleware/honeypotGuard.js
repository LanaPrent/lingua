function honeypotGuard(req, res, next) {
  const { website, formStartTime } = req.body || {};  

  // 1. Honeypot field check
  if (website && website.trim().length > 0) {
    return res.status(400).json({ message: "Bot detected" });
  }

  // 2. Timing check
  if (formStartTime) {
    const duration = Date.now() - Number(formStartTime);

    // allow missing or invalid values instead of breaking flow
    if (!isNaN(duration) && duration < 2000) {
      return res.status(400).json({ message: "Suspicious fast submission" });
    }
  }

  next();
}

module.exports = honeypotGuard;
