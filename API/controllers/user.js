const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uuidv1 = require("uuid").v1;
const config = require("../config");

const { errorHandler } = require("./utils");
const { sendMail } = require("./mail");
const User = require("../models/user");
const Token = require("../models/token");

exports.signup = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                username: req.body.username,
                password: hash,
                creditCard: null,
            });

            user.save()
                .then(() => {
                    res.status(201).json({
                        message: "User saved successfully!",
                        user: user,
                    });
                })
                .catch((error) => {
                    errorHandler(error, res);
                });
        })
        .catch((error) => {
            errorHandler(error, res);
        });
};

exports.login = (req, res, next) => {
    if (req.body.username && req.body.password) {
        User.findOne({ username: req.body.username })
            .then((user) => {
                if (!user) {
                    return res.status(401).json({ error: "Utilisateur non trouvé !" });
                }
                bcrypt.compare(req.body.password, user.password).then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ error: "Mot de passe incorrect !" });
                    }
                    token = jwt.sign({ username: req.body.username }, config.server.key, { expiresIn: "24h" });
                    // res.cookie("AUTH_COOKIE", token);
                    res.status(200).json({ token: token });
                });
            })
            .catch((error) => {
                errorHandler(error, res);
            });
    } else {
        res.status(401).json({ error: "Merci de remplir tous les champs" });
    }
};

exports.logout = (req, res, next) => {
    // res.clearCookie("AUTH_COOKIE");
    res.status(200).json({ message: "Auth token clear" });
};

exports.generateResetToken = (req, res, next) => {
    if (req.body.email) {
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (!user) {
                    return res.status(401).json({ error: "Utilisateur non trouvé !" });
                }

                const token = new Token({
                    key: uuidv1(),
                    username: user.username,
                });

                sendMail(
                    user.email,
                    "[Pixa] Demande de réinitialisation de votre mot de passe",
                    `Bonjour ` +
                        user.username +
                        `, 
                    
                    Une demande de réinitialisation de mot de passe vient d'être effectuée sur votre compte Pixa.
                    Veuillez suivre le lien suivant pour réinitialiser votre mot de passe :
                    
                    http://localhost:8080/resetPassword/` +
                        token.key
                );

                token
                    .save()
                    .then(() => {
                        res.status(200).json({ message: "Mail de réinitialisation de mot de passe envoyé !" });
                    })
                    .catch((error) => {
                        errorHandler(error, res);
                    });
            })
            .catch((error) => {
                errorHandler(error, res);
            });
    } else {
        res.status(401).json({ error: "Merci de remplir tous les champs" });
    }
};

exports.resetPassword = (req, res, next) => {
    if (req.body.username && req.body.password && req.body.token) {
        User.findOne({ username: req.body.username })
            .then((user) => {
                if (!user) {
                    return res.status(401).json({ error: "Utilisateur non trouvé !" });
                }

                Token.findOne({ key: req.body.token }).then((token) => {
                    if (!token) {
                        return res.status(401).json({ error: "Token non trouvé !" });
                    }
                    if (token.username == user.username) {
                        bcrypt.hash(req.body.password, 10).then((hash) => {
                            Token.deleteOne({ key: req.body.token }).then(() => {
                                User.updateOne({ username: req.body.username }, { password: hash }).then((result) => {
                                    if (result.modifiedCount > 0) {
                                        return res.status(200).json({ message: "Password updated" });
                                    }
                                    return res.status(500).json({ message: "Unable to update password" });
                                });
                            });
                        });
                    } else {
                        res.status(401).json({ error: "Le token ne correspond pas à l'utilisateur" });
                    }
                });
            })
            .catch((error) => {
                errorHandler(error, res);
            });
    } else {
        res.status(401).json({ error: "Merci de remplir tous les champs" });
    }
};

// todo use token in request body
exports.updateCreditCard = (req, res, next) => {
    User.updateOne({ username: req.auth.username }, { creditCard: req.body.creditCard })
        .then((result) => {
            console.log(result);
            if (result.modifiedCount > 0) {
                return res.status(200).json({ message: "Credit card updated" });
            }
            return res.status(500).json({ message: "Unable to update credit card" });
        })
        .catch((error) => {
            errorHandler(error, res);
        });
};
