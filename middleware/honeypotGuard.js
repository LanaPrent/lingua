function honeypotGuard(req, res, next) {
  const body = req.body || {};
  const { website, formStartTime } = body;

// 1. Honeypot field check

  if (website && website.length > 0) {
    return res.status(400).send("Bot detected");
  }
// 2. Time check (minimum 2 seconds)


  if (formStartTime) {
    const duration = Date.now() - Number(formStartTime);

    if (duration < 2000) {
      return res.status(400).send("Suspicious fast submission");
    }
  }

  next();
}


module.exports = honeypotGuard;
