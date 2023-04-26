const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (req, res, next) => {
    try {
        let decodedToken = jwt.verify(req.body.jwt, config.server.key);
        let username = decodedToken.username;
        req.auth = {
            username: username,
        };

        next();
    } catch (error) {
        if (error.name == "TokenExpiredError") {
            res.status(403).json({ message: "Token is too old" });
        }
        res.status(403).json({ message: "Token is invalid" });
    }
};
