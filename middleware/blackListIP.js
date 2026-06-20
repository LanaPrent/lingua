const blockedIPs = [ 
   // add IPs here 

  // "123.123.123.123"
];

function adminBlockIP(req, res, next) {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded
    ? forwarded.split(",")[0].trim()
    : req.socket?.remoteAddress;

  if (blockedIPs.includes(ip)) {
    return res.status(403).json({ message: "Access denied" });
  }

  next();
}

module.exports = adminBlockIP;


