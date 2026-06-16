function adminBasicAuth(req, res, next) {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    res.setHeader("WWW-Authenticate", "Basic realm=Admin Area");
    return res.status(401).send("Admin login required");
  }

  const base64 = authHeader.split(" ")[1];
  const decoded = Buffer.from(base64, "base64").toString("utf-8");

  const [username, password] = decoded.split(":");
 /*    
//5 lines added:
  console.log("Received username:", username);
console.log("Received password:", password);
console.log("Expected username:", process.env.ADMIN_USER);
console.log("Expected password:", process.env.ADMIN_PASSWORD);
*/

  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return next();
  }
  /*
//3 lines added:
  console.log("AUTH FAILED");
  console.log("Decoded username:", username);
  console.log("Expected username:", process.env.ADMIN_USER);
 
  console.log("ENV PASS:", process.env.ADMIN_PASSWORD);
  console.log("AUTH HEADER:",req.headers.authorization);
  console.log("ENV:", process.env.ADMIN_USER, process.env.ADMIN_PASSWORD);
*/
  res.setHeader("WWW-Authenticate", "Basic realm=Admin Area");
  return res.status(401).send("Wrong credentials");
}

module.exports= adminBasicAuth;
