function adminBasicAuth(req, res, next) {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    res.setHeader("WWW-Authenticate", "Basic realm=Admin Area");
    return res.status(401).send("Admin login required");
  }

  const base64 = authHeader.split(" ")[1];
  const decoded = Buffer.from(base64, "base64").toString("utf-8");
  //added these three lines to avoid crashes:
const parts = decoded.split(":");
const username = parts[0];
const password = parts[1];

  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return next();
  }

  res.setHeader("WWW-Authenticate", "Basic realm=Admin Area");
  return res.status(401).send("Wrong credentials");
}

module.exports= adminBasicAuth;
