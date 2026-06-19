
const blockedIPs=[
   // add IPs here 
// "123.123.123.123",
];

function adminBlockIP(req, res, next) {
const ip = req.headers["x-forwarded-for"]?.split(",")[0] ||
req.socket?.remoteAddress;
  
  if (blockedIPs.includes(ip)){
    return res.status(403).send("Access denied");
  }
  next();
  };
module.exports= adminBlockIP;
