
function isAuthenticated(req, res, next) {
   console.log("AUTH HEADER:", req.headers.authorization);
    if (req.session.userId) {
        return next();
    }

    return res.status(401).json({
        message: "Unauthorized"
    });
}

module.exports = isAuthenticated;

 

