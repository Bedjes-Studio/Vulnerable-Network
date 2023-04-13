const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uuidv1 = require("uuid").v1;
const config = require("../config");

const { errorHandler } = require("./utils");
const User = require("../models/user");
const Token = require("../models/token");

exports.signup = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                username: req.body.username,
                password: hash,
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
                    res.cookie("AUTH_COOKIE", token);
                    console.log;
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

exports.generateResetToken = (req, res, next) => {
    if (req.body.username) {
        User.findOne({ username: req.body.username })
            .then((user) => {
                if (!user) {
                    return res.status(401).json({ error: "Utilisateur non trouvé !" });
                }

                const token = new Token({
                    key: username + "." + uuidv1(),
                    username: req.body.username,
                });

                sendMail(
                    user.mail,
                    "[Pixa] Demande de réinitialisation de votre mot de passe",
                    `Bonjour, 
                    
                    Une demande de réinitialisation de mot de passe vient d'être effectuée sur votre compte Pixa.
                    Veuillez suivre le lien suivant pour réinitialiser votre mot de passe :
                    
                    http://localhost:8080/resetPassword/` + token.key
                );
                res.status(200).json({ message: "Mail de réinitialisation de mot de passe envoyé !" });
            })
            .catch((error) => {
                errorHandler(error, res);
            });
    } else {
        res.status(401).json({ error: "Merci de remplir tous les champs" });
    }
};

exports.resetToken = (req, res, next) => {
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
                    res.cookie("AUTH_COOKIE", token);
                    console.log;
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