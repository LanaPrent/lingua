
function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    }

    return res.status(401).json({
        message: "Unauthorized"
    });
}

module.exports = isAuthenticated;

  console.log("AUTH HEADER:", req.headers.authorization);

