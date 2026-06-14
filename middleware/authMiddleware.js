
function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    }

    return res.status(401).json({
        message: "Unauthorized"
    });
     console.log("AUTH HEADER:", req.headers.authorization);
}

module.exports = isAuthenticated;

 

