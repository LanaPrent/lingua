function adminBasicAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic")) {
    res.setHeader("WWW-Authenticate", "Basic realm=Admin Area");
    return res.status(401).send("Admin login required");
  }

  const base64 = authHeader.split(" ")[1];
  const decoded = Buffer.from(base64, "base64").toString("utf-8");

  const [username, password] = decoded.split(":");

  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return next();
  }

  res.setHeader("WWW-Authenticate", "Basic realm=Admin Area");
  return res.status(401).send("Wrong credentials");

  console.log("ENV USER:", process.env.ADMIN_USER);
  console.log("ENV PASS:", process.env.ADMIN_PASSWORD);
  console.log("AUTH HEADER:",req.headers.authorization);
  console.log("ENV:", process.env.ADMIN_USER, process.env.ADMIN_PASSWORD);

}

module.exports= adminBasicAuth;
